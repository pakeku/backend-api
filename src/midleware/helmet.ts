import { RequestHandler } from 'express';
import helmet from 'helmet';

const configureHelmet = (): RequestHandler => // Explicitly type as RequestHandler
  helmet({
    contentSecurityPolicy: false,
    expectCt: false,
    hidePoweredBy: true,
    hsts: {
      includeSubDomains: true,
      maxAge: 63072000, // 2 years
      preload: true,
    },
    noSniff: true,
    referrerPolicy: { policy: 'no-referrer' },
  });

export default configureHelmet();
