# Search Growth Connectors — GSC & GA4

Connect first-party Google Search Console and Google Analytics 4 data to the **Search Growth Engineering** workspace for `uk-steroids.co.uk`.

These connectors pull **read-only API data** for audits, strategy, and baselines. They do not modify the live site.

---

## Prerequisites

1. **Python 3.11+** with connector dependencies:

   ```powershell
   cd "Search Growth Engineering Skill"
   pip install -r requirements-connectors.txt
   ```

2. **Google Cloud project** with APIs enabled:
   - [Google Search Console API](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)
   - [Google Analytics Data API](https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com)

3. **Service account** (recommended) or OAuth access token:
   - Create a service account in Google Cloud → IAM & Admin → Service Accounts
   - Download the JSON key (store outside git — see `secrets/` below)
   - Grant the service account email **Viewer** access in:
     - Search Console → Settings → Users and permissions
     - GA4 → Admin → Property access management → Viewer

4. **Verified GSC property** matching your canonical URL exactly (`https://uk-steroids.co.uk/` or `sc-domain:uk-steroids.co.uk`).

5. **GA4 property** with a web data stream for `uk-steroids.co.uk`. The Data API reads historical reports; the property must already collect hits (gtag installed on site or via GTM).

---

## Environment variables

Copy the workspace template:

```powershell
copy "Search Growth Engineering Skill\workspaces\uk-steroids\connectors.example.env" secrets\sge-connectors.env
```

Or add the same keys to your project `.env` (already gitignored).

| Variable | Required | Classification | Description |
|----------|----------|----------------|-------------|
| `SGE_ENV_FILE` | Optional | SERVER_ONLY | Path to env file for SGE CLI (default: `.env` in cwd) |
| `GSC_SITE_URL` | **Yes (GSC)** | SERVER_ONLY | Exact GSC property URL, e.g. `https://uk-steroids.co.uk/` or `sc-domain:uk-steroids.co.uk` |
| `GA4_PROPERTY_ID` | **Yes (GA4)** | SERVER_ONLY | Numeric GA4 property ID (Admin → Property settings), e.g. `123456789` |
| `GOOGLE_APPLICATION_CREDENTIALS` | Recommended | SERVER_ONLY | Absolute path to service-account JSON key file |
| `GSC_ACCESS_TOKEN` | Alternative | SERVER_ONLY | Short-lived OAuth token instead of service account |
| `GA4_ACCESS_TOKEN` | Alternative | SERVER_ONLY | Short-lived OAuth token instead of service account |
| `GSC_CLIENT_ID` | Optional | SERVER_ONLY | OAuth client ID (only if using OAuth flow manually) |

**Auth rule:** Provide either `GOOGLE_APPLICATION_CREDENTIALS` **or** per-connector access tokens. Service accounts are preferred for automation.

**Site tagging (separate from API):**

| Variable | Required | Classification | Description |
|----------|----------|----------------|-------------|
| `VITE_GA4_MEASUREMENT_ID` | Optional | PUBLIC | GA4 measurement ID (`G-XXXXXXXX`) for browser gtag — not used by SGE connectors |

---

## Wire the workspace

The `uk-steroids` workspace is configured with:

```json
"connectors": ["gsc", "ga4"]
```

Registry: `Search Growth Engineering Skill/workspaces/uk-steroids/connectors/registry.json`

---

## Validate & sync

From the repo root, point SGE at your secrets file:

```powershell
$env:SGE_ENV_FILE = "D:\PROJECTS\Away\www.uk-steroids.co.uk\secrets\sge-connectors.env"

cd "Search Growth Engineering Skill"

# Discover available connectors
python -m sge connectors discover

# Validate credentials (no data pull)
python -m sge connectors validate --id gsc
python -m sge connectors validate --id ga4

# Health check (shows missing secrets without values)
python -m sge connectors health --id gsc
python -m sge connectors health --id ga4

# Sync last 28 days of data into workspace
python -m sge connectors sync --id gsc
python -m sge connectors sync --id ga4
```

Sync output is written to:

- `Search Growth Engineering Skill/workspaces/uk-steroids/connectors/last-sync.json`

---

## Full orchestration (audit + sync + strategy)

```powershell
$env:SGE_ENV_FILE = "secrets\sge-connectors.env"

cd "Search Growth Engineering Skill"
python -m sge orchestrate --workspace uk-steroids --path ".." --url "https://uk-steroids.co.uk" --mode strategy --sync
```

Reports land in `workspaces/uk-steroids/reports/`.

---

## CLI shortcuts (intelligence layer)

Direct connector pulls without full orchestration:

```powershell
$env:SGE_ENV_FILE = "secrets\sge-connectors.env"
cd "Search Growth Engineering Skill"

python -m intelligence.cli gsc --days 28 --dimensions query,page --out workspaces/uk-steroids/baselines/gsc-latest.json
python -m intelligence.cli ga4 --days 28 --landing-pages --out workspaces/uk-steroids/baselines/ga4-latest.json
```

---

## GSC property URL format

Must match Search Console exactly:

| Property type | Example value |
|---------------|---------------|
| URL-prefix (HTTPS) | `https://uk-steroids.co.uk/` |
| URL-prefix (www) | `https://www.uk-steroids.co.uk/` |
| Domain | `sc-domain:uk-steroids.co.uk` |

Use the same host scheme as `SITE_URL` in `.env.example`.

---

## Service account scopes

The connectors request read-only scopes:

- GSC: `https://www.googleapis.com/auth/webmasters.readonly`
- GA4: `https://www.googleapis.com/auth/analytics.readonly`

---

## Security

- Never commit service-account JSON, access tokens, or populated `.env` files.
- Store keys under `secrets/` (gitignored).
- SGE workspace `config.json` must **not** contain secret values.
- Rotate keys if exposed.

---

## Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| `Missing GSC_SITE_URL` | Env file not loaded; set `SGE_ENV_FILE` |
| `403 Forbidden` (GSC) | Service account not added as user in Search Console |
| `403 Forbidden` (GA4) | Service account lacks Viewer on the GA4 property |
| `Install google-auth` | Run `pip install -r requirements-connectors.txt` |
| GA4 sync returns empty rows | No site tagging yet, or property ID wrong |
| GSC rows below threshold | API omits low-volume queries — not zero traffic |

---

## Evidence interpretation

Per Search Growth Engineering rules:

- Missing API rows are **not** zero traffic.
- GSC data has a ~3-day processing lag (`dataState: final`).
- GA4 API metrics may differ slightly from the GA4 UI.
- Do not invent rankings, CTR, or revenue when connectors are unconfigured.
