import React, { useState } from 'react';
import { Button, ButtonLoader, Input, JukiLaptopImage, SplitModal, T } from '../../components';
import { classNames } from '../../helpers';
import { useJukiUI } from '../../hooks';
import { ForgotPasswordModalProps } from './types';

export const ForgotPasswordModalComponent = ({ onCancel, onForgotPassword }: ForgotPasswordModalProps) => {
  
  const [email, setEmail] = useState('');
  const { viewPortSize } = useJukiUI();
  return (
    <SplitModal
      isOpen={true}
      onClose={onCancel}
      className="modal-login"
      title={
        <>
          <h3><T className="cr-g1">recover your account</T></h3>
        </>
      }
      graphic={<JukiLaptopImage />}
    >
      <div className="jk-col gap stretch extend">
        <div className="jk-row left">
          <T className="tt-se">
            enter your email, if the user exists, you will shortly receive an email with reset instructions
          </T>
        </div>
        <Input name="email" value={email} onChange={(value) => setEmail(value)} type="email" extend />
        <div className={classNames('jk-row gap right', { nowrap: viewPortSize !== 'sm' })}>
          <Button type="outline" onClick={onCancel} extend={viewPortSize === 'sm'}><T>cancel</T></Button>
          <ButtonLoader
            type="primary"
            onClick={(setLoading) => onForgotPassword(email, setLoading!)}
            disabled={!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)}
            submit
            extend={viewPortSize === 'sm'}
          >
            <T className="ws-np">send me</T>
          </ButtonLoader>
        </div>
      </div>
    </SplitModal>
  );
};
