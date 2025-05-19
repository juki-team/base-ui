import { PropsWithChildren, useEffect, useRef } from 'react';
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
  const userNicknameRef = useRef('');
  
  useEffect(() => {
    if (userNicknameRef.current !== userNickname) {
      setInitialLastPath(initialLastPath, true);
      userNicknameRef.current = userNickname;
    } else {
      setInitialLastPath(initialLastPath, false);
    }
  }, [ userNickname, initialLastPath, setInitialLastPath ]);
  
  return children;
};
