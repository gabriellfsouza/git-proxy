import api from '~/services/api';

describe('api', () => {
  it('example', () => {
    expect(1 + 1).toBe(2);
  });

  it('test api', async () => {
    const response = await api.get('api/users');
    expect(Array.isArray(response.data)).toBe(true);
  });
});
