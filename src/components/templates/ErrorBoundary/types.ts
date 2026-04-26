import type { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  reload?: () => void;
  background?: boolean;
}
