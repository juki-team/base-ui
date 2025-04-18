import { Href } from '../JukiRouterProvider/types';

export type LastPathType<T extends string | number = string> = {
  [key in T]: Href
};
