import { Meta, StoryObj } from '@storybook/react-webpack5';
import { FC, useState } from 'react';
import { downloadBlobAsFile, toBlob } from '../../../helpers';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { ImageLoaderCropper as ImageLoaderCropperCmp } from './ImageLoaderCropper';
import { CropImageType, ImageLoaderCropperProps } from './types';
// import { COMPONENTS_WRITING_TOOLS } from './constants';

const meta: Meta<typeof ImageLoaderCropperCmp> = {
  component: ImageLoaderCropperCmp,
};

export default meta;

type Story = StoryObj<typeof ImageLoaderCropperCmp>;

const ImageLoaderCropperComponent: FC<ImageLoaderCropperProps> = ({
                                                                    onCropChange,
                                                                    ...props
                                                                  }) => {
  const [ cropImage, setCropImage ] = useState<CropImageType>();
  
  return (
    <MockupJukiProvider>
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
        <ImageLoaderCropperCmp onCropChange={setCropImage} {...props} />
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
      </div>
    </MockupJukiProvider>
  );
};

export const ImageLoaderCropper: Story = {
  render: (args: ImageLoaderCropperProps) => (
    <ImageLoaderCropperComponent {...args} />
  ),
};

/*export const ImageLoaderCropperClassic = ImageLoaderCropperComponent.bind({});

ImageLoaderCropperClassic.args = {
  withAspect: true,
  withRotate: true,
  withScale: true,
  rotate: 0,
  scale: 1,
  aspect: 1,
};*/
