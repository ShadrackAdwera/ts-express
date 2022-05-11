import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetaDataKeys } from './Metadata';

export function use(middleware: RequestHandler) {
  return function (target: Function, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetaDataKeys.Middleware, target, key) || [];

    Reflect.defineMetadata(
      MetaDataKeys.Middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
