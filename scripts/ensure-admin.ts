import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'sales@uk-steroids.co.uk').trim().toLowerCase();
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!password || password.length < 8) {
    throw new Error('ADMIN_BOOTSTRAP_PASSWORD (min 8 characters) is required to create or update the admin account.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const existingByEmail = await prisma.user.findUnique({ where: { email } });
  const legacy = await prisma.user.findUnique({ where: { email: 'admin@uk-steroids.co.uk' } });

  if (existingByEmail) {
    await prisma.user.update({
      where: { id: existingByEmail.id },
      data: {
        passwordHash,
        role: Role.SUPER_ADMIN,
        isActive: true,
        deletedAt: null,
        firstName: existingByEmail.firstName || 'Sales',
        lastName: existingByEmail.lastName || 'Team',
      },
    });
    console.log(`Updated SUPER_ADMIN account for ${email}`);
    return;
  }

  if (legacy) {
    await prisma.user.update({
      where: { id: legacy.id },
      data: {
        email,
        passwordHash,
        role: Role.SUPER_ADMIN,
        isActive: true,
        deletedAt: null,
        firstName: 'Sales',
        lastName: 'Team',
      },
    });
    console.log(`Migrated legacy admin account to ${email}`);
    return;
  }

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      firstName: 'Sales',
      lastName: 'Team',
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`Created SUPER_ADMIN account for ${email}`);
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
