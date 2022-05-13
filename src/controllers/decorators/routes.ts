import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetaDataKeys } from './Metadata';

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: HttpMethods) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetaDataKeys.Path, path, target, key);
      Reflect.defineMetadata(MetaDataKeys.Method, method, target, key);
    };
  };
}

export const get = routeBinder('get');
export const post = routeBinder('post');
export const patch = routeBinder('patch');
export const put = routeBinder('put');
export const del = routeBinder('delete');
