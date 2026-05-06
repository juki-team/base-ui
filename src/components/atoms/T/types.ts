import type { CSSProperties } from 'react';

export interface TProps {
  className?: string;
  children: string;
  style?: CSSProperties;
}

export type { Dict } from './shared';

export interface I18nContextValue {
  locale: string;
  dict: import('./shared').Dict;
  dicts: Record<string, import('./shared').Dict>;
}

export interface I18nProviderProps {
  locale: string;
  dicts: Record<string, import('./shared').Dict>;
  children?: import('react').ReactNode;
}
