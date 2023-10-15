import React, { useState } from 'react';
import { Button } from '../../../molecules/ButtonLoader';
import { ReloadIcon } from '../../graphics';
import { Modal } from '../../../Modal';
import { Tabs } from '../../../molecules/Tabs';
import { T } from '../../Translate';
import { PublicImagesTab } from './PublicImagesTab';
import { ImageUploaderModalProps } from './types';
import { UploadNewImageTab } from './UploadNewImageTab';

export const ImageUploaderModal = ({
  isOpen,
  onClose,
  withPublicImagesTab = true,
  copyButtons,
  onPickImageUrl,
}: ImageUploaderModalProps) => {
  
  const [count, setCount] = useState(0);
  const tabHeaders = [];
  if (withPublicImagesTab) {
    tabHeaders.push({
      key: 'public-images',
      header: <>
        <T className="tt-se">public images</T>
        <Button icon={<ReloadIcon />} size="small" type="text" onClick={() => setCount(count + 1)} />
      </>,
      body: (
        <PublicImagesTab trigger={count} key="public-images-tab" copyButtons={copyButtons} onPickImageUrl={onPickImageUrl} />
      ),
    });
  }
  tabHeaders.push({
    key: 'upload-new-image',
    header: <T className="tt-se">upload new image</T>,
    body: <UploadNewImageTab key="upload-new-image-tab" copyButtons={copyButtons} onPickImageUrl={onPickImageUrl} />,
  });
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-upload-image"
      closeIcon
    >
      <div>
        <Tabs tabs={tabHeaders} />
      </div>
    </Modal>
  );
};

export * from './types';
