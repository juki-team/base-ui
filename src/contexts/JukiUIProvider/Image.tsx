import React from 'react';
import { ImageCmpProps } from './types';

export const Image = ({ src, className, alt, style, width, height }: ImageCmpProps) => {
  return (
    <img
      src={src}
      className={className}
      alt={alt}
      width={width}
      height={height}
      style={{ ...style, width, height }}
    />
  );
};
