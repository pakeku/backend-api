# Node.js and Express Backend

[![Backend API - CI Tests](https://github.com/pakeku/backend-api/actions/workflows/tests.yml/badge.svg)](https://github.com/pakeku/backend-api/actions/workflows/tests.yml)
[![Known Vulnerabilities](https://snyk.io/test/github/pakeku/backend-api/badge.svg)](https://snyk.io/test/github/pakeku/backend-api)
[![code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat&logo=prettier)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/linting-eslint-blue.svg?style=flat&logo=eslint)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/language-typescript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)

## Configuration

This backend API is configured using environment variables. You can set these variables in a `.env` file in the root of the project (copy `.env.sample` to `.env` and modify the values). **Important: Ensure your `.env` file is not committed to your version control system.**

The following environment variables are used:

- `MONGO_URL`: **Required.** The connection string for your MongoDB database. You can obtain this from your MongoDB provider (e.g., MongoDB Atlas). Example: `mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority`
- `PORT`: **Optional.** The port number that the Express server will listen on. If not specified, it defaults to `3000`. Example: `8080`
- `ALLOWED_ORIGINS`: **Optional.** A comma-separated list of allowed origins for Cross-Origin Resource Sharing (CORS). This controls which websites can make requests to your API. Example: `http://localhost:3000,https://your-frontend.com`
- `ALLOWED_METHODS`: **Optional.** A comma-separated list of allowed HTTP methods for CORS. Example: `GET,POST,PUT,DELETE`
- `ALLOWED_HEADERS`: **Optional.** A comma-separated list of allowed request headers for CORS. Example: `Content-Type,Authorization`
- `NODE_ENV`: Specifies the application environment.
  - `test`: When set to `test`, the application will use an in-memory MongoDB server provided by `mongodb-memory-server` for testing purposes. In this mode, the `MONGO_URL` variable is not required.
  - `development`: Typically used during development. You might have specific development configurations.
  - `production`: Used in the production environment.
- `JWT_SECRET`: **Required and Critically Important.** A secret key used to sign and verify JSON Web Tokens (JWTs) for authentication. **This should be a long, random, and secure string. Do not share or expose this secret.**
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

## Getting Started

Copy this file to .env and fill in the actual values

```bash
cp .env.sample .env
```

Install Dependencies

```bash
npm run install
```

Run a script:

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
