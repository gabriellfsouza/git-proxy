import React, { useState, useEffect } from 'react';
import { Container } from './styles';

import api from '~/services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const response = await api.get('/api/users');
      console.log(response);
      setUsers(response.data);
    }

    getUsers();
  }, []);

  return (
    <Container>
      <ul>
        {users.map(user => (
          <li key={user.id}>{`${user.id} - ${user.login}`}</li>
        ))}
      </ul>
    </Container>
  );
}
