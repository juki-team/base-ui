import React, { Dispatch, MutableRefObject, ReactNode, useState } from 'react';
import { Button, CloudUploadIcon, ImageUploaderModal, onPickImageUrlType, Popover, T } from '../../index';

type ChildrenProps = { open: boolean, setOpen: Dispatch<boolean>, withLabel: boolean };

export const UploadImageButton = ({
  isOpenRef,
  withLabel = false,
  copyButtons,
  onPickImageUrl,
  children: _children,
}: { isOpenRef?: MutableRefObject<boolean>, withLabel?: boolean, copyButtons?: boolean, onPickImageUrl?: onPickImageUrlType, children?: (props: ChildrenProps) => ReactNode }) => {
  
  const [open, setOpen] = useState(false);
  if (isOpenRef) {
    isOpenRef.current = open;
  }
  
  const children = _children || (({ setOpen, withLabel }: ChildrenProps) => {
    return (
      <Button icon={<CloudUploadIcon />} type="text" size="small" onClick={() => setOpen(true)}>
        {withLabel && <T>pick/upload image</T>}
      </Button>
    );
  });
  
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
