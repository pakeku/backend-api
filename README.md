# Node.js and Express Backend

[![Backend API - CI Tests](https://github.com/pakeku/backend-api/actions/workflows/tests.yml/badge.svg)](https://github.com/pakeku/backend-api/actions/workflows/tests.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/pakeku/backend-api/badge.svg)](https://snyk.io/test/github/pakeku/backend-api)
[![code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat&logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/linting-eslint-blue.svg?style=flat&logo=eslint)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/language-typescript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Swagger UI](https://img.shields.io/badge/docs-Swagger_UI-blue?logo=swagger)](http://localhost:3000/api-docs)

## Configuration
You can define your environmental variables in a `.env` file at the root of the project. (Start by copying `.env.sample` → `.env`).\
**⚠️ Important:** Never commit your `.env` file to version control.

| Variable | Required | Description | Example |
| --- | --- | --- | --- |
| `MONGO_URL` | ✅ Yes | Connection string for MongoDB. Obtain this from your MongoDB provider. | `mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority` |
| `PORT` | ❌ No | Port for the Express server to listen on. Defaults to `3000`. | `8080` |
| `ALLOWED_ORIGINS` | ❌ No | Comma-separated list of allowed origins for CORS. | `http://localhost:3000,https://your-frontend.com` |
| `ALLOWED_METHODS` | ❌ No | Comma-separated list of allowed HTTP methods for CORS. | `GET,POST,PUT,DELETE` |
| `ALLOWED_HEADERS` | ❌ No | Comma-separated list of allowed request headers for CORS. | `Content-Type,Authorization` |
| `NODE_ENV` | ⚠️ Depends | Application environment: `development`, `production`, or `test`. `MONGO_URL` not required in `test`. | `development` |
| `JWT_SECRET` | ✅ Yes | Secret key used for signing/verifying JWTs. Must be secure and private. | `Use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |

## Getting Started
1. Install Dependencies 
```bash
npm run install
```

2. Create .env file and gather your variable values.
```bash
cp .env.sample .env
```

3. Run script:
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
