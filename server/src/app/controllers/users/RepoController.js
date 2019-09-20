import api from '../../services/api';

async function iteratorRepo(req, page = undefined) {
  const url = `users/${
    req.params.user
  }/repos?type=all&visibility=all&sort=created&direction=asc${
    page ? `&page=${page}` : ''
  }`;

  const response = await api.get(url);
  const { link } = response.headers || {}; // important if the response doesn't return any header

  if (link && link.indexOf('; rel="next"') > -1) {
    return [...response.data, ...(await iteratorRepo(req, page || 2))];
  }

  return [...response.data];
}

class RepoController {
  async index(req, res) {
    const data = await iteratorRepo(req);
    res.json(data);
  }
}

export default new RepoController();
