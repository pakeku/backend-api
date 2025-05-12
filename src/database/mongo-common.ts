/**
 * Shared MongoDB configuration for cloud-hosted MongoDB instance.
 * Documentation: https://mongodb.github.io/node-mongodb-native/6.16/classes/MongoClient.html
 */

import { MongoClient, Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoDBURL = process.env.MONGO_URL;

if (!mongoDBURL && process.env.NODE_ENV !== 'test') {
  throw new Error('MONGO_URL environment variable is not set');
}

let client: MongoClient | null = null;
let database: Db | null = null;
let mongoServer: MongoMemoryServer | null = null; // store reference to in-memory server for shutdown

const getRightMongoDBURL = async (): Promise<string> => {
  const env = process.env.NODE_ENV;

  if (env === 'test') {
    mongoServer = await MongoMemoryServer.create();
    return mongoServer.getUri();
  }

  if (['development', 'production'].includes(env || '')) {
    return mongoDBURL as string;
  }

  throw new Error(`Unsupported NODE_ENV: ${env}`);
};

export async function startDatabase(uri: string | null = null): Promise<Db> {
  if (client && database) {
    return database;
  }

  const dbURI = uri || await getRightMongoDBURL();

  client = new MongoClient(dbURI);
  await client.connect();
  database = client.db();
  return database;
}


export async function getDatabase(): Promise<Db> {
  return database || await startDatabase();
}

export async function stopDatabase(): Promise<void> {
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
