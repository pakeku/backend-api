import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
