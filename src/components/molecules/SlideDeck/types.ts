import { Theme } from '@juki-team/commons';
import { ReactNode } from 'react';

export interface SlideDeckProps {
  children: ReactNode,
  onClose?: () => void,
  fontSize?: number,
  theme?: Theme,
  colorTextHighlight?: string,
  fragmented?: boolean,
}
