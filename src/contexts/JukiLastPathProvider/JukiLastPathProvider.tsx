import { PropsWithChildren, useEffect } from 'react';
import { useJukiUser } from '../../hooks/useJukiUser';
import { useLastPathStore } from '../../stores/lastPath/useLastPath';
import { LastPathType } from './types';

export interface LastPathProviderProps<T extends string | number> {
  initialLastPath: LastPathType<T>,
}

export const JukiLastPathProvider = <T extends string | number, >(props: PropsWithChildren<LastPathProviderProps<T>>) => {
  
  const { children, initialLastPath } = props;
  
  const { setLastPath } = useLastPathStore();
  
  const { user: { nickname } } = useJukiUser();
  
  useEffect(() => {
    setLastPath(initialLastPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ nickname ]);
  
  return children;
};
