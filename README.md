 DevOps CI/CD Pipeline Project
A Node.js application containerized with Docker and automatically built, tested, and deployed using a GitHub Actions CI/CD pipeline to AWS EC2.


📋 Table of Contents
Project Overview
Tech Stack
Project Structure
Pipeline Flow
Getting Started
API Endpoints
Running with Docker
Environment Variables
GitHub Secrets Setup
Branching Strategy


Project Overview
This project demonstrates core DevOps fundamentals:
Version control and branching with Git & GitHub
Containerization with Docker (including non-root user, health checks, layer caching)
Automated testing using Jest + Supertest
Full CI/CD pipeline using GitHub Actions (Test → Build → Deploy)
Cloud deployment to AWS EC2

Tech Stack
- Tool

Node.js + Express
Lightweight backend application
Docker
Containerization for consistent environments
GitHub Actions
CI/CD automation (test, build, deploy)
AWS EC2
Cloud deployment target
Jest + Supertest
Automated testing with coverage
Project Structure
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions pipeline (Test → Build → Deploy)
├── app.js                     # Node.js/Express application
├── app.test.js                # Automated tests (Jest + Supertest)
├── package.json               # App metadata, dependencies, scripts
├── Dockerfile                 # Docker configuration (with health check)
├── .dockerignore              # Excludes unnecessary files from Docker builds
├── .env.example               # Template for environment variables
├── .gitignore                 # Prevents sensitive files from being committed
└── README.md                  # Project documentation
Pipeline Flow
Push to GitHub
      │
      ▼
┌─────────────┐
│  1. TEST    │  Run Jest tests + coverage report
└──────┬──────┘
       │ (pass)
       ▼
┌─────────────┐
│  2. BUILD   │  Docker build + container smoke test (/health check)
└──────┬──────┘
       │ (pass, main branch only)
       ▼
┌─────────────┐
│  3. DEPLOY  │  SSH into EC2, pull latest, rebuild, restart container
└─────────────┘
Getting Started
Prerequisites
Node.js v18+
Docker (for containerized run)
Local Setup
# 1. Clone the repository
git clone https://github.com/jalajcode4u/Development-CI-CD-Pipeline-Project.git
cd Development-CI-CD-Pipeline-Project

# 2. Set up environment variables
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Run the application
npm start
Run Tests
npm test
API Endpoints
Method
Endpoint
Description
GET
/
Project info and version
GET
/health
Health check (used by Docker & monitoring)
GET
/status
Runtime status (env, memory, uptime)
Example response — /health:
{
  "status": "healthy",
  "uptime": 42.3,
  "timestamp": "2025-05-01T10:00:00.000Z"
}
Running with Docker
# Build the image
docker build -t cicd-pipeline-app .

# Run the container
docker run -d -p 3000:3000 --name cicd-app cicd-pipeline-app

# Verify it's running
curl http://localhost:3000/health

# Stop the container
docker stop cicd-app
Environment Variables
Copy .env.example to .env and configure:
PORT=3000
NODE_ENV=development
⚠️ Never commit your .env file. It's listed in .gitignore.
GitHub Secrets Setup
For the deploy stage to work, add these secrets in your GitHub repo under Settings → Secrets and variables → Actions:
Secret
Description
EC2_HOST
Public IP or DNS of your AWS EC2 instance
EC2_USER
SSH username (e.g., ec2-user or ubuntu)
EC2_SSH_KEY
Contents of your .pem private key file
Branching Strategy
Branch
Purpose
main
Production — triggers full CI/CD including deploy
dev
Development — triggers test and build only
feature/*
Feature branches — merge into dev via pull request
Author
Jalaj Kumar
GitHub: github.com/jalajcode4u
Email: jalajkumar10112110@gmail.com

