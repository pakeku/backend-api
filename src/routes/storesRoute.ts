import { Request, Response, Router } from 'express';

import { createStore, deleteStore, getStores, Store, updateStore } from '../database/stores';

const router: Router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const stores = await getStores();
  res.json(stores);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const newStore = req.body as Store;
  const createdStore = await createStore(newStore);
  res.status(201).json(createdStore);
});

router.delete('/:_id', async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.params;
  const result = await deleteStore(_id);
  res.json(result);
});

// Endpoint to update a Store
router.put('/:_id', async (req: Request, res: Response): Promise<void> => {
  const updatedStore = req.body as Store;
  const result = await updateStore(req.params._id, updatedStore);
  res.json(result);
});

export default router;
