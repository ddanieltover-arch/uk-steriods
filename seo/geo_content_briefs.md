# GEO content briefs — Steroids UK

Educational catalogue framing only. Not medical or legal advice. Cite official sources where claims touch law or health.

---

## Brief 1 — Glossary (SHIPPED)

- **URL:** `/glossary`
- **Primary intent:** Definitional / entity coverage for AI and featured-snippet style answers
- **Schema:** DefinedTermSet
- **Status:** Live in codebase

---

## Brief 2 — FAQ hub (SHIPPED)

- **URL:** `/faq`
- **Primary intent:** Conversational “how do I buy / ship / pay” questions
- **Schema:** FAQPage
- **Status:** Live; keep answers under ~300 chars where possible for snippet eligibility

---

## Brief 3 — Oral vs injectable (SHIPPED 2026-09-13)

- **URL:** `/oral-vs-injectable`
- **Schema:** Article + FAQPage
- **Status:** Live — `GeoGuidePage` + SSR crawl body + sitemap via `RESOURCE_PAGE_SEO`

---

## Brief 4 — SARMs vs steroids (SHIPPED 2026-09-13)

- **URL:** `/sarms-vs-steroids`
- **Schema:** Article + FAQPage
- **Status:** Live

---

## Brief 5 — PCT educational pillar (SHIPPED 2026-09-13)

- **URL:** `/what-is-pct`
- **Schema:** Article + FAQPage + HowTo (catalogue browse steps only)
- **Status:** Live — links GOV.UK controlled drugs list; no dosing protocol

---

## Brief 6 — Statistics / citations page (GAP — Low)

Aggregate only verifiable public stats (shipping industry, fitness participation) with live citations. Do not invent steroid efficacy statistics.

---

## Brief 7 — Testosterone base vs suspension (GAP — High)

- **Primary keyword:** testosterone base (vol 8100 competitor mobile)
- **URL:** `/blog/testosterone-base-vs-suspension`
- **Intent:** Informational / ester education
- **Outbound links:** `/shop?q=testosterone` (buy testosterone), `/product/testosterone-cypionate-proper-labs`, `/` (buy steroids uk)
- **Inbound:** homepage related searches, glossary term “Testosterone base”, injectable category
- **Schema:** Article + FAQPage (2–3 ester FAQs)
- **Compliance:** Educational catalogue only — no dosing protocols
- **Status:** Briefed — author in admin blog next

---

## Brief 8 — Anavar UK guide retarget (GAP — Medium)

- **Keywords:** anavar uk, anavar for sale, purchase anavar, anavar buy
- **URL:** existing Anavar blog if present, else `/blog/anavar-uk-catalogue-guide`
- **Outbound:** `/shop?q=anavar`, `/category/oral`, `/product/anavar10-proper-labs`, `/`
- **Status:** Briefed

---

## Brief 9 — Test 400 / Pharmaqo cluster (GAP — Medium)

- **Keywords:** test 400, pharmaqo, pharmaqo labs, pharmaqo labs review
- **URL:** `/brand/pharmaqo-labs` (primary) + optional blog supporting `/product/tri-test-400-spharmaqo-labs`
- **Status:** Brand copy enriched; optional blog support later

---

## Brief 10 — Desktop UK batch (2026-09-12) — mapped owners

Source: `seo/competitor_positions_uk_20260912.csv` (355 unique → 71 new mapped + skips).

| Priority keywords | Primary URL |
|-------------------|-------------|
| uk sarms / sarms uk | `/category/sarms` |
| bpc 157 uk | `/product/bpc-157-pharmaqo-labs-5mg` |
| mk677 uk / buy mk677 | MK677 PDP + `/category/sarms` |
| rad 140 uk | RAD-140 PDP |
| buy clomid uk / clomid tablets / enclomiphene uk | `/category/pct` |
| buy hcg uk | HCG PDP |
| hgh uk / buy hgh uk | `/category/hgh` |
| buy anavar uk | `/shop?q=anavar` |
| igf 1 lr3 / mt 2 | peptide PDPs |
| peptide needles | `/category/accessories` |
| trenbolone uk | `/shop?q=trenbolone` |
| dianabol for sale uk | Dianabol PDP |

**Content gaps still to author:** enclomiphene educational note (PCT page section), Liv 52 product visibility if SKU exists, Anavar vs Dianabol comparison blog.

---

## Brief 11 — Enclomiphene UK / Clomid cluster (GAP — Medium)

- **Keywords:** enclomiphene uk, clomid tablets, buy clomid uk
- **URL:** `/what-is-pct` section + `/category/pct`
- **Compliance:** No Boots impersonation; educational SERM framing only
- **Status:** Briefed

---

## Brief 12 � Keyword gap batch (2026-09-13)

Source: `seo/gap_keywords_20260913.csv` (267 rows; competitor ranks, we unranked).

**Mapped (42 new):** Dianabol for sale / buy Dbol, Primobolan for sale, buy Sustanon online, Equipoise for sale, Deca Durabolin for sale, Anavar where to buy / buy Anavar 10/50, buy Anadrol, Turinabol for sale, NPP cycle, DHB, Clen 40mcg price, best PCT cycle to keep gains, Anadrol vs Anavar (brief).

**Author next:**
1. `/blog/anadrol-vs-anavar` comparison (vol 1000)
2. `/what-is-pct` section: best PCT cycle to keep gains (educational, no dosing protocol)
3. Optional NPP + test cycle educational post linking cycle-builder
