import { lazy } from 'react';

export const UserPreviewModalImport = () => import('./UserPreviewModal');

export const UserPreviewModal = lazy(() => UserPreviewModalImport());
