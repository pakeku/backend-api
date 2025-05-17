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
6. NODE\*ENV=test --- When set to \*\*\*"test"\_\*\*, a `mongodb-memory-server` test URI is used, and no `MONGO_URL` is required. This allows for out-of-the-box testing without a live database.
7. JWT_SECRET --- A cryptographically secure secret used to sign and verify JSON Web Tokens (JWTs). This is required for authentication to work correctly.
   Use a long, random string—at least 32 characters, ideally generated using a password manager or Node.js: `bash node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
8.

## Getting Started

1. Copy this file to .env and fill in the actual values

```bash
cp .env.sample .env
```

1. Run a script:

```json
"scripts": {
    "prebuild":"rm -rf dist",
    "build":"tsc",
    "start": "node ./src/index.js",
    "dev": "env-cmd nodemon ./src/index.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "lint:check": "eslint . --ext .ts --no-ignore",
    "format": "prettier --write ."
  }
```
