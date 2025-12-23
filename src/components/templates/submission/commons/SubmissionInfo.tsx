import { type PropsWithChildren, useMemo } from 'react';
import { QueryParamKey } from '../../../../enums';
import { cloneURLSearchParams } from '../../../../settings/AppRoutes';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUIStore } from '../../../../stores/ui/useUIStore';

export interface SubmissionInfoProps {
  submitId: string,
  canViewSourceCode: boolean,
}

export function SubmissionInfo({ submitId, canViewSourceCode, children }: PropsWithChildren<SubmissionInfoProps>) {
  
  const currentSearchParams = useRouterStore(state => state.searchParams);
  // const preload = usePreload();
  const { Link } = useUIStore(store => store.components);
  
  // useEffect(() => {
  //   if (canViewSourceCode) {
  //     void preload(jukiApiManager.API_V2.submission.getData({ params: { id: submitId } }).url);
  //   }
  // }, [ submitId, preload, canViewSourceCode ]);
  
  const searchParams = useMemo(() => {
    const clonedSearchParams = cloneURLSearchParams(currentSearchParams);
    clonedSearchParams.delete(QueryParamKey.SUBMISSION);
    clonedSearchParams.append(QueryParamKey.SUBMISSION, submitId);
    return clonedSearchParams;
  }, [ currentSearchParams, submitId ]);
  
  if (canViewSourceCode) {
    return (
      <Link href={{ query: searchParams.toString() }} className="link">
        {children}
      </Link>
    );
  }
  
  return children;
}
