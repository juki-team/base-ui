import { Href } from '../../../contexts/JukiRouterProvider/types';

export interface LastPathProps<T> {
  lastPathKey: T,
  onDoubleClickRoute?: Href,
  overwriteCompanyKey?: string,
}
