# Arranca INTEREMPREX en modo producción si no está ya en marcha, hace un
# backup si el último tiene más de 20 horas, y abre el panel en el navegador.
# Uso: doble clic en el acceso directo "INTEREMPREX" del escritorio, o
# automático al iniciar sesión en Windows (carpeta Inicio, sin navegador).
param([switch]$NoBrowser)

$ErrorActionPreference = "Stop"
$projectDir = Split-Path -Parent $PSScriptRoot
$url = "http://localhost:3000"

function Test-ServerUp {
    try {
        Invoke-WebRequest -Uri "$url/login" -UseBasicParsing -TimeoutSec 2 | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Backup automático si el último tiene más de 20 horas (backstop diario).
$backupsDir = Join-Path $projectDir "backups"
$latest = $null
if (Test-Path $backupsDir) {
    $latest = Get-ChildItem $backupsDir -Filter "dev-*.db" |
        Sort-Object LastWriteTime -Descending | Select-Object -First 1
}
$needsBackup = $true
if ($null -ne $latest) {
    $ageHours = ((Get-Date) - $latest.LastWriteTime).TotalHours
    if ($ageHours -lt 20) { $needsBackup = $false }
}
if ($needsBackup) {
    Push-Location $projectDir
    try { npm run db:backup | Out-Null } catch {}
    Pop-Location
}

if (-not (Test-ServerUp)) {
    Start-Process -FilePath "npm.cmd" -ArgumentList "run", "start" `
        -WorkingDirectory $projectDir -WindowStyle Hidden
    $up = $false
    for ($i = 0; $i -lt 30; $i++) {
        Start-Sleep -Seconds 1
        if (Test-ServerUp) { $up = $true; break }
    }
    if (-not $up) {
        Write-Warning "El servidor no respondió en 30s. Comprueba que existe un build (npm run build)."
    }
}

if (-not $NoBrowser) {
    Start-Process $url
}
