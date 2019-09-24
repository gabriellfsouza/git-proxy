import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroller';
// import { produce } from 'immer';

import { List } from './styles';
import Container from '~/components/Container';
import api from '~/services/api';

export default function Home() {
  const [hasMore, setHasmore] = useState(true);
  const [users, setUsers] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState('/api/users');

  async function getNextUsers() {
    try {
      const response = await api.get(nextEndpoint);

      setUsers([...users, ...response.data]);
      if (response.headers['relative-link-url']) {
        setNextEndpoint(response.headers['relative-link-url']);
        setHasmore(true);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      setHasmore(false);
      // eslint-disable-next-line no-alert
      alert('Falha ao tentar carregar.');
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Git Users
      </h1>
      <List>
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextUsers}
          hasMore={hasMore}
          loader={<div>Loading ...</div>}
          threshold={100}
        >
          {users.map(user => (
            <li key={user.id}>
              <span>
                {user.id} - {user.login}
              </span>
              <Link to={`/users/${user.login}`}>Details</Link>
            </li>
          ))}
        </InfiniteScroll>
      </List>
    </Container>
  );
}
