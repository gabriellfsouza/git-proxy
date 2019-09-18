import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/users/:user', UserController.index);

export default routes;
