import { useEffect, useState } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { isBrowser } from '../helpers';

const getHash = () => (isBrowser() ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined);

export const useHash = () => {
  const [hash, setHash] = useState(() => getHash() ?? '');
  const routeParams = useRouterStore((store) => store.routeParams);

  // biome-ignore lint/correctness/useExhaustiveDependencies: routeParams is a trigger to re-read the hash on client-side navigation
  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash() ?? '');
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [routeParams]);

  return hash;
};
