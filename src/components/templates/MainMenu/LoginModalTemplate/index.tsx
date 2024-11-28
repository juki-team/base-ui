import React, { lazy, Suspense } from 'react';
import { JukiLoadingLayout } from '../../../molecules';
import { LoginModalTemplateProps } from './types';

const LazyLoginModalTemplate = lazy(() => import('./LoginModalTemplate').then(module => ({ default: module.LoginModalTemplate })));

export const LoginModalTemplate = (props: LoginModalTemplateProps) => (
  <Suspense fallback={<JukiLoadingLayout />}>
    <LazyLoginModalTemplate {...props} />
  </Suspense>
);

export * from './ForgotPassword';
