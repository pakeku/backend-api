import 'dotenv/config';
import request, { Response } from 'supertest';

import app from '../app';

interface ResponseBody {
  message?: string;
  status: string;
}

describe('Health Check Endpoint', () => {
  it('should return 302 and redirect to /health', async () => {
    const res: Response = await request(app).get('/');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/health');
  });

  it('should return 200 and status OK', async () => {
    const res: Response = await request(app).get('/health');
    const body = res.body as ResponseBody;
    expect(body.status).toBe('OK');
    expect(res.statusCode).toEqual(200);
  });

  it('should return 404 for non-existent endpoint', async () => {
    const res: Response = await request(app).get('/non-existent');
    const body = res.body as ResponseBody;
    expect(res.statusCode).toEqual(404);
    expect(body.message).toBe('Route not found');
  });
});
