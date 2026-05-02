import type { CSSProperties } from 'react';

export interface ImageCmpProps1 {
  src?: string;
  className?: string;
  alt: string;
  height: number;
  width: number;
  style?: CSSProperties;
  fill?: never;
}

export interface ImageCmpProps2 {
  src?: string;
  className?: string;
  alt: string;
  height?: never;
  width?: never;
  style?: CSSProperties;
  fill: true;
}

export type ImageCmpProps = ImageCmpProps1 | ImageCmpProps2;
