import helmet from 'helmet';
import { RequestHandler } from 'express'; 

const configureHelmet = (): RequestHandler => // Explicitly type as RequestHandler
  helmet({
    contentSecurityPolicy: false,
    referrerPolicy: { policy: 'no-referrer' },
    expectCt: false,
    hidePoweredBy: true,
    hsts: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true, 
    },
    noSniff: true,
  });

export default configureHelmet();