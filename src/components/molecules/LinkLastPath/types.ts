import { PropsWithChildren } from 'react';
import { Href } from '../../../contexts/JukiRouterProvider/types';

export interface LastPathProps<T> {
  lastPathKey: T,
  onDoubleClickRoute?: Href,
  overwriteCompanyKey?: string,
}

export type LinkLastPathProps<T extends string | number = string, > = PropsWithChildren<LastPathProps<T>>;
