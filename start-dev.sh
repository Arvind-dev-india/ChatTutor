#!/bin/bash
# ChatTutor Development Startup Script

set -e

echo "🚀 Starting ChatTutor Development Environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Copying from .env.dev..."
    cp .env.dev .env
    echo "📝 Please edit .env and add your API_KEY before running again."
    exit 1
fi

# Check if API_KEY is set
if grep -q "your_api_key_here" .env; then
    echo "❌ Please set your API_KEY in .env file"
    exit 1
fi

# Start docker compose
echo "🐳 Starting Docker containers..."
docker compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 5

# Check health
echo "🔍 Checking service health..."
if curl -s http://localhost:3001 > /dev/null 2>&1; then
    echo "✅ ChatTutor is running at http://localhost:3001"
else
    echo "⚠️  Service may still be starting. Check logs with:"
    echo "   docker compose -f docker-compose.dev.yml logs -f app"
fi

echo ""
echo "📋 Useful commands:"
echo "   View logs:    docker compose -f docker-compose.dev.yml logs -f"
echo "   Stop:         docker compose -f docker-compose.dev.yml down"
echo "   Rebuild:      docker compose -f docker-compose.dev.yml up -d --build"
