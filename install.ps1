# mr-agents bootstrap installer for Windows (PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "🚀 Mr-Agents CLI Bootstrap Installer (Windows)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "This installer will:"
Write-Host " 1. Verify Node.js (version 18 or newer) is installed."
Write-Host " 2. Create a mr-agents.cmd wrapper in `$env:LOCALAPPDATA\Microsoft\WindowsApps or User PATH."
Write-Host " 3. Run 'mr-agents doctor' to verify system health."
Write-Host "============================================================"

# 1. Verify Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "❌ Error: Node.js is required but not installed. Please install from https://nodejs.org/"
    exit 1
}

$nodeVer = (node -v).TrimStart('v').Split('.')[0]
if ([int]$nodeVer -lt 18) {
    Write-Error "❌ Error: Node.js version 18+ is required. Found $(node -v)."
    exit 1
}
Write-Host "✅ Node.js detected: $(node -v)" -ForegroundColor Green

# 2. Locate script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$binPath = Join-Path $scriptDir "bin\mr-agents.js"

if (-not (Test-Path $binPath)) {
    Write-Error "❌ Error: CLI binary not found at $binPath"
    exit 1
}

# 3. Create cmd wrapper in WindowsApps or %APPDATA%\npm
$targetDir = Join-Path $env:LOCALAPPDATA "Microsoft\WindowsApps"
if (-not (Test-Path $targetDir)) {
    $targetDir = Join-Path $env:APPDATA "npm"
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

$cmdWrapper = Join-Path $targetDir "mr-agents.cmd"
$cmdContent = "@echo off`r`nnode `"$binPath`" %*"
Set-Content -Path $cmdWrapper -Value $cmdContent -Encoding Ascii

Write-Host "✅ Command wrapper created: $cmdWrapper" -ForegroundColor Green

# 4. Verify installation
Write-Host ""
& node "$binPath" doctor
Write-Host "🎉 mr-agents is ready to use!" -ForegroundColor Green
