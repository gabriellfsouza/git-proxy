import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import ReactLoading from 'react-loading';

import { Container } from './styles';

import api from '~/services/api';

export default function UserList() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState('/api/users');

  async function getNextUsers() {
    setLoading(true);
    try {
      const response = await api.get(nextEndpoint);

      setNextEndpoint(response.headers['relative-link-url']);
      setUsers([...users, ...response.data]);
    } catch (error) {
      alert('Falha ao tentar carregar.');
    }
    setLoading(false);
  }

  useEffect(() => {
    getNextUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading === true ? (
    <ReactLoading type="bars" color="black" />
  ) : (
    <Container>
      <ul>
        {users.map(user => (
          <li key={user.id}>{`${user.id} - ${user.login}`}</li>
        ))}
      </ul>
      <button type="button" data-testid="btn-next" onClick={getNextUsers}>
        <MdNavigateNext />
      </button>
    </Container>
  );
}
