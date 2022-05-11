import 'reflect-metadata';

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

function routeBinder(method: HttpMethods) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', method, target, key);
    };
  };
}

export const get = routeBinder('get');
export const post = routeBinder('post');
export const patch = routeBinder('patch');
export const put = routeBinder('put');
export const del = routeBinder('delete');
