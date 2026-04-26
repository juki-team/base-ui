import type { AspectRatio, Theme } from '@juki-team/commons/enums';
import type { ReactNode } from 'react';

export interface SlideDeckProps {
  children: ReactNode;
  onClose?: () => void;
  // key:
  fontSize?: number;
  theme?: Theme;
  colorTextHighlight?: string;
  aspectRatio: AspectRatio;
  autoSlide?: number;
}
