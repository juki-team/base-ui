import { useMemo } from 'react';
import { LastPathType } from '../../../contexts/JukiLastPathProvider/types';
import { cloneURLSearchParams, getHref } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import { useLastPathStore } from '../../../stores/lastPath/useLastPath';
import { LinkLastPathProps, QueryParamKey } from '../../../types';

export const LinkLastPath = <T extends string | number = string, >(props: LinkLastPathProps<T>) => {
  
  const { children, lastPathKey, overwriteCompanyKey } = props;
  
  const { components: { Link } } = useJukiUI();
  
  const lastPath = useLastPathStore(state => state.lastPath) as LastPathType<T>;
  
  const searchParams = useMemo(() => {
    const { searchParams } = getHref(lastPath?.[lastPathKey] ?? '');
    if (overwriteCompanyKey) {
      const clonedSearchParams = cloneURLSearchParams(searchParams);
      clonedSearchParams.set(QueryParamKey.COMPANY, overwriteCompanyKey || '');
      return clonedSearchParams;
    }
    
    return searchParams;
  }, [ lastPath, lastPathKey, overwriteCompanyKey ]);
  
  return (
    <Link
      href={getHref(lastPath?.[lastPathKey])?.pathname ? {
        pathname: getHref(lastPath?.[lastPathKey])?.pathname,
        query: searchParams.toString(),
      } : '#'}
      className="link dy-cs"
    >
      {children}
    </Link>
  );
};
