const {getDatabase} = require('./mongo-common');
// https://docs.mongodb.com/manual/reference/method/ObjectId/
const {ObjectID, ObjectId} = require('mongodb');

const getUserName = require('git-user-name');

// a "collection" in mongo is a lot like a list which is a lot like an Array
const collectionName = 'stores';

async function createStore(store) {
  const database = await getDatabase();
  store.addedBy = getUserName()
  // for `insertOne` info, see https://docs.mongodb.com/manual/reference/method/js-collection/
  const {insertedId} = await database.collection(collectionName).insertOne(store);
  return insertedId;
}

async function getStores() {
  const database = await getDatabase();
  // `find` https://docs.mongodb.com/manual/reference/method/db.collection.find/#db.collection.find
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteStore(id) {
  const database = await getDatabase();
  // https://docs.mongodb.com/manual/reference/method/ObjectId/
  // for `deleteOne` info see  https://docs.mongodb.com/manual/reference/method/js-collection/
  await database.collection(collectionName).deleteOne({
    _id: id,
  });
}

async function updateStore(id, store) {
  const database = await getDatabase();

  // `delete` is new to you. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
  delete store._id;

  // https://docs.mongodb.com/manual/reference/method/db.collection.update/
  await database.collection(collectionName).update(
    { _id: id },
    {
      $set: {
        ...store,
      },
    },
  );
}

// export the functions that can be used by the main app code
module.exports = {
  createStore,
  getStores,
  deleteStore,
  updateStore,
};
