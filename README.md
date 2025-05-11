# Node.js and Express Backend

## Requirements
Identify your MongoDB URL. Visit MongoDB to sign up and get started.

Environmental Variables:
1. MONGO_URL
2. PORT (optional)

## Getting Started

Scripts:
```json 
"scripts": {
    "start": "node ./src/index.js",
    "dev": "env-cmd nodemon ./src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "zip-for-aws": "node make-zip-for-aws.js"
  },
```