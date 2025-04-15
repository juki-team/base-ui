import { cloneElement, ReactElement, useEffect } from 'react';
import { usePreload, useRouterStore } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { QueryParamKey } from '../../../types';
import { UserNicknameLinkProps } from './types';

export const UserNicknameLink = ({ children, nickname, companyKey }: UserNicknameLinkProps) => {
  
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const preload = usePreload();
  
  useEffect(() => {
    void preload(jukiApiSocketManager.API_V1.user.getSummary({ params: { nickname, companyKey } }).url);
  }, [ companyKey, nickname, preload ]);
  
  return cloneElement(
    children,
    {
      onClick: ((event: any) => {
        event.stopPropagation();
        setSearchParams({
          name: QueryParamKey.USER_PREVIEW,
          value: companyKey ? [ nickname, companyKey ] : nickname,
        });
      }),
    } as ReactElement<{}>['props'],
  );
};
