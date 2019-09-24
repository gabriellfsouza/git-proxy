import React, { useState, useEffect } from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Container } from './styles';

import api from '~/services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [nextEndpoint, setNextEndpoint] = useState('/api/users');

  async function getNextUsers() {
    try {
      const response = await api.get(nextEndpoint);
    
      setNextEndpoint(response.headers['relative-link-url']);
      setUsers([...users, ...response.data]);
    } catch (error) {
      console.log(error);
      alert(error);
    }
    
  }

  useEffect(() => {
    getNextUsers();
  }, []);

  return (
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
