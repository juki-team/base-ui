import React, { lazy, Suspense } from 'react';
import { T } from '../../../atoms';
import { JukiLoadingLayout } from '../../../molecules';
import { LoginModalTemplateProps } from './types';

const LazyLoginModalTemplate = lazy(() => import('./LoginModalTemplate').then(module => ({ default: module.LoginModalTemplate })));

export const LoginModalTemplate = (props: LoginModalTemplateProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T>...</JukiLoadingLayout>}>
    <LazyLoginModalTemplate {...props} />
  </Suspense>
);

export * from './ForgotPassword';
