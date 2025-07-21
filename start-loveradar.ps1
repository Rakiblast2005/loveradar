# start-loveradar.ps1

Set-Location -Path "C:\Users\A Nagarajan\Downloads\loveradar"

if (-Not (Test-Path -Path "node_modules")) {
    Write-Host "Installing dependencies..."
    npm install
}

Write-Host "Starting the app..."
npm run dev
5h