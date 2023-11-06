import React, { MutableRefObject, useEffect, useState } from 'react';
import { Button, ExclamationIcon, Modal, SAMPLE_MD_CONTENT, T, Tooltip } from '../../../../index';
import { MdMathEditor } from '../index';

export const InformationButton = ({ isOpenRef, withLabel }: {
  isOpenRef: MutableRefObject<boolean>,
  withLabel: boolean
}) => {
  
  const [ open, setOpen ] = useState(false);
  const [ source, setSource ] = useState(SAMPLE_MD_CONTENT);
  useEffect(() => setSource(SAMPLE_MD_CONTENT), [ open ]);
  isOpenRef.current = open;
  
  return (
    <>
      <Tooltip
        content={<T className="ws-np tt-se">information</T>}
        placement="bottom"
        visible={withLabel ? false : undefined}
      >
        <div>
          <Button icon={<ExclamationIcon circle rotate={180} />} type="text" size="small" onClick={() => setOpen(true)}>
            {withLabel && <T>information</T>}
          </Button>
        </div>
      </Tooltip>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="modal-info-markdown"
        closeWhenClickOutside
      >
        <MdMathEditor source={source} onChange={setSource} />
      </Modal>
    </>
  );
};
