const request = require('supertest');
const app = require('../app');

describe('Health Check Endpoint', () => {

    it('should return 302 and redirect to /health', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toBe('/health');
    })

    it('should return 200 and status OK', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('OK');
    });

    it('should return 404 for non-existent endpoint', async () => {
        const res = await request(app).get('/non-existent');
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Route not found');
    });


});
