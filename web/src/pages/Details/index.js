import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '~/components/Container';
import { UserDetails, RepoList } from './styles';
import api from '~/services/api';

function Details(props) {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUserInfos() {
      try {
        const login = props.match.params.id;
        const userResponse = await api.get(`/api/users/${login}/details`);
        const reposResponse = await api.get(`/api/users/${login}/repos`);

        setUser(userResponse.data);
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Failed to load user details');
      }
    }

    getUserInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // debugger;

  return loading ? (
    <Container>Loading...</Container>
  ) : (
    <Container>
      <UserDetails>
        <Link to="/">Voltar para a lista de usuários</Link>
        <h1>{user.login}</h1>
        <p>Id: {user.id}</p>
        <p>Nome: {user.name}</p>
        <p>
          Repository: <a href={user.html_url}>{user.html_url}</a>
        </p>
      </UserDetails>
      <RepoList>
        {repos.map(repo => (
          <li>
            <div>
              <strong>
                <a href={repo.html_url}>{repo.name}</a>
              </strong>
              <p>{repo.id}</p>
            </div>
          </li>
        ))}
      </RepoList>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Details;
