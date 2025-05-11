const { json } = require('express');

const configuredJson = json({
  limit: '1mb',
  strict: false,
  type: ['application/json', 'application/vnd.api+json'],
  reviver: (key, value) => {
    if (key === 'date' && typeof value === 'string') {
      return new Date(value);
    }
    return value;
  },
});

module.exports = configuredJson; 