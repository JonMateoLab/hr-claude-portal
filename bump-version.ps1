# bump-version.ps1
# Sella todos los assets locales (.css/.js) de index.html con un parámetro de versión
# basado en la fecha/hora actual, para evitar que navegadores y GitHub Pages
# sirvan versiones cacheadas tras un deploy.
#
# Uso: ejecutar ANTES de cada commit/push.
#   powershell -ExecutionPolicy Bypass -File bump-version.ps1

$ErrorActionPreference = 'Stop'
$path = Join-Path $PSScriptRoot 'index.html'
$version = Get-Date -Format 'yyyyMMddHHmm'

$text = [System.IO.File]::ReadAllText($path)

# Añade o actualiza ?v=<version> en href/src de archivos locales .css o .js
# (ignora URLs externas como https://fonts.googleapis.com porque contienen ':' o '?').
$pattern = '(?<attr>href|src)="(?<file>[^":?]+\.(?:css|js))(?:\?v=\d+)?"'
$text = [regex]::Replace($text, $pattern, {
    param($m)
    '{0}="{1}?v={2}"' -f $m.Groups['attr'].Value, $m.Groups['file'].Value, $version
})

$enc = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $text, $enc)

Write-Output "index.html sellado con version $version"
