import type { ReactNode } from 'react';

export interface BreadcrumbsProps {
  breadcrumbs: ReactNode[];
  withoutHomeLink?: boolean;
}
