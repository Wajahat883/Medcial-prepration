#!/bin/bash
# Docker Build and Run Script for Medical Exam Prep Platform

set -e

echo "🐳 Medical Exam Prep - Docker Build & Deploy"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Function to print colored output
print_step() {
    echo -e "${BLUE}▶${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_step "Creating .env file from example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        print_success ".env file created"
    else
        print_step "Creating default .env file..."
        cat > .env << 'EOF'
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
EOF
        print_success ".env file created with default values"
        echo -e "${YELLOW}⚠️  Please update .env with secure values before production deployment${NC}"
    fi
fi

# Check if docker images need to be built
print_step "Checking Docker images..."

# Build images
print_step "Building Docker images..."
docker-compose build --no-cache

if [ $? -eq 0 ]; then
    print_success "Docker images built successfully"
else
    print_error "Failed to build Docker images"
    exit 1
fi

# Pull additional images
print_step "Pulling additional Docker images..."
docker-compose pull

# Stop existing containers
print_step "Stopping existing containers..."
docker-compose down --remove-orphans 2>/dev/null || true

print_success "Existing containers stopped"

# Start services
print_step "Starting Docker containers..."
docker-compose up -d

if [ $? -eq 0 ]; then
    print_success "Docker containers started"
else
    print_error "Failed to start Docker containers"
    exit 1
fi

# Wait for services to be healthy
print_step "Waiting for services to be healthy..."
sleep 10

# Check service health
print_step "Checking service health..."
services=("mongodb" "redis" "server" "client" "nginx")

for service in "${services[@]}"; do
    if docker-compose ps $service | grep -q "Up"; then
        if docker-compose ps $service | grep -q "healthy\|UP"; then
            print_success "$service is healthy"
        else
            print_success "$service is running (health check in progress)"
        fi
    else
        print_error "$service is not running"
    fi
done

# Display service information
echo ""
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo ""
echo -e "${BLUE}Service URLs:${NC}"
echo "  🌐 Frontend:  http://localhost:3000"
echo "  🔌 API:       http://localhost/api"
echo "  📊 MongoDB:   mongodb://admin:password@localhost:27017"
echo "  💾 Redis:     redis://localhost:6379"
echo ""
echo -e "${BLUE}Docker Commands:${NC}"
echo "  View logs:    docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart:      docker-compose restart"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Open http://localhost:3000 in your browser"
echo "  2. Check logs: docker-compose logs -f"
echo "  3. Run tests: docker-compose exec server npm test"
echo ""
