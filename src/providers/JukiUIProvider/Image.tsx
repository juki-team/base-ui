import { ImageCmpProps } from './types';

export const Image = ({ src, className, alt, style, width, height, fill }: ImageCmpProps) => {
  
  if (fill) {
    return (
      <img
        src={src}
        className={className}
        alt={alt}
        width="100%"
        height="100%"
        style={{ objectFit: 'contain', ...style }}
      />
    );
  }
  
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
