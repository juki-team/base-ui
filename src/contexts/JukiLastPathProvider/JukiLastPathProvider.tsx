import { type PropsWithChildren, useEffect, useRef } from 'react';
import { useLastPathStore } from '../../stores/lastPath/useLastPath';
import { useUserStore } from '../../stores/user/useUserStore';
import type { LastPathProviderProps } from './types';

export const JukiLastPathProvider = <T extends string | number, >(props: PropsWithChildren<LastPathProviderProps<T>>) => {
  
  const { children, initialLastPath } = props;
  
  const setInitialLastPath = useLastPathStore(state => state.setInitialLastPath);
  const userNickname = useUserStore(state => state.user.nickname);
  const userNicknameRef = useRef(userNickname);
  
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
