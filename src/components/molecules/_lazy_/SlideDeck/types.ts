import { AspectRatio, Theme } from '@juki-team/commons';
import { ReactNode } from 'react';

export interface SlideDeckProps {
  children: ReactNode,
  onClose?: () => void,
  // key:
  fontSize?: number,
  theme?: Theme,
  colorTextHighlight?: string,
  aspectRatio: AspectRatio,
}
