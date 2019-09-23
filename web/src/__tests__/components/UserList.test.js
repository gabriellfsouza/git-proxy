import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import UserList from '~/components/UserList';

let apiMock = new MockAdapter(api);

describe('UserList component', () => {
  beforeAll(() => {
    apiMock = new MockAdapter(api, { delayResponse: 100 });
  });

  it('should be able to list users', async () => {
    apiMock
      .onGet('api/users')
      .replyOnce(200, [
        { login: 'railsjitsu', id: 32 },
        { login: 'nitay', id: 34 },
      ]);

    const { container, debug } = render(<UserList />);
    await waitForElement(() => container.querySelector('li'));
    const lis = container.querySelectorAll('li');
    debug();
    expect(lis.length).toBe(2);
  });
});
