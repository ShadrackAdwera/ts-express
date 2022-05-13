import 'reflect-metadata';
import { MetaDataKeys } from './Metadata';

export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetaDataKeys.Validator, keys, target, key);
  };
}
