import React, { PropsWithChildren, useMemo } from 'react';
import { Href } from '../../../contexts/JukiRouterProvider/types';
import { cloneURLSearchParams } from '../../../helpers';
import { useJukiRouter } from '../../../hooks/useJukiRouter';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useLastPath } from '../../../hooks/useLastPath';
import { QueryParamKey } from '../../../types';

interface LastPathProps<T> {
  lastPathKey: T,
  onDoubleClickRoute?: Href,
  overwriteCompanyKey?: string,
}

export const LinkLastPath = <T, >(props: PropsWithChildren<LastPathProps<T>>) => {
  
  const { children, lastPathKey, onDoubleClickRoute, overwriteCompanyKey } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const { lastPath } = useLastPath();
  
  const { pushRoute } = useJukiRouter();
  
  const searchParams = useMemo(() => {
    if (overwriteCompanyKey) {
      const clonedSearchParams = cloneURLSearchParams(lastPath[lastPathKey].searchParams);
      clonedSearchParams.set(QueryParamKey.COMPANY, overwriteCompanyKey || '');
      return clonedSearchParams;
    }
    
    return lastPath[lastPathKey].searchParams;
  }, [ lastPath, lastPathKey, overwriteCompanyKey ]);
  
  return (
    <Link
      href={{ pathname: lastPath[lastPathKey].pathname, query: searchParams.toString() }}
      className="link dy-cs"
      onClick={event => {
        if (onDoubleClickRoute && event.detail === 2) {
          void pushRoute(onDoubleClickRoute);
          event.preventDefault();
          event.stopPropagation();
        }
      }}
    >
      {children}
    </Link>
  );
};
