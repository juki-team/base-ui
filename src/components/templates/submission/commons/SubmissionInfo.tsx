import { type PropsWithChildren, useEffect, useMemo } from 'react';
import { QueryParamKey } from '../../../../enums';
import { jukiApiManager } from '../../../../settings';
import { cloneURLSearchParams } from '../../../../settings/AppRoutes';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { usePreload } from '../../../hooks/usePreload';

export interface SubmissionInfoProps {
  submitId: string,
  canViewSourceCode: boolean,
}

export function SubmissionInfo({ submitId, canViewSourceCode, children }: PropsWithChildren<SubmissionInfoProps>) {
  
  const currentSearchParams = useRouterStore(state => state.searchParams);
  const preload = usePreload();
  const { components: { Link } } = useJukiUI();
  
  useEffect(() => {
    void preload(jukiApiManager.API_V1.submission.getData({ params: { id: submitId } }).url);
  }, [ submitId, preload ]);
  
  const searchParams = useMemo(() => {
    const clonedSearchParams = cloneURLSearchParams(currentSearchParams);
    clonedSearchParams.delete(QueryParamKey.SUBMISSION);
    clonedSearchParams.append(QueryParamKey.SUBMISSION, submitId);
    return clonedSearchParams;
  }, [ currentSearchParams ]);
  
  if (canViewSourceCode) {
    return (
      <Link href={{ query: searchParams.toString() }}>
        {children}
      </Link>
    );
  }
  
  return children;
}
