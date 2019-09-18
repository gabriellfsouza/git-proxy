import request from 'supertest';
import * as apiMock from '../util/ApiMock';
import app from '../../src/app';

describe('User endpoint', () => {
  const user = process.env.TEST_DEFAULT_USER || 'fulano';

  it('should return a user details from github', async () => {
    const response = await request(app).get(`/users/${user}`);
    apiMock.getUser(user);

    expect(response.body).toHaveProperty('login');
    expect(response.body.login).toBe(user);
  });

  it('should return error when some problem happen', async () => {
    const response = await request(app).get(`/users/${user}`);
    apiMock.getError(`users/${user}`, 500);
    expect(response.status).toBe(500);
  });
});
