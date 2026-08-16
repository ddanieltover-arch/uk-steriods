import type { IncomingMessage, ServerResponse } from "node:http";
import { createApp } from "../server.js";

type ExpressApp = Awaited<ReturnType<typeof createApp>>;

let appPromise: Promise<ExpressApp> | null = null;

function getApp(): Promise<ExpressApp> {
  if (!appPromise) {
    appPromise = createApp({ listen: false });
  }
  return appPromise;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getApp();
  app(req as never, res as never);
}
