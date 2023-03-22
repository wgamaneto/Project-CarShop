import { Router } from 'express';
import MtController from '../Controllers/MtController';

const routes = Router();

routes.get(
  '/',
  (req, res, next) => new MtController(req, res, next).findAll(),
);

routes.get(
  '/:id',
  (req, res, next) => new MtController(req, res, next).findById(),
);

routes.post(
  '/',
  (req, res, next) => new MtController(req, res, next).create(),
);

routes.put(
  '/:id',
  (req, res, next) => new MtController(req, res, next).update(),
);

routes.delete(
  '/:id',
  (req, res, next) => new MtController(req, res, next).delete(),
);

export default routes;