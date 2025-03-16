import React, { PropsWithChildren, useMemo } from 'react';
import { LastPathType } from '../../../contexts/JukiLastPathProvider/types';
import { cloneURLSearchParams } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useLastPathStore } from '../../../stores/lastPath/useLastPath';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { QueryParamKey } from '../../../types';
import { LastPathProps } from './types';

export const LinkLastPath = <T extends string | number = string, >(props: PropsWithChildren<LastPathProps<T>>) => {
  
  const { children, lastPathKey, onDoubleClickRoute, overwriteCompanyKey } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const lastPath: LastPathType<T> = useLastPathStore(state => state.lastPath) as LastPathType<T>;
  
  const pushRoute = useRouterStore(state => state.pushRoute);
  
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
