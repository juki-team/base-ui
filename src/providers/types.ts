import type { LastPathProviderProps } from './JukiLastPathInitializer/types';
import { JukiRouterInitializerProps } from './JukiRouterInitializer/types';
import type { JukiUIProviderProps } from './JukiUIProvider/types';
import type { JukiUserProviderProps } from './JukiUserProvider/types';

export type JukiProvidersProps<T extends string | number> =
  JukiUIProviderProps
  & JukiUserProviderProps
  & LastPathProviderProps<T>
  & {
  router: JukiRouterInitializerProps
};

export type * from './JukiUIProvider/types';
export type * from './JukiUserProvider/types';
