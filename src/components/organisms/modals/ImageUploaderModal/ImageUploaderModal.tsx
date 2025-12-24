import { useState } from 'react';
import { Button, Modal, T } from '../../../atoms';
import { Tabs } from '../../../molecules';
import { RefreshIcon } from '../../../server';
import { PublicImagesTab } from './PublicImagesTab';
import type { ImageUploaderModalProps } from './types';
import { UploadNewImageTab } from './UploadNewImageTab';

export function ImageUploaderModal(props: ImageUploaderModalProps) {
  
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
    body: (
      <UploadNewImageTab
        key="upload-new-image-tab"
        copyButtons={copyButtons}
        onPickImageUrl={onPickImageUrl}
        onUploadedImage={() => setCount(count + 1)}
      />
    ),
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
}
