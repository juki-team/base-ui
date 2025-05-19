import { PropsWithChildren, useEffect } from 'react';
import { useLastPathStore } from '../../stores/lastPath/useLastPath';
import { useUserStore } from '../../stores/user/useUserStore';
import { LastPathType } from './types';

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>,
}

export const JukiLastPathProvider = <T extends string | number, >(props: PropsWithChildren<LastPathProviderProps<T>>) => {
  
  const { children, initialLastPath } = props;
  
  const { setInitialLastPath } = useLastPathStore();
  const userNickname = useUserStore(state => state.user.nickname);
  
  useEffect(() => {
    setInitialLastPath(initialLastPath);
  }, [ userNickname, initialLastPath, setInitialLastPath ]);
  
  return children;
};
