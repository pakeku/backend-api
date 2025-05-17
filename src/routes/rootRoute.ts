import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (_: Request, res: Response): void => {
  res.redirect('/health');
});

export default router;
