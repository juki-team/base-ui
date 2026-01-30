import { yupResolver } from '@hookform/resolvers/yup';
import { CompanyTrustedCompanyResponseDTO, ContentResponseType } from '@juki-team/commons';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { jukiApiManager } from '../../../../../settings';
import { useUIStore } from '../../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { Input, InputPassword, InputSelect, T } from '../../../../atoms';
import { InfoIIcon } from '../../../../atoms/server';
import { classNames } from '../../../../helpers';
import { useFetcher } from '../../../../hooks/useFetcher';
import { ButtonLoader, SplitModal } from '../../../../molecules';
import { SetLoaderStatusOnClickType } from '../../../../types';
import type { LoginFormType, LoginModalTemplateProps } from './types';

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
    multiCompanies,
    openForgotPasswordModal,
    setOpenForgotPasswordModal,
  } = props;
  
  const { Image } = useUIStore(store => store.components);
  const companyKey = useUserStore(store => store.company.key);
  const {
    handleSubmit,
    formState: { isValid, errors, touchedFields },
    register,
    reset,
    setValue,
    getValues,
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginMultiCompaniesSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  useEffect(() => {
    reset({ companyKey });
  }, [ isOpen, reset, companyKey ]);
  
  // const { t } = useT();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  const { data } = useFetcher<ContentResponseType<CompanyTrustedCompanyResponseDTO[]>>(jukiApiManager.API_V2.company.getTrustedCompaniesList().url);
  
  const trustedCompanies = data?.success ? data.content : [];
  
  return (
    <SplitModal
      isOpen={isOpen && !openForgotPasswordModal}
      onClose={onClose}
      className="modal-login"
      title={
        <>
          <h3><T className="tt-se cr-at-it">login</T></h3>
          <p className="tx-h"><T className="tt-se">Nice see you again!</T></p>
        </>
      }
      graphic={
        <Image
          alt="Juki with laptop image"
          fill
          src="https://images.juki.pub/assets/juki-image-laptop.png"
          className="image-border"
        />
      }
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
            {!!trustedCompanies.length && (
              <div className="jk-row gap nowrap">
                <InputSelect
                  label={<T className="tt-se">platform</T>}
                  labelPlacement="left"
                  options={trustedCompanies.map(({ name, key }) => ({ label: name, value: key }))}
                  selectedOption={{ value: getValues('companyKey') }}
                  onChange={({ value }) => {
                    setValue('companyKey', value, { shouldTouch: true, shouldValidate: true });
                  }}
                  expand
                />
                <div
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-place="top-end"
                  data-tooltip-content="choose the platform you want to use to sign in"
                  className="jk-row"
                >
                  <InfoIIcon filledCircle className="cr-at" />
                </div>
              </div>
            )}
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
                <div
                  className="link"
                  data-tour-key="forgot-password"
                  onClick={() => setOpenForgotPasswordModal(true)}
                >
                  <T className="forgot-password-label tt-se">
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
  );
};
