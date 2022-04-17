import React, { MutableRefObject, useState } from 'react';
import { Button, CloudUploadIcon, ImageUploaderModal, Popover, T } from '../../index';

export const UploadImageButton = ({ isOpenRef, withLabel }: { isOpenRef: MutableRefObject<boolean>, withLabel: boolean }) => {
  
  const [open, setOpen] = useState(false);
  isOpenRef.current = open;
  
  return (
    <>
      <Popover
        content={<T className="text-nowrap">upload image</T>}
        triggerOn="hover"
        placement="bottom"
      >
        <div>
          <Button icon={<CloudUploadIcon />} type="text" onClick={() => setOpen(true)}>
            {withLabel && <T>upload image</T>}
          </Button>
        </div>
      </Popover>
      <ImageUploaderModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
