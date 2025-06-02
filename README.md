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

| Variable          | Required   | Description                                                                                          | Example                                                                                         |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `MONGO_URL`       | ✅ Yes     | Connection string for MongoDB. Obtain this from your MongoDB provider.                               | `mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority` |
| `PORT`            | ❌ No      | Port for the Express server to listen on. Defaults to `3000`.                                        | `8080`                                                                                          |
| `ALLOWED_ORIGINS` | ❌ No      | Comma-separated list of allowed origins for CORS.                                                    | `http://localhost:3000,https://your-frontend.com`                                               |
| `ALLOWED_METHODS` | ❌ No      | Comma-separated list of allowed HTTP methods for CORS.                                               | `GET,POST,PUT,DELETE`                                                                           |
| `ALLOWED_HEADERS` | ❌ No      | Comma-separated list of allowed request headers for CORS.                                            | `Content-Type,Authorization`                                                                    |
| `NODE_ENV`        | ⚠️ Depends | Application environment: `development`, `production`, or `test`. `MONGO_URL` not required in `test`. | `development`                                                                                   |
| `JWT_SECRET`      | ⚠️ Depends | Previously used for local user authentication JWTs. Now, user auth is via Auth0. May still be used for other non-user-auth JWT purposes if any exist in the system. Secure and private if used. | `Use: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`                 |

## Authentication

This application uses **Auth0** for handling user authentication. As a result, the previous local authentication endpoints (`/auth/register` and `/auth/login`) have been removed. Users should now authenticate via Auth0's Universal Login page (or a similar Auth0-managed flow), and then use the obtained JWT (Access Token) to access protected API endpoints.

The following environment variables are required for Auth0 integration:

| Variable            | Required | Description                                                                                                | Example                                  |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `AUTH0_DOMAIN`      | ✅ Yes   | Your Auth0 application domain. This is the domain where your Auth0 tenant is hosted.                         | `your-tenant.auth0.com`                  |
| `AUTH0_AUDIENCE`    | ✅ Yes   | Your Auth0 API identifier (Audience). This is the unique identifier for your API registered with Auth0.      | `https://your-api-identifier.com`        |
| `AUTH0_CLIENT_ID`   | ⚠️ Depends | Your Auth0 application's Client ID. While primarily used by frontends, it might be needed for some backend flows or machine-to-machine auth. The current backend middleware primarily uses `AUTH0_DOMAIN` and `AUTH0_AUDIENCE` for token validation. | `your_auth0_client_id`                   |

Make sure to configure these variables in your `.env` file based on your Auth0 application and API settings. The `JWT_SECRET` is no longer used for primary authentication but might be kept if other parts of the system (not related to user auth) still use local JWTs for other purposes. For user authentication, Auth0's signed JWTs (typically RS256) are now validated.

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
