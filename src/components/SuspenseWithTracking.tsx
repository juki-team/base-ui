import React, { ReactNode, Suspense, useEffect } from 'react';
import { useLazyLoadingStore } from '../stores/lazyLoading/useLazyLoadingStore';

export const SuspenseWithTracking = ({ children, fallback, id }: {
  children: ReactNode,
  fallback?: ReactNode,
  id: string
}) => {
  const startLoading = useLazyLoadingStore(state => state.startLoading);
  const stopLoading = useLazyLoadingStore(state => state.stopLoading);
  
  useEffect(() => {
    startLoading(id);
    return () => stopLoading(id);
  }, [ startLoading, stopLoading ]);
  
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
