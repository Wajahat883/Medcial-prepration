# Docker Deployment Documentation

## 🐳 Overview

This Docker setup provides a complete production-ready stack for the Medical Exam Prep platform with the following services:

- **MongoDB** - Primary database for application data
- **Redis** - Cache and session store
- **Express.js Server** - Backend API
- **Next.js Client** - Frontend application
- **Nginx** - Reverse proxy and load balancer

## 📋 Prerequisites

- Docker Desktop (includes Docker and Docker Compose)
  - Windows: https://docs.docker.com/desktop/install/windows-install/
  - Mac: https://docs.docker.com/desktop/install/mac-install/
  - Linux: https://docs.docker.com/engine/install/ubuntu/

- Minimum Requirements:
  - RAM: 4GB minimum (8GB recommended)
  - Disk: 10GB free space
  - CPU: 2 cores minimum

## 🚀 Quick Start

### Windows (PowerShell)

```powershell
# Navigate to project directory
cd medical-exam-prep

# Run build script
.\docker-build.ps1

# Or with options
.\docker-build.ps1 -NoBuild              # Use existing images
.\docker-build.ps1 -RemoveImages         # Clean rebuild
```

### Linux/Mac (Bash)

```bash
# Navigate to project directory
cd medical-exam-prep

# Make script executable
chmod +x docker-build.sh

# Run build script
./docker-build.sh
```

### Manual Docker Commands

```bash
# Build all images
docker-compose build --no-cache

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Remove all containers and volumes
docker-compose down -v
```

## 🔧 Services Configuration

### 1. MongoDB (27017)

**Purpose**: Primary database for all application data

**Environment Variables**:
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=medical-exam-prep
```

**Connection String**:
```
mongodb://admin:password@localhost:27017/medical-exam-prep?authSource=admin
```

**Inside Docker Network**:
```
mongodb://admin:password@mongodb:27017/medical-exam-prep?authSource=admin
```

**Health Check**: MongoDB ping every 10 seconds

**Troubleshooting**:
- If MongoDB won't start: `docker-compose logs mongodb`
- To reset database: `docker volume rm medical-exam-prep_mongodb_data`

### 2. Redis (6379)

**Purpose**: Session store and cache

**Configuration**:
```
- Host: redis
- Port: 6379
- Password: redis-password (inside Docker)
```

**Connection String**:
```
redis://:redis-password@redis:6379
```

**Inside Docker Network**:
```
redis://:redis-password@redis:6379
```

**Health Check**: Redis PING every 10 seconds

**Usage**:
- Session storage
- Cache layer for frequently accessed data
- Rate limiting

### 3. Express.js Server (5000)

**Purpose**: Backend API server

**Environment Variables**:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password@mongodb:27017/medical-exam-prep?authSource=admin
REDIS_URL=redis://:redis-password@redis:6379
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000,http://client:3000
```

**Health Endpoint**:
```
GET http://localhost:5000/api/health
```

**Available Endpoints**:
- Phase 4 API: `/api/phase4/*` (18 endpoints)
- Analytics: `/api/analytics/*`
- Auth: `/api/auth/*`
- Questions: `/api/questions/*`

**Troubleshooting**:
- Check logs: `docker-compose logs -f server`
- Verify database connection: `docker-compose logs server | grep "Connected"`
- Test endpoint: `curl http://localhost:5000/api/health`

### 4. Next.js Client (3000)

**Purpose**: Frontend web application

**Environment Variables**:
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://server:5000/api (Docker)
                   http://localhost/api (External)
