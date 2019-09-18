import 'dotenv/config';
import request from 'supertest';
import * as apiMock from '../util/ApiMock';
import app from '../../src/app';

describe('User endpoint', () => {
  const user = process.env.TEST_DEFAULT_USER || 'fulano';

  it('should return a user details from github', async () => {
    apiMock.getUser(user);

    const response = await request(app).get(`/api/users/${user}/details`);

    expect(response.body).toHaveProperty('login');
    expect(response.body.login).toBe(user);
  });

  it('should return error when some problem happen', async () => {
    apiMock.getError(`users/${user}`, 500);

    const response = await request(app).get(`/api/users/${user}/details`);
    expect(response.status).toBe(500);
  });
});
