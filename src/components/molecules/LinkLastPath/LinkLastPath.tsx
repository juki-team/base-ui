import { useMemo } from 'react';
import { QueryParamKey } from '../../../enums';
import { cloneURLSearchParams } from '../../../settings/AppRoutes';
import { useLastPathStore } from '../../../stores/lastPath/useLastPath';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { getHref } from '../../helpers';
import type { LastPathType } from '../../providers/JukiLastPathInitializer/types';
import type { LinkLastPathProps } from './types';

export function LinkLastPath<T extends string | number = string, >(props: LinkLastPathProps<T>) {
  
  const { children, lastPathKey, overwriteCompanyKey } = props;
  
  const { Link } = useUIStore(store => store.components);
  
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
  
  const pathname = getHref(lastPath?.[lastPathKey])?.pathname;
  
  if (pathname) {
    return (
      <Link
        href={{
          pathname,
          query: searchParams.toString(),
        }}
        className="link dy-cs"
      >
        {children}
      </Link>
    );
  }
  
  return children;
}
