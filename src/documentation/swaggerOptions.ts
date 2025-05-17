import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import { name } from '../../package.json';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: name,
      version: '1.0.0',
      description: 'A sample API documentation',
    },
  },
  apis: ['./src/**/*.ts'], // recursive, includes subfolders like ./src/routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
