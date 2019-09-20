import api from '../../src/app/services/api';
// eslint-disable-next-line import/order
import MockAdapter from 'axios-mock-adapter';

class ApiMock extends MockAdapter {
  constructor() {
    const delayResponse = process.env.MOCK_DELAY || 0;
    super(api, { delayResponse });
  }

  /**
   * Mocks a get on git user repository list api with pagination (first page).
   * Expect that page number must be 1 or undefined.
   * @param {String} user
   * @param {Number} page
   */
  getUserReposPage1(user) {
    const link = `<https://api.github.com/user/21299792/repos?type=all&visibility=all&sort=created&direction=asc&page=2>; rel="next", <https://api.github.com/user/21299792/repos?type=all&visibility=all&sort=created&direction=asc&page=2>; rel="last"`;
    this.onGet(
      `users/${user}/repos?type=all&visibility=all&sort=created&direction=asc`
    ).replyOnce(
      200,
      [
        {
          id: 203316481,
          node_id: 'MDEwOlJlcG9zaXRvcnkyMDMzMTY0ODE=',
          name: 'meet-app-mobile',
          full_name: `${user}/meet-app-mobile`,
          private: false,
          owner: {
            login: user,
          },
        },
      ],
      {
        link,
      }
    );
  }

  /**
   * Mocks a get on git user repository list api with pagination (second and last page).
   * @param {String} user
   */
  getUserReposPage2(user) {
    const link = `<https://api.github.com/user/21299792/repos?type=all&visibility=all&sort=created&direction=asc&page=1>; rel="prev", <https://api.github.com/user/21299792/repos?type=all&visibility=all&sort=created&direction=asc&page=1>; rel="first"`;
    this.onGet(
      `users/${user}/repos?type=all&visibility=all&sort=created&direction=asc&page=2`
    ).replyOnce(
      200,
      [
        {
          id: 202084139,
          node_id: 'MDEwOlJlcG9zaXRvcnkyMDIwODQxMzk=',
          name: 'meet-app-front',
          full_name: `${user}/meet-app-front`,
          private: false,
          owner: {
            login: user,
          },
        },
      ],
      {
        link,
      }
    );
  }

  /**
   * Mocks a get on git user repository list api without pagination.
   * @param {String} user
   */
  getUserRepos(user) {
    this.onGet(
      `users/${user}/repos?type=all&visibility=all&sort=created&direction=asc`
    ).replyOnce(200, [
      {
        id: 202084139,
        node_id: 'MDEwOlJlcG9zaXRvcnkyMDIwODQxMzk=',
        name: 'meet-app-front',
        full_name: `${user}/meet-app-front`,
        private: false,
        owner: {
          login: user,
          id: 21299792,
          node_id: 'MDQ6VXNlcjIxMjk5Nzky',
          avatar_url: 'https://avatars0.githubusercontent.com/u/21299792?v=4',
          gravatar_id: '',
          events_url: `https://api.github.com/users/${user}/events{/privacy}`,
          received_events_url: `https://api.github.com/users/${user}/received_events`,
          type: 'User',
          site_admin: false,
        },
        html_url: `https://github.com/${user}/meet-app-front`,
        description:
          'Desafio do bootcamp goStack da RocketSeat - Front-end web',
        fork: false,
        url: `https://api.github.com/repos/${user}/meet-app-front`,
        open_issues_count: 0,
        license: null,
        forks: 0,
        open_issues: 0,
        watchers: 0,
        default_branch: 'development',
      },
    ]);
  }

  /**
   * Mocks an error call
   * @param {String} path
   * @param {Number} code
   */
  getError(path, code) {
    this.onGet(path).replyOnce(code, {});
  }

  /**
   * Mocks a success user call
   * @param {String} user
   */
  getUser(user) {
    this.onGet(`users/${user}`).replyOnce(200, {
      login: user,
    });
  }

  /**
   * Mocks a simple user list quest
   */
  getUserList() {
    this.onGet('/users').replyOnce(
      200,
      [
        {
          login: 'railsjitsu',
          id: 32,
          node_id: 'MDQ6VXNlcjMy',
          avatar_url: 'https://avatars2.githubusercontent.com/u/32?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/railsjitsu',
        },
        {
          login: 'nitay',
          id: 34,
          node_id: 'MDQ6VXNlcjM0',
          avatar_url: 'https://avatars2.githubusercontent.com/u/34?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/nitay',
        },
      ],
      {
        link:
          '<https://api.github.com/users?since=5&per_page=2>; rel="next", <https://api.github.com/users{?since}>; rel="first"',
      }
    );
  }

  /**
   * Mocks a last page return from github
   */
  getUserListLastPage() {
    this.onGet('/users').replyOnce(
      200,
      [
        {
          login: 'railsjitsu',
          id: 32,
          node_id: 'MDQ6VXNlcjMy',
          avatar_url: 'https://avatars2.githubusercontent.com/u/32?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/railsjitsu',
        },
        {
          login: 'nitay',
          id: 34,
          node_id: 'MDQ6VXNlcjM0',
          avatar_url: 'https://avatars2.githubusercontent.com/u/34?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/nitay',
        },
      ],
      {
        link:
          '<https://api.github.com/users?since=5&per_page=2>; rel="last", <https://api.github.com/users{?since}>; rel="first"',
      }
    );
  }

  /**
   * Mocks a request without a header from github
   */
  getUserListWithoutLinkHeader() {
    this.onGet('/users').replyOnce(200, [
      {
        login: 'railsjitsu',
        id: 32,
        node_id: 'MDQ6VXNlcjMy',
        avatar_url: 'https://avatars2.githubusercontent.com/u/32?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/railsjitsu',
      },
      {
        login: 'nitay',
        id: 34,
        node_id: 'MDQ6VXNlcjM0',
        avatar_url: 'https://avatars2.githubusercontent.com/u/34?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/nitay',
      },
    ]);
  }
}

export default ApiMock;
