import React, { MutableRefObject, useState } from 'react';
import { Button, CloudUploadIcon, ImageUploaderModal, Popover, T } from '../../index';

export const UploadImageButton = ({ isOpenRef, withLabel }: { isOpenRef: MutableRefObject<boolean>, withLabel: boolean }) => {
  
  const [open, setOpen] = useState(false);
  isOpenRef.current = open;
  
  return (
    <>
      <Popover
        content={<T className="ws-np tt-se">upload image</T>}
        placement="bottom"
        visible={withLabel ? false : undefined}
        showPopperArrow
      >
        <div>
          <Button icon={<CloudUploadIcon />} type="text" size="small" onClick={() => setOpen(true)}>
            {withLabel && <T>upload image</T>}
          </Button>
        </div>
      </Popover>
      <ImageUploaderModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
