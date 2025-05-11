
const router = require('express').Router();
const {deleteStore, updateStore, createStore, getStores} = require('../database/stores');

router.get('/', async (req, res) => {
  res.send(await getStores());
});

router.post('/', async (apiRequest, apiResponse) => {
  const newStore = apiRequest.body;
  await createStore(newStore);
  apiResponse.send({
    message: 'New Store created.',
    allStores: await getStores(),
  });
});

router.delete('/:_id', async (apiRequest, apiResponse) => {
  await deleteStore(apiRequest.params._id);
  apiResponse.send({ message: 'Store deleted.' });
});

// endpoint to update a Store
router.put('/:_id', async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;
  console.log({ updateStore })
  await updateStore(apiRequest.params._id, updatedStore);
  apiResponse.send({ message: 'Store updated.' });
});

module.exports = router;