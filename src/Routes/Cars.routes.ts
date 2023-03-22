import { Router } from 'express';
import CarsController from '../Controllers/CarsController';

const routes = Router();

routes.get(
  '/',
  (req, res, next) => new CarsController(req, res, next).findAll(),
);

routes.get(
  '/:id',
  (req, res, next) => new CarsController(req, res, next).findById(),
);

routes.post(
  '/',
  (req, res, next) => new CarsController(req, res, next).create(),
);

routes.put(
  '/:id',
  (req, res, next) => new CarsController(req, res, next).update(),
);

routes.delete(
  '/:id',
  (req, res, next) => new CarsController(req, res, next).delete(),
);

export default routes;