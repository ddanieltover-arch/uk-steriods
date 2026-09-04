import type { IncomingMessage, ServerResponse } from "node:http";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

type ExpressApp = {
  (req: IncomingMessage, res: ServerResponse): void;
};

let appPromise: Promise<ExpressApp> | null = null;

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadCreateApp(): (options?: { listen?: boolean }) => Promise<ExpressApp> {
  // Prefer the esbuild bundle (reliable on Vercel). Fall back to TS source for local/dev.
  const bundlePath = path.join(__dirname, "server.bundle.cjs");
  try {
    const mod = require(bundlePath) as {
      createApp?: (options?: { listen?: boolean }) => Promise<ExpressApp>;
      default?: { createApp?: (options?: { listen?: boolean }) => Promise<ExpressApp> };
    };
    const createApp = mod.createApp || mod.default?.createApp;
    if (typeof createApp === "function") return createApp;
  } catch (err) {
    console.warn("[vercel-api] bundle load failed, falling back to source:", err instanceof Error ? err.message : err);
  }

  throw new Error(
    "API server bundle missing. Ensure build runs esbuild for api/server.bundle.cjs before deploy."
  );
}

function getApp(): Promise<ExpressApp> {
  if (!appPromise) {
    appPromise = (async () => {
      const createApp = loadCreateApp();
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
        detail: message.slice(0, 300),
      },
    });
  }
}
