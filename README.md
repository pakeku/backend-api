# Node.js and Express Backend
[![Backend API - CI Tests](https://github.com/pakeku/backend-api/actions/workflows/tests.yml/badge.svg)](https://github.com/pakeku/backend-api/actions/workflows/tests.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/pakeku/backend-api/badge.svg)](https://snyk.io/test/github/pakeku/backend-api)

## Requirements
Identify your MongoDB URL. Visit MongoDB to sign up and get started.

Environmental Variables:
1. MONGO_URL
2. PORT (optional)
3. ALLOWED_ORIGINS (optional)
4. ALLOWED_METHODS (optional)
5. ALLOWED_HEADERS (optional)
6. NODE_ENV=test --- When set to ***"test"***, a `mongodb-memory-server` test URI is used, and no `MONGO_URL` is required. This allows for out-of-the-box testing without a live database.

## Getting Started
1. Copy this file to .env and fill in the actual values
```bash 
cp .env.sample .env
```

1. Run a script:
```json 
"scripts": {
    "start": "node ./src/index.js",
    "dev": "env-cmd nodemon ./src/index.js",
    "test": "jest"
  }
```