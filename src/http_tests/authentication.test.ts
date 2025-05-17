import 'dotenv/config';
import request from 'supertest';
import app from '../app'; // Adjust the path as necessary
import { stopDatabase } from '../database/mongo-common';

describe('Authentication JWT', () => {
    afterAll(async () => {
        await stopDatabase(); // Ensure database connection is closed
    });

    const testUser = {
        email: 'testuser@example.com',
        password: 'SecurePass123!',
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send(testUser)
            .expect(201);

        expect(res.body).toHaveProperty('message');
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send(testUser)
            .expect(200);

        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
    });

    it('should return user profile with valid token', async () => {
        const loginRes = await request(app)
            .post('/auth/login')
            .send(testUser)
            .expect(200);

        const token = loginRes.body.token;

        const res = await request(app)
            .get('/auth/me')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        expect(res.body).toHaveProperty('email', testUser.email);
    })
});
