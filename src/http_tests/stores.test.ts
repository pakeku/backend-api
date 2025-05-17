import 'dotenv/config';
import request, { Response } from 'supertest';

import app from '../app'; // Adjust the path as necessary
import { stopDatabase } from '../database/mongo-common';

interface Store {
  _id?: string; // Optionally include the ID in responses
  metadata?: string;
  shipping_address: string;
  store_profile: string;
}

describe('Store "Collections" Endpoint', () => {
  afterAll(async () => {
    await stopDatabase(); // Ensure database connection is closed
  });

  // Test POST /stores to create a new store
  it('should create a new store', async () => {
    const storeData: Store = {
      shipping_address: '99 Nowhere Drive, Nevada',
      store_profile: 'Nevada Golf Emprium',
    };

    const res: Response = await request(app)
      .post('/stores')
      .send(storeData)
      .set('Content-Type', 'application/json');

    const body = res.body as Store;
    expect(res.statusCode).toEqual(201); // Expecting 201 Created
    expect(body.store_profile).toBe(storeData.store_profile);
    expect(body.shipping_address).toBe(storeData.shipping_address);
  });

  // Test GET /stores to fetch all stores
  it('should return a list of stores', async () => {
    const res: Response = await request(app).get('/stores');
    const body = res.body as Store[];
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true); // Expecting an array of stores
    expect(body.length).toBeGreaterThan(0); // Should contain at least one store
  });

  // Test PUT /stores/:id to update an existing store
  it('should update an existing store', async () => {
    const stores: Response = await request(app).get('/stores');
    const storesBody = stores.body as Store[];
    const storeId = storesBody[0]._id;
    const updatedData: Partial<Store> = {
      metadata: '68203238d1857e2fae0b6093',
    };

    if (storeId) {
      const res: Response = await request(app)
        .put(`/stores/${storeId}`)
        .send(updatedData)
        .set('Content-Type', 'application/json');

      const body = res.body as Store;
      expect(res.statusCode).toEqual(200);
      expect(body.metadata).toBe(updatedData.metadata);
    }
  });

  // Test DELETE /stores/:id to delete a store
  it('should delete a store', async () => {
    const stores: Response = await request(app).get('/stores');
    const storesBody = stores.body as Store[];
    const storeId = storesBody[0]._id; // Get the ID of the first store

    if (storeId) {
      const res: Response = await request(app).delete(`/stores/${storeId}`);
      const body = res.body as { message: string };
      expect(res.statusCode).toEqual(200);
      expect(body.message).toBe('Store deleted'); // Ensure that the response contains the message
    }
  });
});
