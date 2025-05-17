import { json } from 'express';

// Custom JSON middleware configuration
const configuredJson = json({
  limit: '1mb',
  reviver: (key: string, value: unknown): unknown => {
    if (key === 'date' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  },
  strict: false,
  type: ['application/json', 'application/vnd.api+json'],
});

export default configuredJson;
