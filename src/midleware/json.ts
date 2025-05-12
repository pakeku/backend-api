import { json } from 'express';

// Custom JSON middleware configuration
const configuredJson = json({
  limit: '1mb',
  strict: false,
  type: ['application/json', 'application/vnd.api+json'],
  reviver: (key: string, value: any): any => {
    if (key === 'date' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  },
});

export default configuredJson;