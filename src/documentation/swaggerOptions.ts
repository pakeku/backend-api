import swaggerJsdoc, { Options } from 'swagger-jsdoc';

import { name } from '../../package.json';

const options: Options = {
  apis: ['./src/**/*.ts'], // recursive, includes subfolders like ./src/routes
  definition: {
    info: {
      description: 'A sample API documentation',
      title: name,
      version: '1.0.0',
    },
    openapi: '3.0.0',
  },
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
