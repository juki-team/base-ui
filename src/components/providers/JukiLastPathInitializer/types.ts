import type { Href } from '../../types';

export type LastPathType<T extends string | number = string> = {
  [Key in T]: Href;
};

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>;
}
