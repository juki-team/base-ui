import React, { useState } from 'react';
import { ButtonLoader, Input, JukiLaptopImage, SplitModal, T } from '../../components';
import { ForgotPasswordModalProps } from './types';

export const ForgotPasswordModalComponent = ({ onClose, onForgotPassword }: ForgotPasswordModalProps) => {
  
  const [email, setEmail] = useState('');
  
  return (
    <SplitModal
      isOpen={true}
      onClose={onClose}
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
        <div className="jk-form-item">
          <label>
            <T>email</T>
            <Input name="email" value={email} onChange={(value) => setEmail(value)} type="email" extend />
          </label>
        </div>
        <div className="jk-row-col gap right block">
          <ButtonLoader type="light" onClick={onClose}><T>cancel</T></ButtonLoader>
          <ButtonLoader
            type="primary"
            onClick={(setLoading) => onForgotPassword(email, setLoading!)}
            disabled={!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)}
            submit
          >
            <T className="ws-np">send me</T>
          </ButtonLoader>
        </div>
      </div>
    </SplitModal>
  );
};
