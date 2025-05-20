import React, { ReactNode, Suspense, useEffect } from 'react';
import { useLazyLoadingStore } from '../stores/lazyLoading/useLazyLoadingStore';

export const SuspenseWithTracking = ({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) => {
  const startLoading = useLazyLoadingStore(state => state.startLoading);
  const stopLoading = useLazyLoadingStore(state => state.stopLoading);
  
  useEffect(() => {
    startLoading();
    return () => stopLoading();
  }, [ startLoading, stopLoading ]);
  
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
