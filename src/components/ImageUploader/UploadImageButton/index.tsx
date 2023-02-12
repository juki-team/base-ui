import React, { Dispatch, MutableRefObject, useState } from 'react';
import { Button, CloudUploadIcon, ImageUploaderModal, onPickImageUrlType, Popover, T } from '../../index';

export const UploadImageButton = ({
  isOpenRef,
  withLabel,
  copyButtons,
  onPickImageUrl,
}: { isOpenRef: MutableRefObject<boolean>, withLabel: boolean, copyButtons?: boolean, onPickImageUrl?: onPickImageUrlType }) => {
  
  const [open, setOpen] = useState(false);
  isOpenRef.current = open;
  
  const children = ({ open, setOpen, withLabel }: { open: boolean, setOpen: Dispatch<boolean>, withLabel: boolean }) => {
    return (
      <Button icon={<CloudUploadIcon />} type="text" size="small" onClick={() => setOpen(true)}>
        {withLabel && <T>pick/upload image</T>}
      </Button>
    );
  };
  
  return (
    <>
      <Popover
        content={<T className="ws-np tt-se">upload image</T>}
        placement="bottom"
        visible={withLabel ? false : undefined}
        showPopperArrow
      >
        <div>
          {children({ open, setOpen, withLabel })}
        </div>
      </Popover>
      <ImageUploaderModal
        isOpen={open}
        onClose={() => setOpen(false)}
        copyButtons={copyButtons}
        onPickImageUrl={onPickImageUrl}
      />
    </>
  );
};
