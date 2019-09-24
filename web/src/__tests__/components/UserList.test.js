import React from 'react';
import {
  render,
  waitForElement,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '~/services/api';
import UserList from '~/components/UserList';

let apiMock = new MockAdapter(api, { delayResponse: 100 });

describe('UserList component', () => {
  beforeEach(() => {
    apiMock = new MockAdapter(api, { delayResponse: 100 });
    apiMock
      .onGet('api/users')
      .replyOnce(
        200,
        [{ login: 'railsjitsu', id: 32 }, { login: 'nitay', id: 34 }],
        {
          'relative-link-url': '/api/users?since=85',
        }
      );
    cleanup();
  });

  it('should have a ul element and a next button', async () => {
    const { findByTestId, container } = render(<UserList />);
    await waitForElement(() => container.querySelector('li'));
    const { tagName } = await findByTestId('btn-next');
    const list = await container.querySelector('ul');

    expect(tagName && tagName.toLocaleLowerCase()).toBe('button');
    expect(!!list).toBe(true);
  });

  it('should be able to list users', async () => {
    const { container } = render(<UserList />);
    await waitForElement(() => container.querySelector('li'));
    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(2);
  });

  it('should be able to list more users', async () => {
    const { container, findByTestId, findByText } = render(<UserList />);
    const button = await findByTestId('btn-next');
    await waitForElement(() => container.querySelector('li'));

    apiMock
      .onGet('/api/users?since=85')
      .reply(200, [{ login: 'loren', id: 85 }, { login: 'ipsum', id: 88 }], {
        'relative-link-url': '/api/users?since=90',
      });

    fireEvent.click(button, { button: 0 });
    await waitForElement(() => {
      // debugger;
      return findByText('85 - loren');
    });

    const lis = container.querySelectorAll('li');
    expect(lis.length).toBe(4);
  });
});
