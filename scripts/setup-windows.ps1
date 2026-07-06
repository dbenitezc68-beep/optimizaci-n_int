# Instalación de INTEREMPREX como aplicación de uso diario en Windows:
# - compila el build de producción;
# - acceso directo en el Escritorio ("INTEREMPREX") que arranca el servidor
#   si hace falta y abre el panel;
# - acceso directo en la carpeta Inicio para que el servidor (y el backup
#   diario) arranquen solos al iniciar sesión en Windows, sin navegador.
# Reversible: borra los dos accesos directos y no queda nada instalado.
$ErrorActionPreference = "Stop"
$projectDir = Split-Path -Parent $PSScriptRoot
$startScript = Join-Path $PSScriptRoot "start-interemprex.ps1"

Write-Host "Compilando build de produccion..."
Push-Location $projectDir
npm run build
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "El build de produccion fallo" }
Pop-Location

$shell = New-Object -ComObject WScript.Shell

# Escritorio: arranca (si hace falta) y abre el panel.
$desktopLnk = Join-Path ([Environment]::GetFolderPath("Desktop")) "INTEREMPREX.lnk"
$sc = $shell.CreateShortcut($desktopLnk)
$sc.TargetPath = "powershell.exe"
$sc.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$startScript`""
$sc.WorkingDirectory = $projectDir
$sc.Description = "Abrir el panel de gestion de INTEREMPREX"
$sc.IconLocation = "shell32.dll,21"
$sc.Save()
Write-Host "Acceso directo creado: $desktopLnk"

# Carpeta Inicio: servidor y backup automaticos al iniciar sesion.
$startupLnk = Join-Path ([Environment]::GetFolderPath("Startup")) "INTEREMPREX Servidor.lnk"
$sc2 = $shell.CreateShortcut($startupLnk)
$sc2.TargetPath = "powershell.exe"
$sc2.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -File `"$startScript`" -NoBrowser"
$sc2.WorkingDirectory = $projectDir
$sc2.Description = "Arranque automatico del servidor INTEREMPREX"
$sc2.Save()
Write-Host "Arranque automatico registrado: $startupLnk"

Write-Host ""
Write-Host "Listo. Doble clic en 'INTEREMPREX' (Escritorio) para abrir el panel."
Write-Host "Tras actualizar el codigo, vuelve a ejecutar este script para recompilar."
