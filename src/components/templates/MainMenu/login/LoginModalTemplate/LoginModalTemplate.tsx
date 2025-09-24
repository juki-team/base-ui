import { yupResolver } from '@hookform/resolvers/yup';
// import { consoleWarn } from '@juki-team/commons';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { classNames } from '../../../../../helpers';
import { Input, InputPassword, T } from '../../../../atoms';
import { ButtonLoader, SplitModal } from '../../../../molecules';
import { JukiLaptopImage } from '../../../../server';
import { SetLoaderStatusOnClickType } from '../../../../types';
import { ForgotPasswordModal } from './ForgotPassword';
import type { LoginFormType, LoginModalTemplateProps } from './types';

const loginSchema = yup.object().shape({
  nickname: yup.string()
    .required('cannot be empty'),
  password: yup.string()
    .required('cannot be empty'),
});

const loginMultiCompaniesSchema = yup.object().shape({
  nickname: yup.string()
    .required('cannot be empty'),
  password: yup.string()
    .required('cannot be empty'),
  companyKey: yup.string()
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
    multiCompanies,
  } = props;
  
  const { handleSubmit, formState: { isValid, errors, touchedFields }, register, reset } = useForm<LoginFormType>({
    resolver: yupResolver(multiCompanies ? loginMultiCompaniesSchema : loginSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  useEffect(() => {
    reset();
  }, [ isOpen, reset ]);
  
  // const { t } = useT();
  const [ openForgotPasswordModal, setOpenForgotPasswordModal ] = useState(false);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
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
            <h3><T className="tt-se cr-pt">login</T></h3>
            <p className="tx-h"><T className="tt-se">Nice see you again!</T></p>
          </>
        }
        graphic={<JukiLaptopImage />}
        expand
      >
        <div className="jk-col stretch">
          {loginWithGoogle && reactAppGoogleClientId && (
            <>
              {/*<GoogleLogin*/}
              {/*  clientId={reactAppGoogleClientId}*/}
              {/*  onSuccess={loginWithGoogle(setLoaderRef.current)}*/}
              {/*  onFailure={(err) => consoleWarn('failure google login ', { err })}*/}
              {/*  cookiePolicy="single_host_origin"*/}
              {/*  buttonText={t('login with Google')}*/}
              {/*  className="google-button"*/}
              {/*/>*/}
              <div className="jk-divider"><T>or</T></div>
            </>
          )}
          <form onSubmit={handleSubmit((data: LoginFormType) => onSubmit(data, setLoaderRef.current!))}>
            <div className="jk-col stretch">
              {multiCompanies && (
                <div className="jk-form-item">
                  <Input
                    labelPlacement="top"
                    label={<T className="tt-se">company key</T>}
                    register={register('companyKey')}
                    className={classNames({
                      error: !!errors?.companyKey?.message,
                      success: !!touchedFields.companyKey && !errors?.companyKey?.message,
                    })}
                    expand
                    required
                  />
                  <p><T>{(!isValid && errors?.companyKey?.message) || ''}</T></p>
                </div>
              )}
              <div className="jk-form-item">
                <Input
                  labelPlacement="top"
                  label={<T className="tt-se">nickname</T>}
                  register={register('nickname')}
                  className={classNames({
                    error: !!errors?.nickname?.message,
                    success: !!touchedFields.nickname && !errors?.nickname?.message,
                  })}
                  expand
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
                  expand
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
                {!multiCompanies && (
                  <div>
                    <p className="label">
                      <T className="tt-se">not a member?</T>,&nbsp;
                      <span className="link" onClick={onSignUpButton}><T>sign up now</T></span>
                    </p>
                  </div>
                )}
                <div className="jk-row-col gap block">
                  <ButtonLoader type="light" onClick={onClose}>
                    <T className="tt-se">cancel</T>
                  </ButtonLoader>
                  <ButtonLoader
                    type="primary"
                    disabled={!isValid}
                    setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
                    submit
                  >
                    <T className="tt-se">login</T>
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
