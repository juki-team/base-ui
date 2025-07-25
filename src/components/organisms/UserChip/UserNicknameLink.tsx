import React, { useEffect, useMemo } from 'react';
import { cloneURLSearchParams } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { usePreload } from '../../../hooks/usePreload';
import { jukiApiManager } from '../../../settings';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { QueryParamKey } from '../../../types';
import { UserNicknameLinkProps } from './types';

export const UserNicknameLink = ({ children, nickname, companyKey }: UserNicknameLinkProps) => {
  
  const currentSearchParams = useRouterStore(state => state.searchParams);
  
  const preload = usePreload();
  const { components: { Link } } = useJukiUI();
  useEffect(() => {
    void preload(jukiApiManager.API_V1.user.getSummary({ params: { nickname, companyKey } }).url);
  }, [ companyKey, nickname, preload ]);
  const searchParams = useMemo(() => {
    const clonedSearchParams = cloneURLSearchParams(currentSearchParams);
    clonedSearchParams.delete(QueryParamKey.USER_PREVIEW);
    clonedSearchParams.append(QueryParamKey.USER_PREVIEW, nickname);
    if (companyKey) {
      clonedSearchParams.append(QueryParamKey.USER_PREVIEW, companyKey);
    }
    return clonedSearchParams;
    
  }, [ companyKey, currentSearchParams, nickname ]);
  
  return (
    <Link href={{ query: searchParams.toString() }}>
      {children}
    </Link>
  );
};
