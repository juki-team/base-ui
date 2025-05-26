import React from 'react';
import { Button, T } from '../../atoms';
import { CloudUploadIcon } from '../../server';
import { ImageUploaderModal } from './ImageUploaderModal';
import { UploadImageButtonChildrenProps, UploadImageButtonProps } from './types';

export const UploadImageButton = (props: UploadImageButtonProps) => {
  
  const {
    open,
    setOpen,
    isOpenRef,
    withLabel = false,
    copyButtons,
    onPickImageUrl,
    children: _children,
  } = props;
  
  if (isOpenRef) {
    isOpenRef.current = open;
  }
  
  const children = _children || (({ setOpen, withLabel }: UploadImageButtonChildrenProps) => {
    return (
      <Button icon={<CloudUploadIcon />} type="void" className="bc-we" size="small" onClick={() => setOpen(true)}>
        {withLabel && <T>pick / upload image</T>}
      </Button>
    );
  });
  
  return (
    <>
      <div
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={withLabel ? '' : 'upload image'}
        data-tooltip-t-class-name="ws-np tt-se"
      >
        {children({ open, setOpen, withLabel })}
      </div>
      <ImageUploaderModal
        isOpen={open}
        onClose={() => setOpen(false)}
        copyButtons={copyButtons}
        onPickImageUrl={onPickImageUrl}
      />
    </>
  );
};
