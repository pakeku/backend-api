
const router = require('express').Router();
const { deleteStore, updateStore, createStore, getStores } = require('../database/stores');

router.get('/', async (req, res) => {
  res.json(await getStores());
});

router.post('/', async (apiRequest, apiResponse) => {
  const newStore = apiRequest.body;

  apiResponse.status(201).json(await createStore(newStore));
});

router.delete('/:_id', async (apiRequest, apiResponse) => {
  apiResponse.json(await deleteStore(apiRequest.params._id));
});

// endpoint to update a Store
router.put('/:_id', async (apiRequest, apiResponse) => {
  const updatedStore = apiRequest.body;

  apiResponse.json(
    await updateStore(apiRequest.params._id, updatedStore));
});

module.exports = router;