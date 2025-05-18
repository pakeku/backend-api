import swaggerJsdoc, { Options } from 'swagger-jsdoc';

import { description, name, version } from '../../package.json';

const options: Options = {
  apis: ['./src/**/*.ts'],
  definition: {
    components: {
      securitySchemes: {
        bearerAuth: {
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
        },
      },
    },
    info: {
      description,
      title: name,
      version,
    },
    openapi: '3.0.0',
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
