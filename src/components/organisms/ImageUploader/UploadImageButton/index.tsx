import React, { Dispatch, MutableRefObject, ReactNode, useState } from 'react';
import { Button, CloudUploadIcon, T, Tooltip } from '../../../atoms';
import { ImageUploaderModal, onPickImageUrlType } from '../ImageUploaderModal';

type ChildrenProps = { open: boolean, setOpen: Dispatch<boolean>, withLabel: boolean };

interface UploadImageButtonProps {
  isOpenRef?: MutableRefObject<boolean>,
  withLabel?: boolean,
  copyButtons?: boolean,
  onPickImageUrl?: onPickImageUrlType,
  children?: (props: ChildrenProps) => ReactNode
}

export const UploadImageButton = (props: UploadImageButtonProps) => {
  
  const {
    isOpenRef,
    withLabel = false,
    copyButtons,
    onPickImageUrl,
    children: _children,
  } = props;
  
  const [ open, setOpen ] = useState(false);
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
      <Tooltip
        content={<T className="ws-np tt-se">upload image</T>}
        placement="bottom"
        visible={withLabel ? false : undefined}
      >
        <div>
          {children({ open, setOpen, withLabel })}
        </div>
      </Tooltip>
      <ImageUploaderModal
        isOpen={open}
        onClose={() => setOpen(false)}
        copyButtons={copyButtons}
        onPickImageUrl={onPickImageUrl}
      />
    </>
  );
};
