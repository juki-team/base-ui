import { useEffect, useMemo } from 'react';
import { QueryParamKey } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { cloneURLSearchParams } from '../../../settings/AppRoutes';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { usePreload } from '../../hooks/usePreload';
import type { UserNicknameLinkProps } from '../UserChip/types';

export function UserNicknameLink({ children, nickname, companyKey }: UserNicknameLinkProps) {
  
  const currentSearchParams = useRouterStore(state => state.searchParams);
  const preload = usePreload();
  const { Link } = useUIStore(store => store.components);
  
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
}
