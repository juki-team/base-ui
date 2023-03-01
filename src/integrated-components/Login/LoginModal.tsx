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
  // useT,
} from '../../components';
import { classNames } from '../../helpers';
import { useJukiUI } from '../../hooks';
import { LoginFormType, LoginModalComponentProps } from '../Login';
import { ForgotPasswordModal } from '../ForgotPassword';

const loginSchema = yup.object().shape({
  nickname: yup.string()
    .required('cannot be empty'),
  password: yup.string()
    .required('cannot be empty'),
});

export const LoginModalComponent = ({
  onClose,
  onSignUpButton,
  onSubmit,
  loginWithGoogle,
  reactAppGoogleClientId,
  highlightForgotPassword,
}: LoginModalComponentProps) => {
  
  const { handleSubmit, formState: { isValid, errors }, register } = useForm<LoginFormType>({
    resolver: yupResolver(loginSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  // const { t } = useT();
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  const { viewPortSize } = useJukiUI();
  
  return (
    <>
      {openForgotPasswordModal && (
        <ForgotPasswordModal
          onClose={() => setOpenForgotPasswordModal(false)}
        />
      )}
      <SplitModal
        isOpen={!openForgotPasswordModal}
        onClose={onClose}
        className="modal-login"
        title={
          <>
            <h3><T className="tt-se cr-g1">login</T></h3>
            <p className="tx-h"><T className="tt-se">Nice see you again!</T></p>
          </>
        }
        graphic={<JukiLaptopImage />}
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
                <label>
                  <T>nickname</T>
                  <Input register={register('nickname')} />
                </label>
                <p><T>{(!isValid && errors?.nickname?.message) || ''}</T></p>
              </div>
              <div className="jk-form-item">
                <p className="link" onClick={() => setOpenForgotPasswordModal(true)}>
                  <T className={classNames('forgot-password-label', { 'fw-br': !!highlightForgotPassword })}>
                    forgot password?
                  </T>
                </p>
                <label>
                  <T>password</T>
                  <InputPassword register={register('password')} />
                </label>
                <p><T>{errors?.password?.message || ''}</T></p>
              </div>
              <div className="jk-col gap stretch">
                <div>
                  <p className="label">
                    <T className="tt-se">not a member?</T>,&nbsp;
                    <span className="link" onClick={onSignUpButton}><T>sign up now</T></span>
                  </p>
                </div>
                <div className={classNames('jk-row gap block', { nowrap: viewPortSize !== 'sm' })}>
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
