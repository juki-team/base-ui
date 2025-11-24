import { useEffect } from 'react';
import { useLastPathStore } from '../../stores/lastPath/useLastPath';
import { useUserStore } from '../../stores/user/useUserStore';
import type { LastPathProviderProps } from './types';

export const JukiLastPathInitializer = <T extends string | number, >({ initialLastPath }: LastPathProviderProps<T>) => {
  
  const setInitialLastPath = useLastPathStore(state => state.setInitialLastPath);
  const userNickname = useUserStore(state => state.user.nickname);
  const initialLastPathString = JSON.stringify(initialLastPath);
  
  useEffect(() => {
    const initialLastPath = JSON.parse(initialLastPathString);
    setInitialLastPath(initialLastPath);
  }, [ userNickname, initialLastPathString, setInitialLastPath ]);
  
  return null;
};
