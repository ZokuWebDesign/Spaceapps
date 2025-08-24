param([string]$DistDir = "dist")

Write-Host "Cleaning $DistDir directory..." -ForegroundColor Yellow

if (Test-Path $DistDir) {
    try {
        Remove-Item $DistDir -Recurse -Force -ErrorAction Stop
        Write-Host "Successfully cleaned $DistDir directory" -ForegroundColor Green
    }
    catch {
        Write-Host "Normal removal failed, trying alternative method..." -ForegroundColor Yellow
        try {
            $tempDir = "temp_empty_" + (Get-Random)
            New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
            robocopy $tempDir $DistDir /MIR /R:1 /W:1 | Out-Null
            Remove-Item $tempDir -Force | Out-Null
            Remove-Item $DistDir -Force | Out-Null
            Write-Host "Successfully cleaned using alternative method" -ForegroundColor Green
        }
        catch {
            Write-Host "Could not fully clean directory, but build will continue" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "Directory does not exist, nothing to clean" -ForegroundColor Green
}
