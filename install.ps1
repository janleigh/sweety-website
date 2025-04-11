# Check if Node.js is installed
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js is not installed. Installing Node.js..."
    # Download and install Node.js (LTS version)
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi" -OutFile "node-lts.msi"
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i node-lts.msi /quiet /norestart" -Wait
    Remove-Item -Path "node-lts.msi"
} else {
    Write-Host "Node.js is already installed."
}

# Verify Node.js installation
if (-not (Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js installation failed. Please install it manually and try again."
    exit 1
}

# Enable Corepack
Write-Host "Enabling Corepack..."
corepack enable

# Check if Yarn is installed
if (-not (Get-Command "yarn" -ErrorAction SilentlyContinue)) {
    Write-Host "Yarn is not installed. Installing Yarn..."
    corepack prepare yarn@stable --activate
} else {
    Write-Host "Yarn is already installed."
}

# Install dependencies
Write-Host "Installing dependencies with Yarn..."
yarn install

# Start the development server
Write-Host "Starting the development server..."
yarn dev
