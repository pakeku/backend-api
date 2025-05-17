import { ObjectId } from 'mongodb';

import getUserName from '../utils/git-user-name';
import { getDatabase } from './mongo-common';

// Define the Store interface
export interface Store {
  _id?: ObjectId;
  addedBy?: string;
  metadata?: string;
  name: string;
}

const collectionName = 'stores';

// Create a Store
async function createStore(store: Store): Promise<null | Store> {
  const database = await getDatabase();
  store.addedBy = getUserName();

  const storeToInsert = { ...store, _id: store._id ? new ObjectId(store._id) : undefined };
  const { insertedId } = await database.collection(collectionName).insertOne(storeToInsert);

  // Return the store document with the inserted _id
  return (await database.collection(collectionName).findOne({ _id: insertedId })) as null | Store;
}

// Delete a store by id
async function deleteStore(_id: string): Promise<{ message: string }> {
  const database = await getDatabase();

  const result = await database.collection(collectionName).deleteOne({
    _id: new ObjectId(_id),
  });

  if (result.deletedCount === 0) {
    return { message: 'No store found with that id' };
  }

  return { message: 'Store deleted' };
}

// Get all stores
async function getStores(): Promise<Store[]> {
  const database = await getDatabase();
  const stores = await database.collection<Store>(collectionName).find({}).toArray();
  return stores.map(store => ({
    _id: new ObjectId(store._id),
    addedBy: store.addedBy,
    name: store.name,
  }));
}

// Update a store
async function updateStore(id: string, store: Partial<Store>): Promise<null | Store> {
  const database = await getDatabase();
  delete store._id;

  await database.collection(collectionName).updateOne({ _id: new ObjectId(id) }, { $set: store });

  const updated = await database
    .collection<Store>(collectionName)
    .findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return {
    _id: new ObjectId(updated._id),
    addedBy: updated.addedBy,
    metadata: updated.metadata,
    name: updated.name,
  };
}

export { createStore, deleteStore, getStores, updateStore };
