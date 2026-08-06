# 🚀 Production Deployment Script for SpaceApps
param(
    [string]$ApiUrl = "https://your-api-name.onrender.com",
    [switch]$SkipBuild
)

Write-Host "🚀 SpaceApps Production Build Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Step 1: Set environment variable for this session
Write-Host "📝 Setting production API URL: $ApiUrl" -ForegroundColor Yellow
$env:NEXT_PUBLIC_API_URL = $ApiUrl

# Step 2: Build the static site (unless skipped)
if (-not $SkipBuild) {
    Write-Host "🔨 Building static site..." -ForegroundColor Yellow
    try {
        npm run build:windows
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Static site built successfully!" -ForegroundColor Green
        } else {
            Write-Host "❌ Build failed!" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "❌ Build failed with error: $_" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "⏭️  Skipping build (using existing dist folder)" -ForegroundColor Yellow
}

# Step 3: Check if dist folder exists
if (Test-Path "dist") {
    $distSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
    $distSizeMB = [math]::Round($distSize / 1MB, 2)
    Write-Host "📁 Dist folder ready ($distSizeMB MB)" -ForegroundColor Green
} else {
    Write-Host "❌ Dist folder not found! Build may have failed." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Production build complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "📋 Next steps for deployment:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 🔧 Deploy API Server:" -ForegroundColor White
Write-Host "   - Push 'server' folder to GitHub" -ForegroundColor Gray
Write-Host "   - Deploy to Render.com (free tier available)" -ForegroundColor Gray
Write-Host "   - Set environment variables in Render dashboard" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🌐 Deploy Static Site:" -ForegroundColor White
Write-Host "   - Upload 'dist' folder to Netlify/Vercel/GitHub Pages" -ForegroundColor Gray
Write-Host "   - Set NEXT_PUBLIC_API_URL=$ApiUrl in hosting environment" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ⚙️  Update API CORS:" -ForegroundColor White
Write-Host "   - Edit server/server.js CORS settings" -ForegroundColor Gray
Write-Host "   - Add your production domain to allowed origins" -ForegroundColor Gray
Write-Host ""
Write-Host "📖 For detailed instructions, see: PRODUCTION_DEPLOYMENT.md" -ForegroundColor Cyan
