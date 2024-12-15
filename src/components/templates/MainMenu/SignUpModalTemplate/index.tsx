import React, { lazy, Suspense } from 'react';
import { T } from '../../../atoms';
import { JukiLoadingLayout } from '../../../molecules';
import { SignUpModalComponentProps } from './types';

const LazySignUpModalTemplate = lazy(() => import('./SignUpModalTemplate').then(module => ({ default: module.SignUpModalTemplate })));

export const SignUpModalTemplate = (props: SignUpModalComponentProps) => (
  <Suspense fallback={<JukiLoadingLayout><T className="tt-se">loading component</T></JukiLoadingLayout>}>
    <LazySignUpModalTemplate{...props} />
  </Suspense>
);
