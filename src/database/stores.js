const { getDatabase } = require('./mongo-common');
const { ObjectId } = require('mongodb');
const getUserName = require('../utils/git-user-name');

const collectionName = 'stores';

async function createStore(store) {
  const database = await getDatabase();
  store.addedBy = getUserName();
  
  const { insertedId } = await database.collection(collectionName).insertOne(store);
  
  return await database.collection(collectionName).findOne({
    _id: insertedId,
  });
}

async function getStores() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteStore(_id) {
  const database = await getDatabase();
  
  const result = await database.collection(collectionName).deleteOne({
    _id: ObjectId.createFromHexString(_id), // Simplified ObjectId creation
  });

  if (result.deletedCount === 0) {
    return { message: "No store found with that id" }; // Return an object with a message
  }

  return { message: "Store deleted" }; // Return an object with a message
}

async function updateStore(id, store) {
  const database = await getDatabase();
  delete store._id;

  await database.collection(collectionName).updateOne(
    { _id: ObjectId.createFromHexString(id) }, // Simplified ObjectId creation
    {
      $set: {
        ...store,
      },
    },
  );

  // Return the updated store
  const updatedStore = await database.collection(collectionName).findOne({ _id: ObjectId.createFromHexString(id) });
  return updatedStore;
}

module.exports = {
  createStore,
  getStores,
  deleteStore,
  updateStore,
};
