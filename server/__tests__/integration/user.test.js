import request from 'supertest';

import app from '../../src/app';

describe('User endpoint', () => {
  it('should return a user details from github', async () => {
    const user = process.env.TEST_DEFAULT_USER;
    const response = await request(app).get(`/users/${user}`);

    expect(response.body).toHaveProperty('login');
    expect(response.body.login).toBe(user);
  });
});
