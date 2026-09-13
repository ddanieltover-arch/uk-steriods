# SEO + GEO Strategy — Steroids UK

**Target:** https://www.uk-steroids.co.uk  
**Niche:** UK e-commerce catalogue — anabolic compounds, SARMs, PCT  
**Stack:** React 19 + Vite 6 + Express + Prisma + PostgreSQL  
**Updated:** 2026-09-09  
**Evidence:** Repository-verified (Search Growth Engineer + SEO_GEO_Master_Prompt)

---

## Project classification

| Dimension | Value |
|-----------|-------|
| Type | B2C e-commerce + content publisher |
| Geography | United Kingdom (primary), EU/worldwide shipping |
| Language | en-GB |
| Conversion goal | Product purchase (bank transfer / crypto) |
| Activated modules | Technical SEO, On-page, Content, Semantic/Entity, E-commerce, Internal linking, GEO/AIO, Performance, Analytics |

**Not activated:** Local SEO (no storefront NAP), International SEO (no hreflang), ASO, News SEO, SaaS SEO.

---

## Phase status vs Master Prompt

| Section | Status |
|---------|--------|
| 0 Pre-flight audit | Done (repo + prior live crawl artifacts in `seo/`) |
| 1 Keyword research | Seeded in `keyword_map.csv` — volumes require SerpAPI/GSC |
| 2 Technical SEO | **Implemented** (robots, sitemap, meta, CWV code hygiene ongoing) |
| 3 On-page | **Improved** (category copy enrichment, slug fixes) |
| 4 Structured data | **Implemented** (+ DefinedTermSet on glossary) |
| 5 GEO/AEO | **Implemented** (answer capsules, FAQ, glossary, llms.txt, AI bots) |
| 6 Local SEO | N/A |
| 7 Content calendar | Seeded — **3 GEO guides shipped**; more blog pillars optional |
| 8 Analytics | **Connected** (SITE_URL, GSC/Bing sitemap, GA4 ID) |
| 9 Link building | Templates ready — outreach is offline |
| 10 International | N/A |
| 11 CI automation | Partial (unit tests); Lighthouse CI optional next |

---

## Completed this run (2026-09-09)

### P0 / P1 technical

1. **Canonical host** — `normalizeSiteOrigin()` forces apex → `https://www.uk-steroids.co.uk` for sitemap/JSON-LD.
2. **HTTP 301s** — `/brands` → `/manufacturers`; `/category/pct-health` → `/category/pct` (Express + `vercel.json`).
3. **Facet / pagination noindex** — client + SSR `shopQueryShouldNoIndex`; robots Disallow patterns for filtered `/shop?*`.
4. **Broken PCT links** — homepage + cycle builder now point at `/category/pct`.
5. **Entity email** — support contact aligned to `sales@uk-steroids.co.uk` (matches brand domain).

### GEO / on-page

6. **Glossary** — `/glossary` with DefinedTermSet JSON-LD, answer capsule, SSR crawl body, sitemap via resource paths.
7. **Category copy enrichment** — thin DB descriptions (name-only) get unique meta/SSR copy via `category-copy.ts`.
8. **robots / llms** — FAQ + glossary Allow; glossary listed in `llms.txt`.

---

## Your action required (cannot do from code alone)

| Priority | Action | Status (2026-09-13) |
|----------|--------|---------------------|
| P0 | Confirm Vercel `SITE_URL` (www canonical) | **Done** — user confirmed set |
| P0 | Verify GSC; submit sitemap | **Done** — GSC Success, 460 pages discovered (`https://www.uk-steroids.co.uk/sitemap.xml`) |
| P0 | Bing Webmaster sitemap | **Done** — Success, 459 URLs discovered |
| P0 | Domain live on Vercel | **Done** — `uk-steroids.co.uk` attached |
| P0 | Set `VITE_GA4_MEASUREMENT_ID` and redeploy | **Done** — set in Vercel (`G-…`); confirm latest production deploy picked it up |
| P1 | Connect SGE connectors (`docs/search-growth-connectors.md`) for real keyword volumes | Open |
| P1 | Persist enriched category descriptions into DB via admin (runtime enrichment already covers meta) | Open |
| P2 | CWV: migrate Google Fonts `@import` to `font-face` / self-host; measure Lighthouse on live | Open |

---

## Competitor keyword ingestion (merge-ready)

When new Semrush/Ahrefs position CSVs arrive:

1. Save under `seo/competitor_*.csv` (batches stored: `competitor_positions_mobile_uk_20260912.csv`, `competitor_positions_uk_20260912.csv`).
2. Deduplicate keywords → append rows to `keyword_map.csv` with `SourceBatch`, `Cluster`, `PrimaryURL`, `Status`.
3. Skip competitor brand / typo navigational queries (`steroids-uk.com`, `uksteroids`, `upsteroids`, etc.) — keep our brand entity.
4. Add `internal_linking_plan.csv` edges (homepage-heavy inbound; keyword anchors; few homepage related-search outbounds).
5. Patch only owning pages + link edges (titles, capsules, category/PDP copy, crawlable HTML) — no full-site rewrite.

**Batches merged:** mobile-uk-20260912 · desktop-uk-20260912

**Linking rules:** Homepage gets the most inbound keyword links; homepage outbound is a short related-searches set. Blogs/FAQ/glossary outbound heavily to money pages. PDPs link parent category + 1–2 related compounds + home/shop.

---

## Content & GEO backlog (90 days)

See `content_calendar.csv`, `keyword_map.csv`, `geo_content_briefs.md`.

| Priority | Initiative | Status |
|----------|------------|--------|
| High | Pillar: educational “UK steroids catalogue” / PCT guide | **Shipped** `/what-is-pct` |
| High | Comparison: oral vs injectable; SARMs vs steroids | **Shipped** |
| Medium | Blog cluster internal links per `internal_linking_plan.csv` | Open |
| Medium | Author bios / Last Updated on evergreen posts | Partial (guides show Last updated) |
| Low | Statistics roundup with .gov/.edu citations | Open |

---

## KPI targets (baselines after GSC/GA4)

| KPI | Target (90 days) | Source |
|-----|------------------|--------|
| Indexed pages | Match sitemap URL count | GSC |
| Organic sessions | +30% vs baseline | GA4 |
| Avg position (top 20 queries) | < 15 | GSC |
| CTR | > 3% | GSC |
| LCP | ≤ 2.5s | GSC CWV |
| AI citation rate | Track manually | Perplexity / ChatGPT spot checks |

---

## Risks

- **Regulated / YMYL-adjacent niche** — keep educational framing; no medical claims; E-E-A-T via citations and clear disclaimers.
- **No fabricated metrics** — keyword volumes and rankings require connected APIs.
- **CSR hydration** — crawlable HTML injects into `#root`; verify no flash regressions after deploy.

---

*Aligned with SEO_GEO_Master_Prompt.md and Search Growth Engineering skill.*
