import React, { useState } from 'react';
import { Button, Modal, RefreshIcon, T } from '../../../atoms';
import { Tabs } from '../../../molecules';
import { PublicImagesTab } from './PublicImagesTab';
import { ImageUploaderModalProps } from './types';
import { UploadNewImageTab } from './UploadNewImageTab';

export const ImageUploaderModal = (props: ImageUploaderModalProps) => {
  
  const {
    isOpen,
    onClose,
    withPublicImagesTab = true,
    copyButtons,
    onPickImageUrl,
  } = props;
  
  const [ count, setCount ] = useState(0);
  const tabHeaders = [];
  if (withPublicImagesTab) {
    tabHeaders.push({
      key: 'public-images',
      header: <>
        <T className="tt-se">public images</T>
        <Button icon={<RefreshIcon />} size="small" type="light" onClick={() => setCount(count + 1)} />
      </>,
      body: (
        <PublicImagesTab
          trigger={count}
          key="public-images-tab"
          copyButtons={copyButtons}
          onPickImageUrl={onPickImageUrl}
        />
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
    >
      <div>
        <Tabs tabs={tabHeaders} />
      </div>
    </Modal>
  );
};

export * from './types';
