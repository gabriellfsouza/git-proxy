import api from '../services/api';

class UserController {
  /**
   * api/users/:user/details path
   * @param {Object} req
   * @param {Object} res
   */
  async index(req, res) {
    const response = await api.get(`users/${req.params.user}`);
    return res.json(response.data);
  }

  /**
   * api/users{?since} path
   * @param {Object} req
   * @param {Object} res
   */
  async indexAll(req, res) {
    const { since } = req.query;
    const per_page = process.env.EL_PER_PAGE || 5;
    const strCompare = '; rel="next"';

    const returnHeaders = {};
    const response = await api.get(`users`, { params: { since, per_page } });
    const { link: originalLink } = response.headers || {};

    if (originalLink && originalLink.indexOf(strCompare) > -1) {
      const urls = originalLink.split(',').map(str => str.trim());
      const el = urls.find(str => str.indexOf(strCompare) > -1);
      const url = el.substr(1, el.indexOf(strCompare) - 2);
      const urlSearch = new URLSearchParams(url);
      const sinceNext =
        urlSearch.get('since') ||
        urlSearch.get('https://api.github.com/users?since');

      returnHeaders.Link = `${req.protocol}://${req.headers.host}/api/users?since=${sinceNext}`;
      returnHeaders['Relative-Link-Url'] = `/api/users?since=${sinceNext}`;
    }
    return res.set(returnHeaders).json(response.data);
  }
}

export default new UserController();
