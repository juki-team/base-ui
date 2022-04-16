import { ReactNode } from 'react';
import { Crop } from 'react-image-crop';

export type CroppedImageType = {
  url: string,
  blob: Blob | null,
}

export interface ImageLoaderAndCropperProps {
  defaultCrop?: Crop,
  action: (croppedImage: CroppedImageType) => ReactNode,
}
