import React, { Dispatch, MutableRefObject, ReactNode, useState } from 'react';
import { Button, T } from '../../../atoms';
import { CloudUploadIcon } from '../../../server';
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
