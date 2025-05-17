import 'dotenv/config';
import request, { Response } from 'supertest';

import app from '../../app';
import { stopDatabase } from '../../database/mongo-common';

// Define expected response shapes
interface AuthResponse {
  message?: string;
  token: string;
}

describe('Authentication JWT', () => {
  afterAll(async () => {
    await stopDatabase(); // Ensure database connection is closed
  });

  const testUser = {
    email: 'testuser@example.com',
    password: 'SecurePass123!',
  };

  it('should register a new user', async () => {
    const res: Response = await request(app).post('/auth/register').send(testUser).expect(201);
    const body = res.body as AuthResponse;
    expect(body).toHaveProperty('message');
  });

  it('should login with valid credentials', async () => {
    const res: Response = await request(app).post('/auth/login').send(testUser).expect(200);
    const body = res.body as AuthResponse;
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });

  it('should return user profile with valid token', async () => {
    const loginRes: Response = await request(app).post('/auth/login').send(testUser).expect(200);
    const body = loginRes.body as AuthResponse;

    const res: Response = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${body.token}`)
      .expect(200);

    const userBody = res.body as { email: string };
    expect(res.statusCode).toEqual(200);
    expect(userBody).toHaveProperty('email', testUser.email);
  });

  it('should reject request with invalid token', async () => {
    const invalidToken = 'this.is.an.invalid.token';

    const res: Response = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);

    const body = res.body as AuthResponse;
    expect(body).toHaveProperty('message');
    expect(typeof body.message).toBe('string');
  });
});
