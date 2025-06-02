import { auth } from 'express-oauth2-jwt-bearer';

// Retrieve Auth0 configuration from environment variables
const auth0Domain = process.env.AUTH0_DOMAIN;
const auth0Audience = process.env.AUTH0_AUDIENCE;

// Check if the required environment variables are set
if (!auth0Domain) {
  throw new Error('AUTH0_DOMAIN environment variable is not set. Please provide the Auth0 Domain.');
}

if (!auth0Audience) {
  throw new Error('AUTH0_AUDIENCE environment variable is not set. Please provide the Auth0 API Audience.');
}

// Configure the Auth0 middleware
// This middleware will validate JWTs issued by the specified Auth0 domain and intended for the specified audience.
const authMiddleware = auth({
  issuerBaseURL: auth0Domain,
  audience: auth0Audience,
  tokenSigningAlg: 'RS256', // Specify the algorithm used to sign the JWTs
});

export default authMiddleware;
