#!/bin/bash

# MongoDB Startup Script for Windows
# This script helps you start MongoDB if it's installed

echo "🔍 Checking if MongoDB is installed..."

# Check if MongoDB is installed
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB found!"
    echo "🚀 Starting MongoDB..."
    mongod --dbpath ./data/db
else
    echo "❌ MongoDB not found in PATH"
    echo ""
    echo "📋 To install MongoDB:"
    echo "1. Download from: https://www.mongodb.com/try/download/community"
    echo "2. Install MongoDB Community Server"
    echo "3. Add MongoDB to your PATH"
    echo ""
    echo "🔄 Alternative: Use Docker"
    echo "docker run -d -p 27017:27017 --name mongodb mongo:latest"
fi

