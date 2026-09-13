# KPI dashboard definitions — Steroids UK

Baselines are **unknown until GA4 + GSC are connected**. Do not invent numbers.

| KPI | Baseline | 90-day target | Data source | Cadence |
|-----|----------|---------------|-------------|---------|
| Organic sessions | TBD | +30% vs baseline | GA4 (organic) | Weekly |
| Indexed URLs | TBD | ≈ sitemap URL count | GSC Coverage | Weekly |
| Top-20 query avg position | TBD | < 15 | GSC Performance | Monthly |
| Organic CTR | TBD | > 3% | GSC | Monthly |
| LCP (mobile p75) | TBD | ≤ 2.5s | GSC CWV / PSI | Weekly |
| INP (mobile p75) | TBD | ≤ 200ms | GSC CWV | Weekly |
| CLS (mobile p75) | TBD | < 0.1 | GSC CWV | Weekly |
| Purchases (organic) | TBD | Site-specific | GA4 `purchase` | Weekly |
| AI citation spot-checks | TBD | Track rate | Manual ChatGPT/Perplexity | Monthly |

## Setup checklist

1. ~~GSC property + sitemap~~ — Success (460 discovered, last read 12 Sept 2026)
2. ~~Bing sitemap~~ — Success (459 URLs)
3. ~~Vercel `SITE_URL`~~ — confirmed set
4. ~~Production `VITE_GA4_MEASUREMENT_ID`~~ — set in Vercel; verify Realtime after deploy
5. Optional: SGE connectors in `secrets/sge-connectors.env` (see `docs/search-growth-connectors.md` and `seo/analytics_setup.md`)
6. Optional: Link GA4 ↔ GSC in GA4 Admin → Product links
