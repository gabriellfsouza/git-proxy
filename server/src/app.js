import 'dotenv/config';

import Youch from 'youch';
import path from 'path';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: '*',
        exposedHeaders: [
          'Link',
          'Relative-Link-Url',
          'link',
          'relative-link-url',
        ],
        allowedHeaders: [
          'Link',
          'Relative-Link-Url',
          'link',
          'relative-link-url',
        ],
      })
    );
  }

  routes() {
    const publicPath = path.join(__dirname, '..', 'tmp', 'web', 'build');
    this.server.use(routes);
    this.server.use('/', express.static(publicPath));
    this.server.use('/users/*', express.static(publicPath));
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
