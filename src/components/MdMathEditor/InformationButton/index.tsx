import React, { MutableRefObject, useEffect, useState } from 'react';
import { SAMPLE_MD_CONTENT } from '../../../constants';
import { Button, ExclamationIcon, Modal, Popover, T } from '../../index';
import { MdMathEditor } from '../index';

export const InformationButton = ({ isOpenRef, withLabel }: { isOpenRef: MutableRefObject<boolean>, withLabel: boolean }) => {
  
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState(SAMPLE_MD_CONTENT);
  useEffect(() => setSource(SAMPLE_MD_CONTENT), [open]);
  isOpenRef.current = open;
  
  return (
    <>
      <Popover content={<T className="ws-np tt-se">information</T>} placement="bottom" showPopperArrow popoverClassName="">
        <div>
          <Button icon={<ExclamationIcon circle rotate={180} />} type="text" size="small" onClick={() => setOpen(true)}>
            {withLabel && <T>information</T>}
          </Button>
        </div>
      </Popover>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="modal-info-markdown"
        closeIcon
        closeWhenClickOutside
      >
        <MdMathEditor source={source} onChange={setSource} />
      </Modal>
    </>
  );
};
