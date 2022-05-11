import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { HttpMethods } from './routes';
import { MetaDataKeys } from './Metadata';

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

      if (path) {
        router[method](`${prefix}${path}`, routeHandler);
      }
    }
  };
}
