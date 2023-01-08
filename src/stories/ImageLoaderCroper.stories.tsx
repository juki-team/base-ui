import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button, CropImageType, downloadBlobAsFile, ImageLoaderCropper, ImageLoaderCropperProps, toBlob } from '../index';
import { COMPONENTS_WRITING_TOOLS } from './constants';
import { ToggleThemeButton } from './ToggleThemeButton';

export default {
  title: COMPONENTS_WRITING_TOOLS,
  component: ImageLoaderCropper,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const ImageLoaderCropperComponent: Story<ImageLoaderCropperProps> = ({ onCropChange, ...props }) => {
  
  const [cropImage, setCropImage] = useState<CropImageType>();
  
  return (
    <div className="jk-col gap">
      <Button
        onClick={async () => {
          if (cropImage?.previewCanvasRef.current) {
            const blob = await toBlob(cropImage.previewCanvasRef.current);
            if (blob) {
              await downloadBlobAsFile(blob, 'image');
            }
          }
        }}
      >
        download
      </Button>
      <ImageLoaderCropper
        onCropChange={setCropImage}
        {...props}
      />
      <div>
        {!!cropImage?.pixelCrop && (
          <canvas
            ref={cropImage.previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: cropImage.pixelCrop.width,
              height: cropImage.pixelCrop.height,
            }}
          />
        )}
      </div>
      <ToggleThemeButton />
    </div>
  );
};

export const ImageLoaderCropperClassic = ImageLoaderCropperComponent.bind({});

ImageLoaderCropperClassic.args = { withAspect: true, withRotate: true, withScale: true, rotate: 0, scale: 1, aspect: 1 };
