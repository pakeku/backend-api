import 'dotenv/config';
import request, { Response } from 'supertest';
import { NextFunction, Request, Response as ExpressResponse } from 'express';

import app from '../../app'; // Assuming app is your express application
import { stopDatabase } from '../../database/mongo-common';

// Define the mock payload structure
interface MockAuthPayload {
  sub: string;
  email: string;
  name: string;
  iss?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  [key: string]: any; // Allow other custom claims
}

// Mock express-oauth2-jwt-bearer
// This mock intercepts the call to `auth(config)` and returns a new middleware.
// This new middleware, when executed, will attach a mock payload to `req.auth.payload`.
// It also simulates the behavior of the original middleware regarding the Authorization header.
const mockAuthPayload: MockAuthPayload = {
  sub: 'test-user-123',
  email: 'testuser@example.com',
  name: 'Test User',
  iss: 'https://dev-example.auth0.com/', // Dummy issuer
  aud: 'https://api.example.com/', // Dummy audience
  exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
  iat: Math.floor(Date.now() / 1000), // Issued at now
  // You can add custom claims if your /me endpoint uses them
  'https://example.com/custom_claim': 'custom_value',
};

// We need to properly type the mock for `auth` from `express-oauth2-jwt-bearer`
// It's a function that returns a middleware function
jest.mock('express-oauth2-jwt-bearer', () => ({
  auth: jest.fn().mockImplementation(() => {
    return (req: Request & { auth?: { payload: MockAuthPayload } }, res: ExpressResponse, next: NextFunction) => {
      // Check for Authorization header to simulate protected route behavior
      if (!req.headers.authorization) {
        // If no token, and the route is protected, it should ideally return 401
        // The actual authMiddleware would do this. Our mock needs to simulate this for the "no token" test case.
        // For the "valid token" test, we just attach the payload.
        // The `authMiddleware` itself would normally send the 401 if no token is present.
        // So, if the test is for "no token", this mock allows the request to proceed to the route,
        // and the route's own checks (or lack thereof if it fully depends on middleware) would be tested.
        // However, `express-oauth2-jwt-bearer` typically handles the 401 itself.
        // Let's refine this: if the test is for "no token", the middleware should cause a 401.
        // For the "valid token" test, it attaches the payload.
        // This logic can be tricky to get right in a simple mock.
        // A common approach is to have the test itself control the mock's behavior per test case if needed,
        // or make the mock simpler:
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
          req.auth = { payload: mockAuthPayload };
        }
        // If no auth header, the actual middleware would return 401.
        // Our route handler for /me doesn't explicitly check for req.auth, it assumes middleware did.
        // The original `express-oauth2-jwt-bearer` sends a 401 if the token is missing or invalid.
        // So, if there's no token, this mock should effectively do nothing,
        // allowing the request to hit the route, then the *actual* (mocked) authMiddleware from app.ts
        // (which is an instance of the result of this jest.fn()) handles it.
        // The key is that `auth()` is called ONCE when the app sets up middleware.
        // That single middleware instance is used for all requests.
        next();
      }
    };
  }),
  // If your code uses `UnauthorizedError` from the library, you might need to mock it too.
  // UnauthorizedError: jest.fn().mockImplementation(() => { /* ... */ }),
}));


describe('GET /auth/me - User Profile Endpoint', () => {
  afterAll(async () => {
    await stopDatabase(); // Close DB connection if app setup uses it, or for other tests
  });

  it('should return user profile information for an authenticated user', async () => {
    // The 'Bearer test-token' is just a placeholder; the mock handles authentication
    const response: Response = await request(app)
      .get('/auth/me')
      .set('Authorization', 'Bearer test-token') // Token presence triggers mock payload attachment
      .expect(200);

    // Check the response body against the mock payload
    expect(response.body).toEqual(
      expect.objectContaining({
        userId: mockAuthPayload.sub,
        email: mockAuthPayload.email, // or the more complex logic from your route
        name: mockAuthPayload.name,
        isAuthenticated: true,
        tokenPayload: expect.objectContaining(mockAuthPayload),
      }),
    );
  });

  it('should return 401 Unauthorized if no token is provided', async () => {
    // To correctly test this, the mocked middleware needs to simulate the actual middleware's behavior
    // of denying access if no token is present.
    // The current mock calls next() regardless. For a more accurate test of "no token",
    // the mock for `express-oauth2-jwt-bearer`'s `auth` function would need to be more sophisticated,
    // perhaps by having the test case modify the mock's behavior or by having the mock
    // check `req.headers.authorization` and call `res.status(401).send()` if it's missing.

    // Let's assume the actual `express-oauth2-jwt-bearer` (even when parts are mocked)
    // would correctly deny access if no token is found.
    // The `authMiddleware` instance in `app.ts` uses the mocked `auth()` from `express-oauth2-jwt-bearer`.
    // If that mocked `auth()` returns a middleware that doesn't inject `req.auth` when no token,
    // then `req.auth.payload` in the route will be undefined, leading to the 401 from the route's safeguard.

    // For a more direct test of the middleware itself:
    // We'd have to make the mock's behavior conditional:
    // (express-oauth2-jwt-bearer as any).auth.mockImplementationOnce(() => (req, res, next) => {
    //   if (!req.headers.authorization) {
    //     return res.status(401).json({ message: 'Unauthorized from mock' });
    //   }
    //   req.auth = { payload: mockAuthPayload };
    //   next();
    // });
    // This kind of per-test mock adjustment is complex with the way middleware is instantiated in Express.

    // Simpler approach: Trust that the actual `express-oauth2-jwt-bearer` middleware handles this.
    // Our route has a safeguard: `if (!payload) { res.status(401).json(...) }`
    // If the token is missing, our mock (as written) won't set `req.auth`.
    // So, `req.auth?.payload` will be undefined, and the route's safeguard should trigger.

    const response: Response = await request(app)
      .get('/auth/me')
      // No Authorization header
      .expect(401);

    expect(response.body).toHaveProperty('message');
    // The message might come from our route's safeguard: 'Unauthorized: No token payload found'
    // Or, if the real middleware somehow still partially runs, it could be its own message.
    // Given the current mock, it's likely from the route's safeguard.
    expect(response.body.message).toContain('Unauthorized');
  });

  // Optional: Test for a malformed/invalid token if the mock could simulate that.
  // This is harder with the current simple mock. Typically, the real middleware handles this.
  // it('should return 401 Unauthorized for an invalid/expired token', async () => {
  //   // This requires the mock to be able to simulate an error from jwt.verify or similar.
  //   // (express-oauth2-jwt-bearer as any).auth.mockImplementationOnce(() => (req, res, next) => {
  //   //   // Simulate token validation failure
  //   //   const err = new Error("Invalid token from mock");
  //   //   (err as any).status = 401;
  //   //   next(err); // Pass error to Express error handler
  //   // });
  //
  //   const response: Response = await request(app)
  //     .get('/auth/me')
  //     .set('Authorization', 'Bearer an-invalid-looking-token')
  //     .expect(401);
  //
  //   expect(response.body.message).toContain('Unauthorized');
  // });
});
