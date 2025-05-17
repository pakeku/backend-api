import { getDatabase } from './mongo-common';
import { ObjectId } from 'mongodb';
import getUserName from '../utils/git-user-name';

// Define the Store interface
interface Store {
  _id?: string;
  name: string;
  addedBy?: string;
  metadata?: string;
}

const collectionName = 'stores';

// Create a Store
async function createStore(store: Store): Promise<Store | null> {
  const database = await getDatabase();
  store.addedBy = getUserName();
  
  const storeToInsert = { ...store, _id: store._id ? new ObjectId(store._id) : undefined };
  const { insertedId } = await database.collection(collectionName).insertOne(storeToInsert);

  // Return the store document with the inserted _id
  return await database.collection(collectionName).findOne({ _id: insertedId }) as Store | null;
}

// Get all stores
async function getStores(): Promise<Store[]> {
  const database = await getDatabase();
  const stores = await database.collection(collectionName).find({}).toArray();
  return stores.map(store => ({
    _id: store._id?.toString(),
    name: store.name,
    addedBy: store.addedBy,
  })) as Store[];
}

// Delete a store by id
async function deleteStore(_id: string): Promise<{ message: string }> {
  const database = await getDatabase();
  
  const result = await database.collection(collectionName).deleteOne({
    _id: new ObjectId(_id),
  });

  if (result.deletedCount === 0) {
    return { message: "No store found with that id" };
  }

  return { message: "Store deleted" };
}

// Update a store
async function updateStore(id: string, store: Partial<Store>): Promise<Store | null> {
  const database = await getDatabase();
  delete store._id;

  await database.collection(collectionName).updateOne(
    { _id: new ObjectId(id) },
    { $set: store }
  );

  const updated = await database.collection(collectionName).findOne({ _id: new ObjectId(id) });
  if (!updated) return null;
  return {
    _id: updated._id?.toString(),
    name: updated.name,
    addedBy: updated.addedBy,
    metadata: updated.metadata,
  } as Store;
}


export { createStore, getStores, deleteStore, updateStore };