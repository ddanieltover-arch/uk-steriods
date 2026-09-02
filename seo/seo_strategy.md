# SEO + GEO Strategy — Steroids UK

**Target:** https://uk-steroids.co.uk (live redirects to https://www.uk-steroids.co.uk/)  
**Niche:** UK e-commerce catalogue — anabolic compounds, SARMs, PCT  
**Stack:** React 19 + Vite 6 + Express + Prisma + PostgreSQL  
**Generated:** 2026-09-02  
**Evidence:** Repository-verified + live crawl (SGE intelligence CLI)

---

## Project classification

| Dimension | Value |
|-----------|-------|
| Type | B2C e-commerce + content publisher |
| Geography | United Kingdom (primary), EU/worldwide shipping |
| Language | en-GB |
| Conversion goal | Product purchase (bank transfer / crypto) |
| Activated modules | Technical SEO, On-page, Content, Semantic/Entity, E-commerce, Internal linking, GEO/AIO, Performance |

---

## Phase 1 — Completed (this run)

### P0 — Crawlability blockers (fixed)

1. **CSR shell** — Homepage returned `body_word_count=4`, `h1_count=0` to non-JS crawlers.  
   **Fix:** Server-side crawlable HTML injection via `buildCrawlableHtml()` + `injectCrawlableBody()` in `server.ts` for all indexable routes.

2. **Vercel SEO gap** — HTML pages were served as static `index.html` without per-route meta or body injection.  
   **Fix:** `vercel.json` routes HTML through `/api`; Express `serveSpaHtml()` injects meta + crawlable body on Vercel.

3. **robots.txt / sitemap.xml on Vercel** — Catch-all rewrite sent these to `index.html`.  
   **Fix:** Explicit rewrites to `/api` for `/robots.txt`, `/sitemap.xml`, `/llms.txt`.

### P1 — GEO / technical SEO (fixed)

4. **`/llms.txt`** — AI crawler index file added (master prompt §5.6).
5. **AI bot access** — GPTBot, ClaudeBot, PerplexityBot, Google-Extended explicitly allowed in `robots.txt`.
6. **Answer Capsules** — Homepage + resource pages; SSR fallback includes `#answer` blocks.
7. **Organization schema** — `contactPoint` added with support email.
8. **GA4 readiness** — `Ga4` component + CSP updated; set `VITE_GA4_MEASUREMENT_ID` to activate.

### Already in place (verified)

- Dynamic `sitemap.xml` (products, categories, brands, blog, resource pages)
- `robots.txt` with disallow for admin/account/checkout/cart
- JSON-LD: Organization, WebSite, Product, BreadcrumbList, BlogPosting, FAQPage
- Server-side meta injection (`injectPublicSeo`) for all public routes
- Search/filter pages correctly `noindex`

---

## Phase 2 — Requires your action

### Connect first-party data (P0 for strategy)

Configure `secrets/sge-connectors.env` per `docs/search-growth-connectors.md`:

| Connector | Purpose |
|-----------|---------|
| GSC | Indexed pages, queries, CTR, coverage |
| GA4 | Organic sessions, conversions |
| SerpAPI (optional) | Competitor + keyword volume |

```powershell
$env:SGE_ENV_FILE = "secrets\sge-connectors.env"
cd "Search Growth Engineering Skill"
python -m sge connectors sync --id gsc
python -m sge connectors sync --id ga4
python -m sge orchestrate --workspace uk-steroids --path ".." --url "https://uk-steroids.co.uk" --mode strategy --sync
```

### Canonical host alignment (P1)

Live site 301-redirects `uk-steroids.co.uk` → `www.uk-steroids.co.uk`.  
**Action:** Pick one canonical host and align `SITE_URL` in `.env`, GSC property, and sitemap URLs. Mismatch dilutes link equity.

### GA4 browser tagging (P1)

Set `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXX` in production `.env` and redeploy.

### GSC setup (P1)

1. Verify domain in Search Console  
2. Submit `https://www.uk-steroids.co.uk/sitemap.xml` (after canonical decision)  
3. Monitor Coverage + Core Web Vitals weekly

---

## Phase 3 — Content & GEO expansion (90 days)

See `content_calendar.csv` and `keyword_map.csv` in this folder.

| Priority | Initiative | Type |
|----------|-----------|------|
| High | FAQ hub page with FAQPage schema | GEO |
| High | Glossary — key compound terms | GEO |
| High | Pillar: "Buy steroids UK" guide (educational) | Content |
| Medium | Comparison pages (oral vs injectable, SARMs vs steroids) | GEO |
| Medium | Blog cluster map + internal linking audit | Content |
| Low | Statistics/research roundup with citations | Link bait |

---

## KPI targets (set baselines after GSC/GA4 connect)

| KPI | Target (90 days) | Source |
|-----|------------------|--------|
| Indexed pages | Match sitemap URL count | GSC |
| Organic sessions | +30% vs baseline | GA4 |
| Average position (top 20 queries) | < 15 | GSC |
| CTR | > 3% | GSC |
| LCP | ≤ 2.5s | GSC CWV |
| AI citation rate | Track manually | Perplexity/ChatGPT spot checks |

---

## Risks & constraints

- **Regulated niche** — Content must stay educational; no medical claims; E-E-A-T via author bios and citations.
- **No fabricated metrics** — Keyword volumes and rankings require connected APIs.
- **CSR for interactivity** — React still hydrates over SSR fallback; test that fallback does not flash on load.

---

*Aligned with SEO_GEO_Master_Prompt.md and Search Growth Engineering skill v2.1.2.*
