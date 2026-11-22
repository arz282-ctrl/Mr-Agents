# mr-agents bootstrap installer for Windows (PowerShell)
# Works both locally (.\install.ps1) and remotely (irm .../install.ps1 | iex)
$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/arz282-ctrl/Mr-Agents.git"
$ArchiveUrl = "https://github.com/arz282-ctrl/Mr-Agents/archive/HEAD.zip"
$MrAgentsHome = if ($env:MR_AGENTS_HOME) { $env:MR_AGENTS_HOME } else { Join-Path $HOME ".mr-agents" }
$DefaultRepoDir = Join-Path $MrAgentsHome "repo"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "🚀 Mr-Agents CLI Bootstrap Installer (Windows)" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "This installer will:"
Write-Host " 1. Verify Node.js (version 18 or newer) is installed."
Write-Host " 2. Locate or bootstrap the Mr-Agents repository."
Write-Host " 3. Create a mr-agents.cmd wrapper in User PATH."
Write-Host " 4. Run 'mr-agents' CLI command (or 'doctor' by default)."
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

# 2. Locate script directory or bootstrap into ~/.mr-agents/repo
New-Item -ItemType Directory -Force -Path $MrAgentsHome | Out-Null
$scriptDir = if ($MyInvocation.MyCommand.Path) { Split-Path -Parent $MyInvocation.MyCommand.Path } else { "" }
$repoDir = ""

if ($scriptDir -and (Test-Path (Join-Path $scriptDir "bin\mr-agents.js"))) {
    $repoDir = $scriptDir
    Write-Host "✅ Local checkout detected at: $repoDir" -ForegroundColor Green
    if (($repoDir -ne $DefaultRepoDir) -and (-not (Test-Path $DefaultRepoDir))) {
        try {
            New-Item -ItemType Junction -Path $DefaultRepoDir -Target $repoDir -ErrorAction Stop | Out-Null
        } catch {
            # Ignore junction errors if permissions or filesystem differ
        }
    }
} else {
    if (Test-Path (Join-Path $DefaultRepoDir "bin\mr-agents.js")) {
        $repoDir = $DefaultRepoDir
        Write-Host "✅ Existing installation detected at: $repoDir" -ForegroundColor Green
        if ((Test-Path (Join-Path $repoDir ".git")) -and (Get-Command git -ErrorAction SilentlyContinue)) {
            try { git -C $repoDir pull --ff-only 2>$null | Out-Null } catch {}
        }
    } else {
        $fallbacks = @(
            (Join-Path $HOME ".gemini\antigravity\scratch\Mr-Agents"),
            (Join-Path $HOME "Desktop\Mr-Agents"),
            (Join-Path $HOME "Mr-Agents")
        )
        foreach ($fb in $fallbacks) {
            if (Test-Path (Join-Path $fb "bin\mr-agents.js")) {
                Copy-Item -Path $fb -Destination $DefaultRepoDir -Recurse -Force
                $repoDir = $DefaultRepoDir
                Write-Host "✅ Bootstrapped from local repository cache: $fb" -ForegroundColor Green
                break
            }
        }

        if (-not $repoDir) {
            Write-Host "⬇️  Downloading Mr-Agents into $DefaultRepoDir..." -ForegroundColor Cyan
            if (Get-Command git -ErrorAction SilentlyContinue) {
                try {
                    git clone --depth 1 $RepoUrl $DefaultRepoDir 2>$null | Out-Null
                    if (Test-Path (Join-Path $DefaultRepoDir "bin\mr-agents.js")) {
                        $repoDir = $DefaultRepoDir
                    }
                } catch {}
            }
            if (-not $repoDir) {
                $tmpZip = Join-Path ([System.IO.Path]::GetTempPath()) "mr-agents-$([Guid]::NewGuid()).zip"
                $tmpExtract = Join-Path ([System.IO.Path]::GetTempPath()) "mr-agents-extract-$([Guid]::NewGuid())"
                Invoke-WebRequest -Uri $ArchiveUrl -OutFile $tmpZip -UseBasicParsing
                Expand-Archive -Path $tmpZip -DestinationPath $tmpExtract -Force
                $innerDir = Get-ChildItem -Path $tmpExtract -Directory | Select-Object -First 1
                if (Test-Path $DefaultRepoDir) { Remove-Item -Path $DefaultRepoDir -Recurse -Force }
                Move-Item -Path $innerDir.FullName -Destination $DefaultRepoDir
                Remove-Item -Path $tmpZip -Force -ErrorAction SilentlyContinue
                Remove-Item -Path $tmpExtract -Recurse -Force -ErrorAction SilentlyContinue
                $repoDir = $DefaultRepoDir
                Write-Host "✅ Downloaded and extracted Mr-Agents archive to $repoDir" -ForegroundColor Green
            }
        }
    }
}

$binPath = Join-Path $repoDir "bin\mr-agents.js"
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

# 4. Run requested CLI arguments or default to doctor
Write-Host ""
if ($args.Count -gt 0) {
    & node "$binPath" @args
} else {
    & node "$binPath" doctor
    Write-Host ""
    Write-Host "💡 Quick Usage Examples:" -ForegroundColor Cyan
    Write-Host "   mr-agents list"
    Write-Host "   mr-agents install --all --agent gemini"
    Write-Host "   mr-agents install --pack-skills --agent claude"
}
Write-Host "🎉 mr-agents is ready to use!" -ForegroundColor Green
