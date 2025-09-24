import { Href } from '../../components/types/router';

export type LastPathType<T extends string | number = string> = {
  [key in T]: Href
};

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>,
}
