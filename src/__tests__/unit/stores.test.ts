// tests/database/stores.test.ts
import { ObjectId } from 'mongodb';

import { getDatabase } from '../../database/mongo-common';
import { deleteStore, updateStore } from '../../database/stores';

jest.mock('../../database/mongo-common');

const mockCollection = {
  deleteOne: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
};

(getDatabase as jest.Mock).mockResolvedValue({
  collection: () => mockCollection,
});

describe('stores.ts unit tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "No store found with that id" if delete count is 0', async () => {
    mockCollection.deleteOne.mockResolvedValueOnce({ deletedCount: 0 });
    const response = await deleteStore(new ObjectId().toHexString());
    expect(response).toEqual({ message: 'No store found with that id' });
  });

  it('should return null if store not found after update', async () => {
    mockCollection.updateOne.mockResolvedValueOnce({});
    mockCollection.findOne.mockResolvedValueOnce(null);

    const result = await updateStore(new ObjectId().toHexString(), { name: 'Updated' });
    expect(result).toBeNull();
  });
});
