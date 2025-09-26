import { Button, T } from '../../atoms';
import { CloudUploadIcon } from '../../atoms/server';
import { ImageUploaderModal } from '../ImageUploaderModal/ImageUploaderModal';
import type { UploadImageButtonChildrenProps, UploadImageButtonProps } from '../ImageUploaderModal/types';

export function ImageUploaderButton(props: UploadImageButtonProps) {
  
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
}
