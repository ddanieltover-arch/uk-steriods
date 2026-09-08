import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

import { registerAdminRoutes } from "./src/lib/routes/admin.routes.js";
import { registerCatalogueRoutes } from "./src/lib/routes/catalogue.routes.js";
import { registerBlogRoutes } from "./src/lib/routes/blog.routes.js";
import { requestTiming } from "./src/lib/middleware/request-timing.js";
import { rateLimit } from "./src/lib/middleware/rate-limit.js";
import { noStore } from "./src/lib/middleware/http-cache.js";
import { SeoService } from "./src/lib/services/seo.service.js";
import { CatalogueApiService } from "./src/lib/services/catalogue-api.service.js";
import { BlogService } from "./src/lib/services/blog.service.js";
import { shouldNoIndexPath, SITE_NAME, sanitizeMetaText } from "./src/lib/seo/site.js";
import { buildCrawlableHtml, injectCrawlableBody } from "./src/lib/seo/crawlable-content.js";
import { startNotificationWorker } from "./src/lib/notifications/notification.worker.js";
import { PasswordResetService } from "./src/lib/services/password-reset.service.js";

async function injectPublicSeo(
  html: string,
  pathname: string,
  query: Record<string, unknown>
): Promise<string> {
  try {
    let seoHtml = html;

    if (shouldNoIndexPath(pathname)) {
      seoHtml = SeoService.injectIntoHtml(html, {
        title: `${SITE_NAME}`,
        description: "Private page",
        canonical: "",
        robots: "noindex,nofollow",
        ogType: "website",
        jsonLd: [],
      });
      return seoHtml;
    }

    if (pathname === "/" || pathname === "") {
      seoHtml = SeoService.injectIntoHtml(html, SeoService.homepageSeo());
    } else if (pathname === "/shop") {
      const q = typeof query.q === "string" ? query.q : "";
      seoHtml = SeoService.injectIntoHtml(html, SeoService.shopSeo(q || undefined));
    } else if (pathname === "/blog") {
      seoHtml = SeoService.injectIntoHtml(html, SeoService.blogIndexSeo());
    } else if (pathname.startsWith("/blog/")) {
      const slug = pathname.replace("/blog/", "").split("/")[0];
      const post = await BlogService.getPublishedBySlug(slug);
      if (!post) {
        seoHtml = SeoService.injectIntoHtml(html, {
          title: `Article not found | ${SITE_NAME}`,
          description: "This article is unavailable.",
          canonical: "",
          robots: "noindex,follow",
          ogType: "article",
          jsonLd: [],
        });
      } else {
        seoHtml = SeoService.injectIntoHtml(html, SeoService.blogArticleSeo(post));
      }
    } else if (pathname.startsWith("/product/")) {
      const slug = pathname.replace("/product/", "").split("/")[0];
      const product = await CatalogueApiService.getPublishedBySlug(slug);
      if (!product) {
        seoHtml = SeoService.injectIntoHtml(html, {
          title: `Product not found | ${SITE_NAME}`,
          description: "This product is unavailable.",
          canonical: "",
          robots: "noindex,follow",
          ogType: "website",
          jsonLd: [],
        });
      } else {
        seoHtml = SeoService.injectIntoHtml(html, {
          title: `${product.name} | ${SITE_NAME}`,
          description: sanitizeMetaText(product.shortDescription || product.description, 160),
          canonical:
            SeoService.homepageSeo().canonical.replace(/\/$/, "") + `/product/${product.slug}`,
          robots: "index,follow",
          ogImage: product.images[0],
          ogType: "product",
          jsonLd: [
            SeoService.productJsonLd({
              name: product.name,
              description: product.shortDescription || product.description,
              images: product.images,
              sku: product.sku,
              brandName: product.brandName,
              priceGbp: product.priceGbp,
              availability: product.stockQuantity > 0,
              slug: product.slug,
              ratingAvg: product.ratingAvg,
              reviewCount: product.reviewCount,
            }),
            SeoService.breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: product.categoryName, path: `/category/${product.categorySlug}` },
              { name: product.name, path: `/product/${product.slug}` },
            ]),
          ],
        });
      }
    } else if (pathname.startsWith("/category/")) {
      const slug = pathname.replace("/category/", "").split("/")[0];
      const seo = await SeoService.categorySeo(slug);
      seoHtml = seo
        ? SeoService.injectIntoHtml(html, seo)
        : SeoService.injectIntoHtml(html, {
            title: `Category not found | ${SITE_NAME}`,
            description: "This category is unavailable.",
            canonical: "",
            robots: "noindex,follow",
            ogType: "website",
            jsonLd: [],
          });
    } else if (pathname === "/manufacturers" || pathname === "/brands") {
      const origin = process.env.PUBLIC_SITE_URL || process.env.SITE_URL || "";
      seoHtml = SeoService.injectIntoHtml(html, {
        title: `Manufacturers | ${SITE_NAME}`,
        description: `Trusted pharmaceutical manufacturers at ${SITE_NAME}: Pharmaqo Labs, Proper Labs, Syncom Labs, Beligas, and more.`,
        canonical: origin ? `${origin.replace(/\/$/, "")}/manufacturers` : "/manufacturers",
        robots: "index,follow",
        ogType: "website",
        jsonLd: [],
      });
    } else if (pathname.startsWith("/brand/")) {
      const slug = pathname.replace("/brand/", "").split("/")[0];
      const seo = await SeoService.brandSeo(slug);
      seoHtml = seo
        ? SeoService.injectIntoHtml(html, seo)
        : SeoService.injectIntoHtml(html, {
            title: `Brand not found | ${SITE_NAME}`,
            description: "This brand is unavailable.",
            canonical: "",
            robots: "noindex,follow",
            ogType: "website",
            jsonLd: [],
          });
    } else {
      const resourceSeo = SeoService.resourceSeo(pathname);
      if (resourceSeo) {
        seoHtml = SeoService.injectIntoHtml(html, resourceSeo);
      }
    }

    const crawlable = await buildCrawlableHtml(pathname);
    return injectCrawlableBody(seoHtml, crawlable);
  } catch {
    return html;
  }
}

