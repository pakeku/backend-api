/**
 * Shared MongoDB configuration for cloud-hosted MongoDB instance.
 * Documentation: https://mongodb.github.io/node-mongodb-native/6.16/classes/MongoClient.html
 */

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoDBURL = process.env.MONGO_URL;

if (!mongoDBURL && process.env.NODE_ENV !== 'test') {
  throw new Error('MONGO_URL environment variable is not set');
}

let client;
let database;
let mongoServer; // store reference to in-memory server for shutdown

const getRightMongoDBURL = async () => {
  const env = process.env.NODE_ENV;

  if (env === 'test') {
    mongoServer = await MongoMemoryServer.create();
    return mongoServer.getUri();
  }

  if (['development' ,'production'].includes(env)) {
    return mongoDBURL;
  }

  throw new Error(`Unsupported NODE_ENV: ${env}`);
};

async function startDatabase(uri = null) {
  if (client && client.topology?.isConnected?.()) {
    return database;
  }

  const dbURI = uri || await getRightMongoDBURL();

  client = new MongoClient(dbURI);
  await client.connect();
  database = client.db();
  return database;
}

async function getDatabase() {
  return database || startDatabase();
}

async function stopDatabase() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }

  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
}

module.exports = {
  getDatabase,
  startDatabase,
  stopDatabase,
};