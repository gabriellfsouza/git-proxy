import { Router } from 'express';
import UserController from './app/controllers/UserController';
import RepoController from './app/controllers/users/RepoController';

const routes = new Router();

routes.get('/api/users/:user/details', UserController.index);
routes.get('/api/users/:user/repos', RepoController.index);

export default routes;
