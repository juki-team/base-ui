import React, { useMemo } from 'react';
import { LastPathType } from '../../../contexts/JukiLastPathProvider/types';
import { cloneURLSearchParams } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useLastPathStore } from '../../../stores/lastPath/useLastPath';
import { LinkLastPathProps, QueryParamKey } from '../../../types';

export const LinkLastPath = <T extends string | number = string, >(props: LinkLastPathProps<T>) => {
  
  const { children, lastPathKey, overwriteCompanyKey } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const lastPath: LastPathType<T> = useLastPathStore(state => state.lastPath) as LastPathType<T>;
  
  const searchParams = useMemo(() => {
    if (overwriteCompanyKey) {
      const clonedSearchParams = cloneURLSearchParams(lastPath[lastPathKey]?.searchParams);
      clonedSearchParams.set(QueryParamKey.COMPANY, overwriteCompanyKey || '');
      return clonedSearchParams;
    }
    
    return lastPath[lastPathKey]?.searchParams || new URLSearchParams();
  }, [ lastPath, lastPathKey, overwriteCompanyKey ]);
  
  return (
    <Link
      href={{ pathname: lastPath[lastPathKey]?.pathname ?? '#', query: searchParams.toString() }}
      className="link dy-cs"
    >
      {children}
    </Link>
  );
};
