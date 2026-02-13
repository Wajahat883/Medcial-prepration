# Docker Build and Deploy Script for Medical Exam Prep Platform
# PowerShell version for Windows

param(
    [string]$Action = "build",
    [switch]$NoBuild,
    [switch]$RemoveImages
)

# Color output helper
function Write-Success {
    Write-Host "✓ $args" -ForegroundColor Green
}

function Write-Error-Custom {
    Write-Host "✗ $args" -ForegroundColor Red
}

function Write-Step {
    Write-Host "▶ $args" -ForegroundColor Cyan
}

function Write-Warning-Custom {
    Write-Host "⚠️  $args" -ForegroundColor Yellow
}

# Check if Docker is installed
Write-Step "Checking Docker installation..."
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "Docker is not installed. Please install Docker Desktop first."
    exit 1
}

if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "Docker Compose is not installed. Please install Docker Desktop first."
    exit 1
}

Write-Success "Docker and Docker Compose found"

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Step "Creating .env file..."
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Success ".env file created from example"
    } else {
        $envContent = @"
# MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=medical-exam-prep

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Redis
REDIS_PASSWORD=redis-password

# API Configuration
API_BASE_URL=http://server:5000/api
CORS_ORIGIN=http://localhost:3000,http://localhost

# Database
MONGODB_URI=mongodb://admin:password@mongodb:27017/medical-exam-prep?authSource=admin
REDIS_URL=redis://:redis-password@redis:6379

# Node Environment
NODE_ENV=production

# Next.js
NEXT_PUBLIC_API_URL=http://localhost/api
"@
        Set-Content ".env" $envContent
        Write-Success ".env file created with default values"
        Write-Warning-Custom "Please update .env with secure values before production deployment"
    }
}

# Remove existing containers and images if requested
if ($RemoveImages) {
    Write-Step "Removing existing containers and images..."
    docker-compose down --remove-orphans --rmi all 2>$null
    Write-Success "Cleaned up containers and images"
}

# Stop existing containers
Write-Step "Stopping existing containers..."
docker-compose down --remove-orphans 2>$null
Write-Success "Existing containers stopped"

if (-not $NoBuild) {
    # Build Docker images
    Write-Step "Building Docker images..."
    Write-Step "This may take several minutes on first build..."
    docker-compose build --no-cache
    
    if ($LASTEXITCODE -ne 0) {
        Write-Error-Custom "Failed to build Docker images"
        exit 1
    }
    Write-Success "Docker images built successfully"
} else {
    Write-Step "Skipping build (using existing images)"
}

# Start services
Write-Step "Starting Docker containers..."
docker-compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Error-Custom "Failed to start Docker containers"
    exit 1
}
Write-Success "Docker containers started"

# Wait for services to be ready
Write-Step "Waiting for services to be ready (10 seconds)..."
Start-Sleep -Seconds 10

# Check service status
Write-Step "Checking service status..."
$services = @("mongodb", "redis", "server", "client", "nginx")

foreach ($service in $services) {
    $status = docker-compose ps $service | Select-String "Up"
    if ($status) {
        Write-Success "$service is running"
    } else {
        Write-Error-Custom "$service is not running"
    }
}

# Display completion information
Write-Host ""
Write-Host "════════════════════════════════════════════" -ForegroundColor Green
Write-Success "Deployment Complete!"
Write-Host "════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

Write-Host "🌐 Service URLs:" -ForegroundColor Cyan
Write-Host "  Frontend:     http://localhost:3000"
Write-Host "  API:          http://localhost/api"
Write-Host "  MongoDB:      mongodb://admin:password@localhost:27017"
Write-Host "  Redis:        redis://localhost:6379"
Write-Host ""

Write-Host "📋 Docker Commands:" -ForegroundColor Cyan
Write-Host "  View logs:         docker-compose logs -f"
Write-Host "  Stop services:     docker-compose down"
Write-Host "  Restart services:  docker-compose restart"
Write-Host "  View containers:   docker-compose ps"
Write-Host "  Run shell:         docker-compose exec server sh"
Write-Host ""

Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Open http://localhost:3000 in your browser"
Write-Host "  2. Check logs: docker-compose logs -f"
Write-Host "  3. Run tests: docker-compose exec server npm test"
Write-Host "  4. Verify all services are healthy"
Write-Host ""

# Save status
Write-Host "📝 Creating status file..." -ForegroundColor Cyan
$statusData = @{
    Timestamp = Get-Date
    Status = "Running"
    Services = @{
        MongoDB = "http://localhost:27017"
        Redis = "redis://localhost:6379"
        Frontend = "http://localhost:3000"
        API = "http://localhost/api"
        Nginx = "http://localhost"
    }
    LastBuilt = Get-Date
} | ConvertTo-Json

Set-Content "docker_status.txt" $statusData
Write-Success "Status saved to docker_status.txt"

Write-Host ""
