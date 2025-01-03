import { Status } from '@juki-team/commons';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { classNames } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { ExclamationIcon, Modal, T } from '../../atoms';
import { ButtonLoader } from '../ButtonLoader';
import { SetLoaderStatusOnClickType } from '../ButtonLoader/types';
import { TwoActionModalProps } from './types';

export const TwoActionModal = (props: PropsWithChildren<TwoActionModalProps>) => {
  
  const { isOpen, secondary, primary, title, children, onClose, containerClassName, ...rest } = props;
  const [ loader, setLoader ] = useState<Status>(Status.NONE);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  const { viewPortSize } = useJukiUI();
  
  return (
    <Modal
      isOpen={isOpen}
      containerClassName={classNames(containerClassName, 'modal-alert')}
      onClose={onClose}
      setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
      onLoaderStatusChange={setLoader}
      {...rest}
    >
      <div className="modal-alert-title cr-py">
        <ExclamationIcon filledCircle className="cr-er" size="large" />
        <h3 className="cr-er">
          {title}
        </h3>
      </div>
      <div className="modal-alert-content">
        {children}
      </div>
      <div className={classNames('modal-alert-actions jk-row-col gap right', { nowrap: viewPortSize !== 'sm' })}>
        {secondary && (
          <ButtonLoader
            onClick={secondary.onClick}
            disabled={secondary.disabled || loader === Status.LOADING}
            type="light"
            expand={viewPortSize === 'sm'}
          >
            {secondary.label || <T>cancel</T>}
          </ButtonLoader>
        )}
        <ButtonLoader
          onClick={primary.onClick}
          disabled={primary.disabled || loader === Status.LOADING}
          expand={viewPortSize === 'sm'}
        >
          {primary.label || <T>ok</T>}
        </ButtonLoader>
      </div>
    </Modal>
  );
};
