import request from 'supertest';
import ApiMock from '../util/ApiMock';
import app from '../../src/app';

describe('Users', () => {
  let apiMock = {};
  beforeAll(() => {
    apiMock = new ApiMock();
  });

  it('should return a list of users from github', async () => {
    apiMock.getUserList();

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(!!response.headers.link).toBeTruthy();
    expect(!!response.headers['relative-link-url']).toBeTruthy();

    const [user] = response.body;

    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('node_id');
    expect(user).toHaveProperty('url');
    expect(user).toHaveProperty('avatar_url');
  });

  it('should return users without a nextpage link (from github) ', async () => {
    apiMock.getUserListWithoutLinkHeader();

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(!!response.headers.link).not.toBeTruthy();
    expect(!!response.headers['relative-link-url']).not.toBeTruthy();

    const [user] = response.body;

    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('node_id');
    expect(user).toHaveProperty('url');
    expect(user).toHaveProperty('avatar_url');
  });

  it('should return users last page (from github)', async () => {
    apiMock.getUserListLastPage();

    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(!!response.headers.link).not.toBeTruthy();
    expect(!!response.headers['relative-link-url']).not.toBeTruthy();

    const [user] = response.body;

    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('node_id');
    expect(user).toHaveProperty('url');
    expect(user).toHaveProperty('avatar_url');
  });
});
