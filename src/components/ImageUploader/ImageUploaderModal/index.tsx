import React, { useState } from 'react';
import { Button } from '../../Button';
import { ReloadIcon } from '../../graphics';
import { Modal } from '../../Modal';
import { Tabs } from '../../Tabs';
import { T } from '../../Translate';
import { PublicImagesTab } from './PublicImagesTab';
import { ImageUploaderModalProps } from './types';
import { UploadNewImageTab } from './UploadNewImageTab';

export const ImageUploaderModal = ({ isOpen, onClose, withPublicImagesTab = true }: ImageUploaderModalProps) => {
  const [count, setCount] = useState(0);
  const [tab, setTab] = useState(0);
  const tabHeaders = [];
  if (withPublicImagesTab) {
    tabHeaders.push({
      children: <>
        <T className="text-sentence-case">public images</T>
        <Button icon={<ReloadIcon />} size="small" type="text" onClick={() => setCount(count + 1)} />
      </>,
    });
  }
  tabHeaders.push({ children: <T className="text-sentence-case">upload new image</T> });
  
  const tabs = [];
  if (withPublicImagesTab) {
    tabs.push(<PublicImagesTab trigger={count} key="public-images-tab" />);
  }
  tabs.push(<UploadNewImageTab key="upload-new-image-tab" />);
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-upload-image jk-expanded-modal"
      closeIcon
    >
      <div>
        <Tabs
          tabHeaders={tabHeaders}
          selectedTabIndex={tab}
          onChange={tab => setTab(tab)}
        >
          {tabs}
        </Tabs>
      </div>
    </Modal>
  );
};

export * from './types';