```

**Features**:
- Server-side rendering
- Static generation
- API integration
- Authentication

**Troubleshooting**:
- Check logs: `docker-compose logs -f client`
- Clear Next.js cache: `docker-compose restart client`
- Check API connectivity: Open browser console for network errors

### 5. Nginx (80, 443)

**Purpose**: Reverse proxy and load balancer

**Routes**:
```
/          → Client (Next.js)
/api/*     → Server (Express)
/health    → Health check endpoint
```

**Features**:
- Gzip compression for assets
- Caching headers for static files
- CORS headers for API requests
- Request logging

**Troubleshooting**:
- Check configuration: `docker-compose exec nginx nginx -t`
- View error log: `docker-compose logs nginx`
- Test connectivity: `curl http://localhost/health`

## 📊 Service Dependencies

```
nginx
├── client (3000)
└── server (5000)
    ├── mongodb (27017)
    └── redis (6379)
```

Services start in order of dependencies:
1. mongodb (no dependencies)
2. redis (no dependencies)
3. server (depends on mongodb, redis)
4. client (depends on server)
5. nginx (depends on client, server)

## 🔐 Security Configuration

### Environment Variables

**Production Checklist**:
- [ ] Change `JWT_SECRET` to a strong random value
- [ ] Change MongoDB credentials
- [ ] Change Redis password
- [ ] Set `NODE_ENV=production`
- [ ] Update `CORS_ORIGIN` for your domain
- [ ] Enable SSL/TLS in Nginx
- [ ] Use environment-specific `.env` files

### Network Security

- All services on isolated `mep-network` bridge
- Only Nginx exposes ports to host
- Internal communication over Docker network
- Health checks on all services

### Data Protection

- MongoDB volumes persisted to named volumes
- Redis AOF (Append-Only File) enabled
- Automatic backup capability via volumes

## 📈 Performance Optimization

### Memory Configuration

```bash
# Allocate resources to Docker Desktop
Docker Desktop Settings → Resources → Memory: 6GB+
```

### Nginx Caching

- Static assets cached for 30 days
- Gzip compression enabled
- Cache busting via Next.js

### Database Optimization

- MongoDB indexes on frequently queried fields
- Redis for session/cache layer
- Connection pooling via Mongoose

## 🔍 Monitoring & Logs

### View Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs server
docker-compose logs client
docker-compose logs nginx

# Follow logs (real-time)
docker-compose logs -f

# Last N lines
docker-compose logs --tail 50
```

### Health Status

```bash
# Check all services
docker-compose ps

# Check specific service
docker-compose exec server curl -s http://localhost:5000/api/health
```

### Metrics

```bash
# CPU and Memory usage
docker stats

# Inspect service
docker-compose inspect mongodb
```

## 🧪 Testing

### Run Tests Inside Docker

```bash
# Backend tests
docker-compose exec server npm test

# Frontend tests
docker-compose exec client npm test

# Run specific test file
docker-compose exec server npm test -- --testPathPattern=piracy
```

### Database Testing

```bash
# Connect to MongoDB shell
docker-compose exec mongodb mongosh -u admin -p password

# Connect to Redis
docker-compose exec redis redis-cli -a redis-password
```

## 🔄 Development Workflow

### Live Code Updates

Mount volumes for hot-reload:
```yaml
volumes:
  - ./server:/app
  - /app/node_modules
```

Files will be watched and reloaded automatically.

### Database Access

**MongoDB via localhost**:
```
Connection: mongodb://admin:password@localhost:27017
Database: medical-exam-prep
Collections: exams, users, questions, etc.
```

**MongoDB GUI Tools**:
- MongoDB Compass
- VS Code MongoDB extension
- AWS DMS

**Redis Access**:
```bash
# Via CLI
docker-compose exec redis redis-cli -a redis-password

# Commands
SET key value
GET key
DEL key
FLUSHALL
```

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs service-name

# Rebuild without cache
docker-compose build --no-cache

# Remove volume and restart
docker-compose down -v
docker-compose up -d
```

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000  # Find process
taskkill /PID <PID> /F         # Kill process

# Linux/Mac
lsof -i :3000                  # Find process
kill -9 <PID>                  # Kill process
```

### Out of Disk Space

```bash
# Clean up images
docker image prune -a

# Clean up volumes
docker volume prune

# Clean up dangling containers
docker container prune
```

### Database Connection Error

```bash
# Ensure MongoDB is healthy
docker-compose logs mongodb

# Reconnect to database
docker-compose restart server

# Verify connection string
echo $MONGODB_URI
```

### API Not Responding

```bash
# Check server status
docker-compose ps server

# Check logs
docker-compose logs -f server

# Test endpoint
curl http://localhost:5000/api/health

# Check network connectivity
docker-compose exec client curl http://server:5000/api/health
```

## 📦 Deployment to Production

### Pre-Deployment Checklist

- [ ] Update all environment variables in `.env`
- [ ] Change all default passwords
- [ ] Enable SSL/TLS in Nginx
- [ ] Set up log aggregation
- [ ] Configure backup strategy
- [ ] Set resource limits
- [ ] Enable monitoring and alerting

### Production Environment Variables

```env
NODE_ENV=production
JWT_SECRET=${SECURE_JWT_SECRET}
MONGODB_URI=${SECURE_MONGODB_URI}
REDIS_URL=${SECURE_REDIS_URL}
CORS_ORIGIN=https://yourdomain.com
```

### Scaling Considerations

- Use load balancer in front of multiple Nginx instances
- Use managed MongoDB (MongoDB Atlas)
- Use managed Redis (Redis Cloud)
- Enable auto-scaling for Kubernetes deployment

## 🔗 Additional Resources

- Docker Documentation: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- MongoDB Docker: https://hub.docker.com/_/mongo
- Redis Docker: https://hub.docker.com/_/redis
- Nginx: https://hub.docker.com/_/nginx

## 📞 Support

For issues or questions:
1. Check Docker logs: `docker-compose logs -f`
2. Review troubleshooting section above
3. Check service health: `docker-compose ps`
4. Verify environment variables: `docker-compose exec service env`

---

**Last Updated**: 2026-02-12
**Docker Compose Version**: 3.8
**Tested on**: Windows 11, macOS 13+, Ubuntu 22.04 LTS