async function serveSpaHtml(
  req: Request,
  res: Response,
  distPath: string
): Promise<void> {
  const indexPath = path.join(distPath, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  html = await injectPublicSeo(html, req.path, req.query as Record<string, unknown>);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (shouldNoIndexPath(req.path)) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
  res.send(html);
}

export async function createApp(options: { listen?: boolean } = {}) {
  const { loadEnv } = await import("./src/lib/config/env.js");
  const env = loadEnv();
  const app = express();
  const PORT = env.PORT;
  const onVercel = Boolean(process.env.VERCEL);

  const { requestIdMiddleware } = await import("./src/lib/middleware/request-id.js");
  const { securityHeaders } = await import("./src/lib/middleware/security-headers.js");
  const { corsMiddleware } = await import("./src/lib/middleware/cors.js");
  const { csrfProtection, ensureCsrfCookie } = await import("./src/lib/middleware/csrf.js");
  const { setSessionCookie, clearSessionCookie } = await import("./src/lib/auth/cookies.js");
  const { db } = await import("./src/lib/db.js");

  app.set("trust proxy", 1);
  app.use(requestIdMiddleware);
  app.use(securityHeaders);
  app.use(corsMiddleware);
  app.use(compression());
  app.use(express.json({ limit: "64kb" }));
  app.use(cookieParser());
  const { accessLog } = await import("./src/lib/middleware/access-log.js");
  app.use(accessLog);
  app.use(requestTiming);
  app.use(csrfProtection);
  app.use(express.static(path.join(process.cwd(), "public"), { index: false }));

  // Helper to extract authenticated user from cookies or headers
  async function getAuthenticatedUser(req: Request) {
    const { AuthenticationService } = await import("./src/lib/services/auth.service.js");
    let sessionId = req.cookies?.session_id;

    if (!sessionId) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        sessionId = authHeader.substring(7);
      } else if (req.headers["x-session-id"]) {
        sessionId = req.headers["x-session-id"] as string;
      }
    }

    if (!sessionId) return null;
    return AuthenticationService.validateSession(sessionId);
  }

  // Middleware to require authentication
  async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getAuthenticatedUser(req);
      if (!user) {
        return res.status(401).json({ error: "Authentication required. Please log in." });
      }
      (req as any).user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Invalid session." });
    }
  }

  // Liveness / readiness (no auth)
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/ready", async (_req, res) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: "ok", checks: { database: "ok" } });
    } catch {
      res.status(503).json({ status: "unavailable", checks: { database: "error" } });
    }
  });

  // API Routes
  app.get("/api/v1/health", (_req, res) => {
    res.json({ status: "ok", service: "UK Performance E-Commerce API", currency: "GBP" });
  });

  // Vercel Cron / manual drain of the email outbox (no long-lived worker on serverless).
  // Secure with CRON_SECRET via Authorization: Bearer <CRON_SECRET>
  app.get("/api/v1/internal/notifications/process", async (req, res) => {
    try {
      const cronSecret = (process.env.CRON_SECRET || "").trim();
      const authHeader = String(req.headers.authorization || "");
      const bearerOk = Boolean(cronSecret) && authHeader === `Bearer ${cronSecret}`;

      if (process.env.NODE_ENV === "production") {
        if (!cronSecret) {
          return res.status(503).json({
            error: "CRON_SECRET is not configured. Set it in Vercel Environment Variables.",
          });
        }
        if (!bearerOk) {
          return res.status(401).json({ error: "Unauthorized" });
        }
      } else if (cronSecret && !bearerOk) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { NotificationService } = await import("./src/lib/notifications/notification.service.js");
      const result = await NotificationService.processPending(25);
      res.json({ ok: true, ...result });
    } catch (err: any) {
      console.error("[notifications/process]", err?.message || err);
      res.status(500).json({ error: "Failed to process notifications." });
    }
  });

  app.get("/api/v1/auth/csrf", (req, res) => {
    const token = ensureCsrfCookie(req, res);
    res.json({ csrfToken: token });
  });

  registerCatalogueRoutes(app);
  registerBlogRoutes(app);

  const authLimit = rateLimit({ windowMs: 60_000, max: 10, message: "Too many authentication attempts." });
  const checkoutLimit = rateLimit({ windowMs: 60_000, max: 20, message: "Too many checkout requests." });
  const trackingLimit = rateLimit({ windowMs: 60_000, max: 20, message: "Too many tracking lookups." });
  const passwordResetLimit = rateLimit({
    windowMs: 60_000,
    max: 5,
    message: "Too many password reset requests. Please wait.",
  });

  // Register Admin & Operations API Routes
  registerAdminRoutes(app, getAuthenticatedUser);

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================

  // Customer Registration
  app.post("/api/v1/auth/register", authLimit, async (req, res) => {
    try {
      const { AuthenticationService } = await import("./src/lib/services/auth.service.js");
      const { sessionId, user } = await AuthenticationService.register(req.body);

      setSessionCookie(res, sessionId);
      ensureCsrfCookie(req, res);

      // Do not return session token in JSON — cookie is authoritative for browsers.
      res.status(201).json({ success: true, user });
    } catch (err: any) {
      console.error("Registration error:", err?.message || "error");
      res.status(400).json({
        error: { code: "REGISTER_FAILED", message: err?.message || "Registration failed.", requestId: req.requestId },
      });
    }
  });

  // Customer Login
  app.post("/api/v1/auth/login", authLimit, async (req, res) => {
    try {
      const { AuthenticationService } = await import("./src/lib/services/auth.service.js");
      const { sessionId, user } = await AuthenticationService.login(req.body);

      setSessionCookie(res, sessionId);
      ensureCsrfCookie(req, res);

      res.json({ success: true, user });
    } catch (err: any) {
      console.error("Login error:", err?.message || "error");
      res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password.", requestId: req.requestId },
      });
    }
  });

  app.post("/api/v1/auth/admin/login", authLimit, async (req, res) => {
    try {
      const { AuthenticationService } = await import("./src/lib/services/auth.service.js");
      const { sessionId, user } = await AuthenticationService.adminLogin(req.body);

      setSessionCookie(res, sessionId);
      ensureCsrfCookie(req, res);

      res.json({ success: true, user });
    } catch (err: any) {
      console.error("Admin login error:", err?.message || "error");
      res.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password.", requestId: req.requestId },
      });
    }
  });

  // Password reset request — always generic response (no account enumeration)
  app.post("/api/v1/auth/password-reset/request", passwordResetLimit, async (req, res) => {
    try {
      const email = typeof req.body?.email === "string" ? req.body.email : "";
      const result = await PasswordResetService.requestReset(email);
      res.json(result);
    } catch (err: any) {
      res.json({
        message:
          "If an account exists for this email address, password reset instructions will be sent.",
      });
    }
  });

  app.post("/api/v1/auth/password-reset/confirm", passwordResetLimit, async (req, res) => {
    try {
      const token = typeof req.body?.token === "string" ? req.body.token : "";
      const newPassword = typeof req.body?.newPassword === "string" ? req.body.newPassword : "";
      const result = await PasswordResetService.resetPassword(token, newPassword);
      res.json(result);
    } catch (err: any) {
      res.status(400).json({ error: err?.message || "Unable to reset password." });
    }
  });

  // Customer Logout
  app.post("/api/v1/auth/logout", async (req, res) => {
    try {
      const { AuthenticationService } = await import("./src/lib/services/auth.service.js");
      const sessionId = req.cookies?.session_id || req.headers["x-session-id"];
      await AuthenticationService.logout(sessionId as string | undefined);

      clearSessionCookie(res);
      res.json({ success: true, message: "Logged out successfully." });
    } catch (err: any) {
      res.status(500).json({
        error: { code: "LOGOUT_FAILED", message: "Logout failed.", requestId: req.requestId },
      });
    }
  });

  // Get Current Authenticated User Session
  app.get("/api/v1/auth/me", async (req, res) => {
    try {
      const user = await getAuthenticatedUser(req);
      if (!user) {
        return res.status(401).json({ authenticated: false, user: null });
      }
      res.json({ authenticated: true, user });
    } catch (err: any) {
      res.status(401).json({ authenticated: false, user: null });
    }
  });

  // ==========================================
  // CUSTOMER ACCOUNT & PROFILE ROUTES
  // ==========================================

  // Get Account Dashboard Summary
  app.get("/api/v1/account", requireAuth, noStore, async (req, res) => {
    try {
      const { AccountService } = await import("./src/lib/services/account.service.js");
      const user = (req as any).user;
      const profile = await AccountService.getProfile(user.id);
      res.json(profile);
    } catch (err: any) {
      console.error("Account profile error:", err);
      res.status(500).json({ error: "Failed to load account profile." });
    }
  });

  // Update Account Profile
  app.patch("/api/v1/account", requireAuth, async (req, res) => {
    try {
      const { AccountService } = await import("./src/lib/services/account.service.js");
      const user = (req as any).user;
      const updatedUser = await AccountService.updateProfile(user.id, req.body);
      res.json({ success: true, user: updatedUser });
    } catch (err: any) {
      console.error("Update profile error:", err);
      res.status(400).json({ error: err?.message || "Failed to update profile." });
    }
  });

  // Change Password
  app.post("/api/v1/account/password", requireAuth, async (req, res) => {
    try {
      const { AccountService } = await import("./src/lib/services/account.service.js");
      const user = (req as any).user;
      const result = await AccountService.changePassword(user.id, req.body);
      clearSessionCookie(res);
      res.json(result);
    } catch (err: any) {
      console.error("Change password error:", err);
      res.status(400).json({ error: err?.message || "Password update failed." });
    }
  });

  // ==========================================
  // SAVED ADDRESSES ROUTES
  // ==========================================

  // List Saved Addresses
  app.get("/api/v1/account/addresses", requireAuth, async (req, res) => {
    try {
      const { AddressService } = await import("./src/lib/services/address.service.js");
      const user = (req as any).user;
      const addresses = await AddressService.getAddresses(user.id);
      res.json({ addresses });
    } catch (err: any) {
      console.error("Get addresses error:", err);
      res.status(500).json({ error: "Failed to retrieve saved addresses." });
    }
  });

  // Create Saved Address
  app.post("/api/v1/account/addresses", requireAuth, async (req, res) => {
    try {
      const { AddressService } = await import("./src/lib/services/address.service.js");
      const user = (req as any).user;
      const address = await AddressService.createAddress(user.id, req.body);
      res.status(201).json({ success: true, address });
    } catch (err: any) {
      console.error("Create address error:", err);
      res.status(400).json({ error: err?.message || "Failed to save address." });
    }
  });

  // Update Saved Address
  app.patch("/api/v1/account/addresses/:id", requireAuth, async (req, res) => {
    try {
      const { AddressService } = await import("./src/lib/services/address.service.js");
      const user = (req as any).user;
      const address = await AddressService.updateAddress(user.id, req.params.id, req.body);
      res.json({ success: true, address });
    } catch (err: any) {
      console.error("Update address error:", err);
      res.status(400).json({ error: err?.message || "Failed to update address." });
    }
  });

  // Delete Saved Address
  app.delete("/api/v1/account/addresses/:id", requireAuth, async (req, res) => {
    try {
      const { AddressService } = await import("./src/lib/services/address.service.js");
      const user = (req as any).user;
      await AddressService.deleteAddress(user.id, req.params.id);
      res.json({ success: true, message: "Address deleted successfully." });
    } catch (err: any) {
      console.error("Delete address error:", err);
      res.status(400).json({ error: err?.message || "Failed to delete address." });
    }
  });

  // Set Default Address
  app.post("/api/v1/account/addresses/:id/default", requireAuth, async (req, res) => {
    try {
      const { AddressService } = await import("./src/lib/services/address.service.js");
      const user = (req as any).user;
      const address = await AddressService.setDefaultAddress(user.id, req.params.id);
      res.json({ success: true, address });
    } catch (err: any) {
      console.error("Set default address error:", err);
      res.status(400).json({ error: err?.message || "Failed to set default address." });
    }
  });

  // ==========================================
  // AUTHENTICATED ORDER HISTORY & DETAILS ROUTES
  // ==========================================

  // List Authenticated User Orders
  app.get("/api/v1/account/orders", requireAuth, async (req, res) => {
    try {
      const { OrderQueryService } = await import("./src/lib/services/order-query.service.js");
      const user = (req as any).user;
      const page = parseInt(req.query.page as string, 10) || 1;
      const limit = parseInt(req.query.limit as string, 10) || 10;

      const result = await OrderQueryService.getUserOrders(user.id, { page, limit });
      res.json(result);
    } catch (err: any) {
      console.error("Order history error:", err);
      res.status(500).json({ error: "Failed to retrieve order history." });
    }
  });

  // Get Order Detail (Strict User Ownership Check)
  app.get("/api/v1/account/orders/:orderNumber", requireAuth, async (req, res) => {
    try {
      const { OrderQueryService } = await import("./src/lib/services/order-query.service.js");
      const user = (req as any).user;
      const { orderNumber } = req.params;

      const order = await OrderQueryService.getUserOrderDetail(user.id, orderNumber);
      if (!order) {
        return res.status(404).json({ error: `Order #${orderNumber} not found.` });
      }

      res.json({ order });
    } catch (err: any) {
      console.error("Order detail error:", err);
      res.status(403).json({ error: err?.message || "Access denied to order details." });
    }
  });

  // Cancel Pending Order
  app.post("/api/v1/account/orders/:orderNumber/cancel", requireAuth, async (req, res) => {
    try {
      const { OrderQueryService } = await import("./src/lib/services/order-query.service.js");
      const user = (req as any).user;
      const { orderNumber } = req.params;

      const cancelledOrder = await OrderQueryService.cancelOrder(user.id, orderNumber);
      res.json({ success: true, order: cancelledOrder });
    } catch (err: any) {
      console.error("Cancel order error:", err);
      res.status(400).json({ error: err?.message || "Failed to cancel order." });
    }
  });

  // ==========================================
  // SECURE GUEST ORDER TRACKING ROUTES
  // ==========================================

  // Secure Guest Order Tracking (Requires orderNumber + trackingToken)
  app.get("/api/v1/orders/:orderNumber/track", trackingLimit, async (req, res) => {
    try {
      const { OrderTrackingService } = await import("./src/lib/services/order-tracking.service.js");
      const { orderNumber } = req.params;
      const token = (req.query.token as string) || (req.query.trackingToken as string);

      if (!token) {
        return res.status(403).json({ error: "Secure tracking token is required." });
      }

      const trackingData = await OrderTrackingService.trackGuestOrder({ orderNumber, trackingToken: token });
      res.json({ tracking: trackingData });
    } catch (err: any) {
      console.error("Guest tracking error:", err);
      res.status(403).json({ error: err?.message || "Access denied. Invalid order number or tracking token." });
    }
  });

  // Alternative POST track endpoint for form submission
  app.post("/api/v1/orders/track", trackingLimit, async (req, res) => {
    try {
      const { OrderTrackingService } = await import("./src/lib/services/order-tracking.service.js");
      const trackingData = await OrderTrackingService.trackGuestOrder(req.body);
      res.json({ tracking: trackingData });
    } catch (err: any) {
      console.error("Guest tracking POST error:", err);
      res.status(403).json({ error: err?.message || "Access denied. Invalid order number or tracking token." });
    }
  });

  // ==========================================
  // CART & CHECKOUT SERVICES
  // ==========================================

  // Calculate Cart Totals & Reconciliation
  app.post("/api/v1/cart/calculate", async (req, res) => {
    try {
      const { CartCalculatorService } = await import("./src/lib/services/cart-calculator.service.js");
      const calculation = await CartCalculatorService.calculate(req.body || {});
      res.json(calculation);
    } catch (err: any) {
      console.error("Cart calculation error:", err);
      res.status(400).json({ error: "Failed to calculate cart totals.", details: err?.message });
    }
  });

  // Validate Promotional Discount Code
  app.post("/api/v1/discounts/validate", async (req, res) => {
    try {
      const { DiscountService } = await import("./src/lib/services/discount.service.js");
      const { code, subtotalPence = 0 } = req.body || {};

      if (!code || typeof code !== "string") {
        return res.status(400).json({ isValid: false, code: "", discountPence: 0, message: "Promotional code is required." });
      }

      const result = await DiscountService.validateAndCalculate(code, Number(subtotalPence));
      res.json(result);
    } catch (err: any) {
      console.error("Discount validation error:", err);
      res.status(500).json({ isValid: false, code: "", discountPence: 0, message: "Unable to validate promotional code." });
    }
  });

  // Get Shipping Rates
  app.get("/api/v1/shipping/rates", async (req, res) => {
    try {
      const { FlatRateShippingProvider } = await import("./src/lib/services/shipping.service.js");
      const provider = new FlatRateShippingProvider();
      const subtotalPence = parseInt(req.query.subtotalPence as string, 10) || 0;
      const rates = await provider.getRates("UK", subtotalPence);
      res.json({ rates, freeShippingThresholdPence: 30000 });
    } catch (err: any) {
      console.error("Shipping rates error:", err);
      res.status(500).json({ error: "Failed to retrieve shipping rates." });
    }
  });

  // Merge Guest Cart into User Cart
  app.post("/api/v1/cart/merge", async (req, res) => {
    try {
      const { guestItems = [], userItems = [] } = req.body || {};
      const mergedMap = new Map<string, any>();

      for (const item of userItems) {
        const key = `${item.productId}-${item.variantId || "default"}`;
        mergedMap.set(key, { ...item });
      }

      for (const gItem of guestItems) {
        const key = `${gItem.productId}-${gItem.variantId || "default"}`;
        if (mergedMap.has(key)) {
          const existing = mergedMap.get(key);
          const maxStock = existing.availableStock || 99;
          existing.quantity = Math.min(maxStock, existing.quantity + gItem.quantity);
        } else {
          mergedMap.set(key, { ...gItem });
        }
      }

      const mergedList = Array.from(mergedMap.values());
      res.json({ success: true, mergedItems: mergedList });
    } catch (err: any) {
      console.error("Cart merge error:", err);
      res.status(500).json({ error: "Failed to merge carts." });
    }
  });

  // Get Configured Shipping Methods
  app.get("/api/v1/checkout/shipping-methods", async (req, res) => {
    try {
      const { ShippingService } = await import("./src/lib/services/shipping.service.js");
      const country = (req.query.country as string) || "GB";
      const subtotalPence = parseInt(req.query.subtotalPence as string, 10) || 0;
      const methods = ShippingService.getShippingMethods(country, subtotalPence);
      const freeShippingThresholdPence = ShippingService.getFreeShippingThreshold();

      res.json({
        shippingMethods: methods,
        freeShippingThresholdPence,
        defaultMethodId: methods[0]?.id || "standard-delivery",
      });
    } catch (err: any) {
      console.error("Shipping methods error:", err);
      res.status(500).json({ error: "Failed to retrieve shipping methods." });
    }
  });

  // Calculate Authoritative Order Totals
  app.post("/api/v1/checkout/calculate", async (req, res) => {
    try {
      const { CheckoutService } = await import("./src/lib/services/checkout.service.js");
      const result = await CheckoutService.calculateCheckoutTotals(req.body || {});
      res.json(result);
    } catch (err: any) {
      console.error("Checkout calculation error:", err);
      res.status(400).json({ error: "Checkout calculation failed.", details: err?.message });
    }
  });

  // Validate Contact & Shipping Address
  app.post("/api/v1/checkout/validate", async (req, res) => {
    try {
      const { AddressSnapshotSchema } = await import("./src/lib/validation/index.js");
      const { shippingAddress, email } = req.body || {};

      if (!email || typeof email !== "string" || !email.includes("@")) {
        return res.status(400).json({ isValid: false, error: "A valid contact email address is required." });
      }

      const parsedAddress = AddressSnapshotSchema.safeParse({ ...shippingAddress, email });
      if (!parsedAddress.success) {
        const issues = parsedAddress.error.issues.map((i) => i.message);
        return res.status(400).json({ isValid: false, errors: issues });
      }

      res.json({ isValid: true, address: parsedAddress.data });
    } catch (err: any) {
      console.error("Address validation error:", err);
      res.status(400).json({ isValid: false, error: "Address validation failed." });
    }
  });

  // Submit Checkout & Create Order Transaction
  app.post("/api/v1/orders", checkoutLimit, async (req, res) => {
    try {
      const { CheckoutService } = await import("./src/lib/services/checkout.service.js");
      const { AddressSnapshotSchema } = await import("./src/lib/validation/index.js");

      const body = req.body || {};
      const idempotencyKey = (req.headers["idempotency-key"] as string) || body.idempotencyKey;

      if (!body.email || typeof body.email !== "string" || !body.email.includes("@")) {
        return res.status(400).json({ error: "A valid email address is required for receipt and order confirmation." });
      }

      if (!body.shippingAddress) {
        return res.status(400).json({ error: "Shipping address is required." });
      }

      const parsedAddress = AddressSnapshotSchema.safeParse({ ...body.shippingAddress, email: body.email });
      if (!parsedAddress.success) {
        const issues = parsedAddress.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
        return res.status(400).json({ error: `Invalid shipping address details: ${issues}` });
      }

      const orderResult = await CheckoutService.processCheckout({
        cartId: body.cartId,
        guestSessionToken: body.guestSessionToken,
        userId: body.userId,
        email: body.email,
        phone: body.phone,
        shippingAddress: parsedAddress.data,
        billingAddress: body.billingAddress,
        useSameAddressForBilling: body.useSameAddressForBilling !== false,
        shippingMethodId: body.shippingMethodId || "standard-delivery",
        paymentMethod: body.paymentMethod || "BANK_TRANSFER",
        discountCode: body.discountCode,
        idempotencyKey,
        items: Array.isArray(body.items) ? body.items : undefined,
      });

      res.status(201).json(orderResult);
    } catch (err: any) {
      console.error("Order creation error:", err);
      res.status(400).json({ error: err?.message || "Order creation failed. Please check stock and try again." });
    }
  });

  // Retrieve Order by Order Number (Guest or Authenticated User)
  app.get("/api/v1/orders/:orderNumber", async (req, res) => {
    try {
      const { db } = await import("./src/lib/db.js");
      const { orderNumber } = req.params;
      const trackingToken = req.query.token as string | undefined;

      const order = await db.order.findUnique({
        where: { orderNumber },
        include: {
          items: true,
          payments: true,
          shipments: true,
        },
      });

      if (!order) {
        return res.status(404).json({ error: `Order #${orderNumber} not found.` });
      }

      const user = await getAuthenticatedUser(req);

      // Authenticated User match
      if (user && order.userId === user.id) {
        return res.json({ order });
      }

      // Guest tracking match
      if (trackingToken && order.trackingToken === trackingToken) {
        return res.json({ order });
      }

      // If token is invalid or user doesn't own order
      return res.status(403).json({ error: "Access denied. Order details require authenticated session or valid guest tracking token." });
    } catch (err: any) {
      console.error("Order lookup error:", err);
      res.status(500).json({ error: "Failed to retrieve order." });
    }
  });

  if (!onVercel) {
    startNotificationWorker({ intervalMs: env.NOTIFICATION_POLL_MS });
  }

  // On Vercel, static files and the SPA fallback are served by vercel.json.
  // Production uses static; development uses Vite. Keep NODE_ENV check explicit.
  if (!onVercel && env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else if (!onVercel) {
    // Production: Serve static built files from dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", async (req, res) => {
      try {
        await serveSpaHtml(req, res, distPath);
      } catch {
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  } else {
    // Vercel: HTML routes hit the serverless API; static assets served from dist by the platform.
    const distPath = path.join(process.cwd(), "dist");
    app.get("*", async (req, res, next) => {
      if (req.path.startsWith("/api/")) return next();
      try {
        await serveSpaHtml(req, res, distPath);
      } catch {
        next();
      }
    });
  }

  const { errorHandler } = await import("./src/lib/middleware/error-handler.js");
  app.use(errorHandler);

  if (options.listen !== false && !onVercel) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`UK Performance E-Commerce Server listening at http://0.0.0.0:${PORT} (${env.NODE_ENV})`);
    });
  }

  return app;
}

if (!process.env.VERCEL) {
  createApp({ listen: true }).catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}
