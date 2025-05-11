const helmet = require('helmet');

const configureHelmet = () =>
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    referrerPolicy: { policy: 'no-referrer' },
    expectCt: false,
    frameguard: false,
    hidePoweredBy: true,
    hsts: {
      maxAge: 63072000, // 2 years
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    // xssFilter: true, // Removed in modern Helmet versions
  });

module.exports = configureHelmet();
