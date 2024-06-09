import React, { useEffect, useState } from 'react';
import { classNames } from '../../../../../helpers';
import { Input, JukiLaptopImage, T } from '../../../../atoms';
import { ButtonLoader, SplitModal } from '../../../../molecules';
import { ForgotPasswordModalProps } from './types';

export const ForgotPasswordModalComponent = ({ isOpen, onClose, onForgotPassword }: ForgotPasswordModalProps) => {
  
  const [ email, setEmail ] = useState('');
  const [ touched, setTouched ] = useState(false);
  useEffect(() => {
    if (!touched && email) {
      setTouched(true);
    }
  }, [ email, touched ]);
  const disabled = !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
  
  return (
    <SplitModal
      isOpen={isOpen}
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
          <Input
            labelPlacement="top"
            label={<T className="tt-se">email</T>}
            name="email"
            value={email}
            onChange={(value) => setEmail(value)}
            type="email"
            extend
            className={classNames({
              error: touched && disabled,
              success: touched && !disabled,
            })}
            onBlur={() => setTouched(true)}
            required
          />
          <p><T>{(touched && disabled) ? 'must be a valid email' : ''}</T></p>
        </div>
        <div className="jk-row-col gap block">
          <ButtonLoader type="light" onClick={onClose}><T>cancel</T></ButtonLoader>
          <ButtonLoader
            type="primary"
            onClick={(setLoading) => onForgotPassword(email, setLoading!)}
            disabled={disabled}
            submit
          >
            <T className="ws-np">send me</T>
          </ButtonLoader>
        </div>
      </div>
    </SplitModal>
  );
};
