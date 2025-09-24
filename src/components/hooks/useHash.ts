import { useEffect, useState } from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';

const getHash = () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined);

export const useHash = () => {
  const [ hash, setHash ] = useState(getHash() ?? '');
  const routeParams = useRouterStore(store => store.routeParams);
  
  useEffect(() => {
    const handleHashChange = () => {
      setHash(getHash() ?? '');
    };
    setHash(getHash() ?? '');
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [ routeParams ]);
  
  return hash;
};
