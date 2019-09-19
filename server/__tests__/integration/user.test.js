import 'dotenv/config';
import request from 'supertest';
import ApiMock from '../util/ApiMock';
import app from '../../src/app';

describe('User endpoint', () => {
  let apiMock;

  beforeAll(() => {
    apiMock = new ApiMock();
  });

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

  it('shuold return a list of repositories from a user', async () => {
    apiMock.getUserRepos(user);

    const response = await request(app).get(`/api/users/${user}/repos`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const [repo] = response.body;
    expect(repo).toHaveProperty('id');
    expect(repo).toHaveProperty('name');
    expect(repo).toHaveProperty('owner');
  });

  it('shuold return all user repo list', async () => {
    apiMock.getUserReposPage1(user);

    apiMock.getUserReposPage2(user);

    const response = await request(app).get(`/api/users/${user}/repos`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);

    const [repo] = response.body;
    expect(repo).toHaveProperty('id');
    expect(repo).toHaveProperty('name');
    expect(repo).toHaveProperty('owner');
  });
});
