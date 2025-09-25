import type { PixelCrop } from 'react-image-crop';
import { toBlob } from '../../../helpers';
import { canvasPreview } from './canvasPreview';

let previewUrl = '';

// Returns an image source you should set to state and pass
// `{previewSrc && <img alt="Crop preview" src={previewSrc} />}`
export async function imgPreview(
  image: HTMLImageElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas');
    void canvasPreview(image, canvas, crop, scale, rotate);
    
    const blob = await toBlob(canvas);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (blob) {
      previewUrl = URL.createObjectURL(blob);
    }
    
    return previewUrl;
  }
  return null;
}
