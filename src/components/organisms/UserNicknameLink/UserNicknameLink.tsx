import { useMemo } from 'react';
import { QueryParamKey } from '../../../enums';
import { cloneURLSearchParams } from '../../../settings/AppRoutes';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import type { UserNicknameLinkProps } from '../UserChip/types';

export function UserNicknameLink({ children, nickname, organizationKey }: UserNicknameLinkProps) {
  const currentSearchParams = useRouterStore((state) => state.searchParams);
  // const preload = usePreload();
  const { Link } = useUIStore((store) => store.components);

  // useEffect(() => {
  //   void preload(jukiApiManager.API_V2.user.getSummary({ params: { nickname, organizationKey } }).url);
  // }, [ organizationKey, nickname, preload ]);

  const searchParams = useMemo(() => {
    const clonedSearchParams = cloneURLSearchParams(currentSearchParams);
    clonedSearchParams.delete(QueryParamKey.USER_PREVIEW);
    clonedSearchParams.append(QueryParamKey.USER_PREVIEW, nickname);
    if (organizationKey) {
      clonedSearchParams.append(QueryParamKey.USER_PREVIEW, organizationKey);
    }
    return clonedSearchParams;
  }, [organizationKey, currentSearchParams, nickname]);

  return <Link href={{ query: searchParams.toString() }}>{children}</Link>;
}
