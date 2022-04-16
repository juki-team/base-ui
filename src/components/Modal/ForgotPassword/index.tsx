import React, { useState } from 'react';
import { ButtonLoader, Input, T } from '../../index';
import { Modal } from '../Modal';
import { ForgotPasswordModalProps } from './types';

// TODO Fix Forgot password modal
export const ForgotPasswordModal = ({ onCancel, onForgotPassword }: ForgotPasswordModalProps) => {
  
  const [email, setEmail] = useState('');
  
  return (
    <Modal isOpen={true} className="modal-forgot-password" onClose={onCancel}>
      <div className="jk-side-main">
        <h5><T>recover your account</T></h5>
        <p>
          <T>enter your email, our team will send you an email with your new password, once you enter we suggest you change your
            password</T>
        </p>
        <form>
          <Input name="email" value={email} onChange={(value) => setEmail(value)} type="email" block />
          <div className="actions">
            <ButtonLoader
              type="primary"
              onClick={(setLoading) => onForgotPassword(email, setLoading!)}
              disabled={!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)}
              submit
            >
              <T>send me</T>
            </ButtonLoader>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export * from './types';
