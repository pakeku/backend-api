import { Request, Response, Router } from 'express';

const router: Router = Router();

router.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Route not found',
        method: req.method,
        endpoint: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
});

export default router;