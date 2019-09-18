import api from '../../src/app/services/api';
// eslint-disable-next-line import/order
import MockAdapter from 'axios-mock-adapter';

const apiMock = new MockAdapter(api);

/**
 * Mock an error call
 * @param {String} path
 * @param {Number} code
 */
export function getError(path, code) {
  apiMock.onGet(path).reply(code, {});
}

/**
 * Mock a success user call
 * @param {String} user
 */
export function getUser(user) {
  apiMock.onGet(`users/${user}`).reply(200, {
    login: user,
  });
}
/* id: 21299792,
    node_id: 'MDQ6VXNlcjIxMjk5Nzky',
    avatar_url: 'https://avatars0.githubusercontent.com/u/21299792?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/gabriellfsouza',
    html_url: 'https://github.com/gabriellfsouza',
    followers_url: 'https://api.github.com/users/gabriellfsouza/followers',
    following_url:
      'https://api.github.com/users/gabriellfsouza/following{/other_user}',
    gists_url: 'https://api.github.com/users/gabriellfsouza/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/gabriellfsouza/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/gabriellfsouza/subscriptions',
    organizations_url: 'https://api.github.com/users/gabriellfsouza/orgs',
    repos_url: 'https://api.github.com/users/gabriellfsouza/repos',
    events_url: 'https://api.github.com/users/gabriellfsouza/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/gabriellfsouza/received_events',
    type: 'User',
    site_admin: false,
    name: 'Gabriel Lima',
    company: null,
    blog: '',
    location: 'São Paulo, SP - Brazil',
    email: null,
    hireable: null,
    bio:
      'Instagram: gabriellfsouza\r\nLinkedIn: https://www.linkedin.com/in/gabriel-lima-f-de-souza/',
    public_repos: 35,
    public_gists: 0,
    followers: 26,
    following: 48,
    created_at: '2016-08-29T01:40:54Z',
    updated_at: '2019-08-30T18:43:02Z',
  });
} */
