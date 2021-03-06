import { yupResolver } from '@hookform/resolvers/yup';
import { consoleWarn } from '@juki-team/commons';
import React, { useRef, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonLoader, Input, InputPassword, JukiLaptopImage, SetLoaderStatusOnClickType, T, useT } from '../../index';
import { ForgotPasswordModal } from '../ForgotPassword';
import { SplitModal } from '../SplitModal';
import { LoginInputType, LoginModalProps } from './types';

const loginSchema = yup.object().shape({
  nickname: yup.string()
    .required('cannot be empty'),
  password: yup.string()
    .required('cannot be empty'),
});

export const LoginModal = ({
  onCancel,
  onSignUpButton,
  onSubmit,
  loginWithGoogle,
  onForgotPassword,
  reactAppGoogleClientId,
}: LoginModalProps) => {
  
  const { handleSubmit, formState: { isValid, errors }, register } = useForm<LoginInputType>({
    resolver: yupResolver(loginSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  const { t } = useT();
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <>
      {onForgotPassword && openForgotPasswordModal && (
        <ForgotPasswordModal
          onCancel={() => setOpenForgotPasswordModal(false)}
          onForgotPassword={onForgotPassword}
        />
      )}
      <SplitModal
        isOpen={true}
        onClose={onCancel}
        className="modal-login"
        title={
          <>
            <p className="text-xh tx-wd-bolder"><T className="text-sentence-case">login</T></p>
            <p className="text-h"><T className="text-sentence-case">Nice see you again!</T></p>
          </>
        }
        graphic={<JukiLaptopImage />}
      >
        <div className="jk-col stretch">
          {loginWithGoogle && reactAppGoogleClientId && (
            <>
              <GoogleLogin
                clientId={reactAppGoogleClientId}
                onSuccess={loginWithGoogle(setLoaderRef.current)}
                onFailure={(err) => consoleWarn({ message: 'FAILURE GOOGLE LOGIN', err })}
                cookiePolicy="single_host_origin"
                buttonText={t('login with Google')}
                className="google-button"
              />
              <div className="jk-divider"><T>or</T></div>
            </>
          )}
          <form onSubmit={handleSubmit((data: LoginInputType) => onSubmit(data, setLoaderRef.current!))}>
            <div className="jk-col gap stretch">
              <div className="jk-form-item">
                <label>
                  <T>nickname</T>
                  <Input register={register('nickname')} />
                </label>
                <p><T>{(!isValid && errors?.nickname?.message) || ''}</T></p>
              </div>
              <div className="jk-form-item">
                {onForgotPassword && (
                  <p className="link" onClick={() => setOpenForgotPasswordModal(true)}>
                    <T>Forgot password?</T>
                  </p>
                )}
                <label>
                  <T>password</T>
                  <InputPassword register={register('password')} />
                </label>
                <p><T>{errors?.password?.message || ''}</T></p>
              </div>
              <div>
                <p className="label">
                  <T>Not a member?</T>,&nbsp;
                  <span className="link" onClick={onSignUpButton}><T>sign up now</T></span>
                </p>
              </div>
              <div className="jk-row gap right">
                <ButtonLoader type="text" onClick={onCancel}>
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
          </form>
        </div>
      </SplitModal>
    </>
  );
};

export * from './types';
