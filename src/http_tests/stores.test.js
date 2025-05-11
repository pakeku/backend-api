require('dotenv').config();

const request = require('supertest');
const app = require('../app');
const { stopDatabase } = require('../database/mongo-common');

describe('Store "Collections" Endpoint', () => {

    afterAll(async () => {
        await stopDatabase(); // Ensure database connection is closed
    });

    // Test POST /stores to create a new store
    it('should create a new store', async () => {
        const storeData = {
            store_profile: 'Nevada Golf Emprium',
            shipping_address: '99 Nowhere Drive, Nevada',
        };

        const res = await request(app)
            .post('/stores')
            .send(storeData)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toEqual(201);  // Expecting 201 Created
        expect(res.body.store_profile).toBe(storeData.store_profile);
        expect(res.body.shipping_address).toBe(storeData.shipping_address);
    });

    // Test GET /stores to fetch all stores
    it('should return a list of stores', async () => {
        const res = await request(app).get('/stores');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);  // Expecting an array of stores
        // should contain at least one store
        expect(res.body.length).toBeGreaterThan(0);
    });



    // Test PUT /stores/:id to update an existing store
    it('should update an existing store', async () => {
        const stores = await request(app).get('/stores');
        const storeId = stores.body[0]._id;
        const updatedData = {
            metadata: '68203238d1857e2fae0b6093',
        };

        const res = await request(app)
            .put(`/stores/${storeId}`)
            .send(updatedData)
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toEqual(200);
        expect(res.body.metadata).toBe(updatedData.metadata);
    });

    // Test DELETE /stores/:id to delete a store
    it('should delete a store', async () => {
        const stores = await request(app).get('/stores');
        const storeId = stores.body[0]._id;  // Get the ID of the first store
        expect(stores.body.length).toBeGreaterThan(0);

        const res = await request(app).delete(`/stores/${storeId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Store deleted'); // Ensure that the response contains the message
    });

});
