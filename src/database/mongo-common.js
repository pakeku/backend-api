/**
  All configuration that is required for a shared mongo server hosted in the cloud
 */
const { MongoClient } = require('mongodb');

let database = null;
const mongoDBURL = process.env.MONGO_URL;

async function startDatabase() {
  const client = new MongoClient(mongoDBURL);
  const connection = await client.connect();
  database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
