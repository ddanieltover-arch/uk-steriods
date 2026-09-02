# Sync GSC + GA4 connectors for the uk-steroids Search Growth workspace.
# Usage (from repo root):
#   .\scripts\sge-sync-connectors.ps1
#   .\scripts\sge-sync-connectors.ps1 -EnvFile "secrets\sge-connectors.env" -ValidateOnly

param(
    [string]$EnvFile = "secrets\sge-connectors.env",
    [switch]$ValidateOnly
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$sgeRoot = Join-Path $repoRoot "Search Growth Engineering Skill"
$envPath = if ([System.IO.Path]::IsPathRooted($EnvFile)) { $EnvFile } else { Join-Path $repoRoot $EnvFile }

if (-not (Test-Path $sgeRoot)) {
    Write-Error "Search Growth Engineering Skill folder not found at $sgeRoot"
}

if (-not (Test-Path $envPath)) {
    Write-Host "Env file not found: $envPath" -ForegroundColor Yellow
    Write-Host "Copy Search Growth Engineering Skill\workspaces\uk-steroids\connectors.example.env to secrets\sge-connectors.env"
    Write-Host "See docs/search-growth-connectors.md"
    exit 1
}

$env:SGE_ENV_FILE = $envPath
Push-Location $sgeRoot

try {
    Write-Host "SGE_ENV_FILE=$envPath" -ForegroundColor Cyan

    python -m sge connectors health --id gsc
    python -m sge connectors health --id ga4

    python -m sge connectors validate --id gsc
    python -m sge connectors validate --id ga4

    if ($ValidateOnly) {
        Write-Host "Validation complete (sync skipped)." -ForegroundColor Green
        exit 0
    }

    python -m sge connectors sync --id gsc
    python -m sge connectors sync --id ga4

    Write-Host "Sync complete. Output: workspaces\uk-steroids\connectors\last-sync.json" -ForegroundColor Green
}
finally {
    Pop-Location
}
