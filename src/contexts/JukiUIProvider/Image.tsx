import React, { CSSProperties } from 'react';

export interface ImageCmpProps {
  src?: string,
  className?: string,
  alt: string,
  height: number,
  width: number,
  style?: CSSProperties,
}

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
