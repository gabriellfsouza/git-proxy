import api from '../services/api';

class UserController {
  /**
   * api/users and api/users/:user/details paths
   * @param {Object} req
   * @param {Object} res
   */
  async index(req, res) {
    try {
      const response = await api.get(`users/${req.params.user}`);
      return res.json(response.data);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

export default new UserController();
