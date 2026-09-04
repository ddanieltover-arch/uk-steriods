import type { IncomingMessage, ServerResponse } from "node:http";

type ExpressApp = {
  (req: IncomingMessage, res: ServerResponse): void;
};

let appPromise: Promise<ExpressApp> | null = null;

function getApp(): Promise<ExpressApp> {
  if (!appPromise) {
    appPromise = (async () => {
      const { createApp } = await import("../server.js");
      return createApp({ listen: false });
    })().catch((err) => {
      appPromise = null;
      throw err;
    });
  }
  return appPromise;
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  if (res.headersSent) return;
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const app = await getApp();
    await new Promise<void>((resolve, reject) => {
      const onFinish = () => {
        cleanup();
        resolve();
      };
      const onError = (err: Error) => {
        cleanup();
        reject(err);
      };
      const cleanup = () => {
        res.off("finish", onFinish);
        res.off("close", onFinish);
        res.off("error", onError);
      };
      res.on("finish", onFinish);
      res.on("close", onFinish);
      res.on("error", onError);
      try {
        app(req, res);
      } catch (err) {
        cleanup();
        reject(err);
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Serverless function failed to start.";
    console.error("[vercel-api] handler failure:", message);
    sendJson(res, 500, {
      error: {
        code: "FUNCTION_BOOTSTRAP_FAILED",
        message: "The API is temporarily unavailable. Please try again shortly.",
        // Surface boot reason so Vercel Function logs / owners can diagnose missing env.
        detail: message.slice(0, 300),
      },
    });
  }
}
