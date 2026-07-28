$files = Get-ChildItem -Path . -Recurse -Include "*.css","*.jsx","*.js" | Where-Object { $_.FullName -notmatch "node_modules|\.next|generated" }

$replacements = @{
    "#6B2D8B" = "#463280"
    "#35105C" = "#463280"
    "#4b216b" = "#463280"
    "#59436f" = "#463280"
    "#4e1f68" = "#3a2a6b"
    "#4a2f6b" = "#463280"
}

foreach ($file in $files) {
    $content = Get-Content -LiteralPath $file.FullName -Raw
    $changed = $false
    foreach ($old in $replacements.Keys) {
        if ($content -match [regex]::Escape($old)) {
            $content = $content -replace [regex]::Escape($old), $replacements[$old]
            $changed = $true
        }
    }
    if ($changed) {
        Set-Content -LiteralPath $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}