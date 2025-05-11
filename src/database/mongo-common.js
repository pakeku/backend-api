/**
 * Shared MongoDB configuration for cloud-hosted MongoDB instance.
 * Documentation: https://mongodb.github.io/node-mongodb-native/6.16/classes/MongoClient.html
 */

const { MongoClient } = require('mongodb');

const mongoDBURL = process.env.MONGO_URL;

if (!mongoDBURL) {
  throw new Error('MONGO_URL environment variable is not set');
}

let client;
let database;

async function startDatabase() {
  if (client && client.topology?.isConnected?.()) {
    return database; // already connected
  }

  client = new MongoClient(mongoDBURL);

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
}

module.exports = {
  getDatabase,
  startDatabase,
  stopDatabase,
};