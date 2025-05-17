import { Request, Response, Router } from 'express';

const router: Router = Router();
/**
 * @swagger
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns service status, current timestamp, and uptime.
 *     responses:
 *       200:
 *         description: Service is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-05-17T12:34:56.789Z"
 *                 uptime:
 *                   type: number
 *                   description: Time in seconds since the server started
 *                   example: 123.456
 */
router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
