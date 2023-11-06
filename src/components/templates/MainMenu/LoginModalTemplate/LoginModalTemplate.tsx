import { yupResolver } from '@hookform/resolvers/yup';
// import { consoleWarn } from '@juki-team/commons';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  ButtonLoader,
  Input,
  InputPassword,
  JukiLaptopImage,
  SetLoaderStatusOnClickType,
  SplitModal,
  T,
} from '../../../';
import { classNames } from '../../../../helpers';
import { ForgotPasswordModal } from './ForgotPassword';
import { LoginFormType, LoginModalTemplateProps } from './types';

const loginSchema = yup.object().shape({
  nickname: yup.string()
    .required('cannot be empty'),
  password: yup.string()
    .required('cannot be empty'),
});

export const LoginModalTemplate = (props: LoginModalTemplateProps) => {
  
  const {
    isOpen,
    onClose,
    onSignUpButton,
    onSubmit,
    loginWithGoogle,
    reactAppGoogleClientId,
    highlightForgotPassword,
  } = props;
  
  const { handleSubmit, formState: { isValid, errors, touchedFields }, register } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  // const { t } = useT();
  const [ openForgotPasswordModal, setOpenForgotPasswordModal ] = useState(false);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <>
      <ForgotPasswordModal
        isOpen={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
      />
      <SplitModal
        isOpen={isOpen && !openForgotPasswordModal}
        onClose={onClose}
        className="modal-login"
        title={
          <>
            <h3><T className="tt-se cr-g1">login</T></h3>
            <p className="tx-h"><T className="tt-se">Nice see you again!</T></p>
          </>
        }
        graphic={<JukiLaptopImage />}
        closeWhenKeyEscape
        closeWhenClickOutside
        closeIcon={false}
      >
        <div className="jk-col stretch">
          {loginWithGoogle && reactAppGoogleClientId && (
            <>
              {/*<GoogleLogin*/}
              {/*  clientId={reactAppGoogleClientId}*/}
              {/*  onSuccess={loginWithGoogle(setLoaderRef.current)}*/}
              {/*  onFailure={(err) => consoleWarn({ message: 'FAILURE GOOGLE LOGIN', err })}*/}
              {/*  cookiePolicy="single_host_origin"*/}
              {/*  buttonText={t('login with Google')}*/}
              {/*  className="google-button"*/}
              {/*/>*/}
              <div className="jk-divider"><T>or</T></div>
            </>
          )}
          <form onSubmit={handleSubmit((data: LoginFormType) => onSubmit(data, setLoaderRef.current!))}>
            <div className="jk-col stretch">
              <div className="jk-form-item">
                <Input
                  labelPlacement="top"
                  label={<T className="tt-se">nickname</T>}
                  register={register('nickname')}
                  className={classNames({
                    error: !!errors?.nickname?.message,
                    success: !!touchedFields.nickname && !errors?.nickname?.message,
                  })}
                  extend
                  required
                />
                <p><T>{(!isValid && errors?.nickname?.message) || ''}</T></p>
              </div>
              <div className="jk-form-item">
                <InputPassword
                  labelPlacement="top"
                  label={<T className="tt-se">password</T>}
                  register={register('password')}
                  className={classNames({
                    error: !!errors?.password?.message,
                    success: !!touchedFields.password && !errors?.password?.message,
                  })}
                  extend
                  required
                />
                <p><T>{errors?.password?.message || ''}</T></p>
              </div>
              <div className="jk-col gap stretch">
                <div className="jk-row left">
                  <div className="link" onClick={() => setOpenForgotPasswordModal(true)}>
                    <T className={classNames('forgot-password-label tt-se', { 'fw-br': !!highlightForgotPassword })}>
                      Forgot password?
                    </T>
                  </div>
                </div>
                <div>
                  <p className="label">
                    <T className="tt-se">not a member?</T>,&nbsp;
                    <span className="link" onClick={onSignUpButton}><T>sign up now</T></span>
                  </p>
                </div>
                <div className="jk-row-col gap block">
                  <ButtonLoader type="light" onClick={onClose}>
                    <T>cancel</T>
                  </ButtonLoader>
                  <ButtonLoader
                    type="primary"
                    disabled={!isValid}
                    setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
                    submit
                  >
                    <T>login</T>
                  </ButtonLoader>
                </div>
              </div>
            </div>
          </form>
        </div>
      </SplitModal>
    </>
  );
};
