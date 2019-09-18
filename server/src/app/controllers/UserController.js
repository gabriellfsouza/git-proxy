class UserController {
  index(req, res) {
    return res.json({ login: req.params.user });
  }
}

export default new UserController();
