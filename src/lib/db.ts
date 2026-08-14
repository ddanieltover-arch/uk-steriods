import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function createClient() {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? [
            { emit: 'event', level: 'query' },
            { emit: 'stdout', level: 'error' },
            { emit: 'stdout', level: 'warn' },
          ]
        : [{ emit: 'event', level: 'query' }, { emit: 'stdout', level: 'error' }],
  });

  client.$on('query', (event) => {
    if (event.duration >= 500) {
      console.warn('[slow-query]', {
        durationMs: event.duration,
        query: event.query.slice(0, 240),
      });
    }
  });

  return client;
}

function getClient(): PrismaClient {
  if (typeof window !== 'undefined') {
    throw new Error('PrismaClient cannot run in the browser');
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }

  return globalForPrisma.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop, _receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
