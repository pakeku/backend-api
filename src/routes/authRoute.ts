import { Request, Response, Router } from 'express';

// Import the new authentication middleware
import authMiddleware from '../midleware/authMiddleware';

const router: Router = Router();

// Extends the Express Request type to include the `auth` property
interface AuthenticatedRequest extends Request {
  auth?: {
    payload: {
      sub?: string; // Standard subject claim (user ID)
      email?: string; // Email claim (if available)
      name?: string; // Name claim (often used for email if configured in Auth0)
      // It's common for custom claims to be namespaced, e.g.:
      [key: string]: any; // Allow other custom claims
    };
  };
}

// Get current authenticated user info
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user info
 *     description: Retrieves information about the currently authenticated user from their JWT payload.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: [] # Indicates that this endpoint uses Bearer token authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The user's unique identifier (subject claim).
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email address (if available in the token).
 *                 name:
 *                   type: string
 *                   description: The user's name (if available in the token, might be email).
 *                 isAuthenticated:
 *                   type: boolean
 *                   description: True if the user is authenticated.
 *                 tokenPayload:
 *                   type: object
 *                   description: The full decoded JWT payload.
 *       401:
 *         description: Unauthorized. The token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error.
 */
router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // The authMiddleware (express-oauth2-jwt-bearer) has already validated the token
    // and attached the payload to req.auth.payload
    const payload = req.auth?.payload;

    if (!payload) {
      // This case should ideally be handled by the authMiddleware itself,
      // but as a safeguard:
      res.status(401).json({ message: 'Unauthorized: No token payload found' });
      return;
    }

    // Attempt to get email from common claims, fallback to sub
    // Auth0 might put email in a custom claim like 'https://example.com/email'
    // For this example, we'll check common direct claims.
    const email = payload.email || payload.name || (payload.sub ? `User ID: ${payload.sub}` : 'Email not available');
    const userId = payload.sub || 'User ID not available';
    const name = payload.name || 'Name not available';


    // Respond with user information extracted from the token
    res.status(200).json({
      userId,
      email,
      name,
      isAuthenticated: true, // If middleware passed, user is authenticated
      tokenPayload: payload, // Send the whole payload for debugging/client-side use if needed
    });
  } catch (error) {
    console.error('Error fetching user data from token:', error);
    // Check if the error is an UnauthorizedError from express-oauth2-jwt-bearer
    // This is often handled by the library's default error handler, but you can customize it.
    // For instance, if the error has a status property:
    if ((error as any).status === 401) {
      res.status(401).json({ message: (error as Error).message || 'Unauthorized' });
    } else {
      res.status(500).json({ message: 'Internal server error while processing user information' });
    }
  }
});

export default router;
