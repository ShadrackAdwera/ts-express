import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { HttpMethods } from './routes';
import { MetaDataKeys } from './Metadata';
import { RequestHandler, Request, Response, NextFunction } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      res.status(422).send(`Provide all required inputs`);
      return;
    }
    for (const key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Provide the ${key}`);
        return;
      }
    }
    next();
  };
}

export function controller(prefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetaDataKeys.Path,
        target.prototype,
        key
      );
      const method = Reflect.getMetadata(
        MetaDataKeys.Method,
        target.prototype,
        key
      ) as HttpMethods;

      const middlewares =
        Reflect.getMetadata(MetaDataKeys.Middleware, target.prototype, key) ||
        [];

      const requiredProps =
        Reflect.getMetadata(MetaDataKeys.Validator, target.prototype, key) ||
        [];
      const validator = bodyValidators(requiredProps);

      if (path) {
        router[method](
          `${prefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
