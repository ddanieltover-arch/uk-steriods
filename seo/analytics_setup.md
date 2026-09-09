# Analytics Setup — Steroids UK

## GA4 (browser)

1. Create GA4 property for `uk-steroids.co.uk` / `www.uk-steroids.co.uk`
2. Copy Measurement ID (`G-XXXXXXXX`)
3. Set in production environment:
   ```
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
4. Redeploy — `Ga4` component in `src/main.tsx` loads gtag lazily
5. Enable enhanced measurement in GA4 Admin (scrolls, outbound clicks, site search)
6. Mark conversions in GA4 Admin → Events: `purchase`, `begin_checkout`, `add_to_cart`, `view_item`
7. Ecommerce events are implemented in `src/lib/analytics/gtag.ts` and wired from cart / checkout / PDP / order confirmation
8. SPA navigations emit `page_view` from `App.tsx`

## GA4 (API — Search Growth Engineering)

1. Service account with Viewer on GA4 property
2. Set `GA4_PROPERTY_ID` in `secrets/sge-connectors.env`
3. Sync: `python -m sge connectors sync --id ga4`

## Google Search Console

1. Verify property (domain or URL-prefix — match canonical host)
2. Submit sitemap: `https://{canonical-host}/sitemap.xml`
3. Connect GSC API for SGE:
   ```
   GSC_SITE_URL=https://www.uk-steroids.co.uk/
   GOOGLE_APPLICATION_CREDENTIALS=secrets/google-service-account.json
   ```
4. Link GA4 ↔ GSC in GA4 Admin → Product links

## Weekly monitoring

- GSC: Coverage, CWV, Manual actions, Performance (queries + pages)
- GA4: Organic sessions, conversion rate, landing pages
- SGE: `python -m sge orchestrate --workspace uk-steroids --mode growth --monitor`
