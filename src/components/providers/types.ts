import type { LastPathProviderProps } from './JukiLastPathInitializer/types';
import type { JukiRouterInitializerProps } from './JukiRouterInitializer/types';
import type { JukiUIProviderProps } from './JukiUIProvider/types';

export type JukiProvidersProps<T extends string | number> = JukiUIProviderProps &
  LastPathProviderProps<T> & {
    router: JukiRouterInitializerProps;
  };

export type * from './JukiUIProvider/types';
export type * from './JukiUserProvider/types';
