import { Context, createContext } from 'react';
import { LastPathContextInterface, LastPathType } from './types';

export const LastPathContextFn = <T extends string | number, >(initialLastPath: LastPathType<T>) => createContext<LastPathContextInterface<T>>({
  pushPath: () => null,
  lastPath: initialLastPath,
});

export const LastPathContextRef: { current?: Context<LastPathContextInterface<any>> } = {
  current: undefined,
}
