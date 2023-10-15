import { RefObject } from 'react';
import { Crop, PercentCrop, PixelCrop } from 'react-image-crop';

export type CroppedImageType = {
  url: string,
  blob: Blob | null,
}

export type CropImageType = {
  percentCrop: PercentCrop,
  pixelCrop: PixelCrop,
  previewCanvasRef: RefObject<HTMLCanvasElement>,
  scale: number,
  rotate: number,
  aspect: number | undefined,
  circularCrop: boolean,
}

export interface ImageLoaderCropperProps {
  onCropChange?: (props: CropImageType) => void,
  defaultCrop?: Crop,
  scale?: number,
  rotate?: number,
  aspect?: number,
  circularCrop?: boolean,
  withScale?: boolean,
  withRotate?: boolean,
  withAspect?: boolean,
}
