import { yupResolver } from '@hookform/resolvers/yup';
import type { OrganizationTrustedOrganizationResponseDTO } from '@juki-team/commons/dto';
import type { ContentResponse } from '@juki-team/commons/types';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { object as yupObject, string as yupString } from 'yup';
import { jukiApiManager } from '../../../../../settings';
import { useUIStore } from '../../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { Div } from '../../../../atoms/Div/Div';
import { Input } from '../../../../atoms/Input/Input';
import { InputPassword } from '../../../../atoms/InputPassword/InputPassword';
import { InputSelect } from '../../../../atoms/InputSelect/InputSelect';
import { T } from '../../../../atoms/T/T';
import { InfoIIcon } from '../../../../atoms/server/icons/google/InfoIIcon';
import { classNames } from '../../../../helpers/commons';
import { useFetcher } from '../../../../hooks/useFetcher';
import { ButtonLoader } from '../../../../molecules/ButtonLoader/ButtonLoader';
import { SplitModal } from '../../../../molecules/SplitModal/SplitModal';
import type { SetLoaderStatusOnClickType } from '../../../../types';
import type { LoginFormType, LoginModalTemplateProps } from './types';

const loginMultiCompaniesSchema = yupObject().shape({
  nickname: yupString().required('cannot be empty'),
  password: yupString().required('cannot be empty'),
  organizationKey: yupString().required('cannot be empty'),
});

export const LoginModalTemplate = (props: LoginModalTemplateProps) => {
  const {
    isOpen,
    onClose,
    onSignUpButton,
    onSubmit,
    loginWithGoogle,
    reactAppGoogleClientId,
    multiOrganizations,
    openForgotPasswordModal,
    setOpenForgotPasswordModal,
  } = props;

  const { Image } = useUIStore((store) => store.components);
  const organizationKey = useUserStore((store) => store.organization?.key ?? '');
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: isOpen is a trigger to reset the form on every open
  useEffect(() => {
    reset({ organizationKey });
  }, [isOpen, reset, organizationKey]);

  // const { t } = useT();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);

  const { data } = useFetcher<ContentResponse<OrganizationTrustedOrganizationResponseDTO[]>>(
    jukiApiManager.apiV2.organization.getTrustedCompaniesList().url,
  );

  const trustedOrganizations = data?.success ? data.content : [];

  return (
    <SplitModal
      isOpen={isOpen && !openForgotPasswordModal}
      onClose={onClose}
      title={
        <>
          <h3>
            <T className="tt-se cr-at-it">login</T>
          </h3>
          <p className="tx-h">
            <T className="tt-se">Nice see you again!</T>
          </p>
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
            <div className="jk-divider">
              <T>or</T>
            </div>
          </>
        )}
        <form onSubmit={handleSubmit((data: LoginFormType) => onSubmit(data, setLoaderRef.current ?? (() => undefined)))}>
          <div className="jk-col stretch">
            {!!trustedOrganizations.length && (
              <div className="jk-row gap nowrap">
                <InputSelect
                  label={<T className="tt-se">platform</T>}
                  labelPlacement="left"
                  options={trustedOrganizations.map(({ name, key }) => ({ label: name, value: key }))}
                  selectedOption={{ value: getValues('organizationKey') }}
                  onChange={({ value }) => {
                    setValue('organizationKey', value, { shouldTouch: true, shouldValidate: true });
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
            {multiOrganizations && (
              <div className="jk-form-item">
                <Input
                  labelPlacement="top"
                  label={<T className="tt-se">company key</T>}
                  register={register('organizationKey')}
                  className={classNames({
                    error: !!errors?.organizationKey?.message,
                    success: !!touchedFields.organizationKey && !errors?.organizationKey?.message,
                  })}
                  expand
                  required
                />
                <p>
                  <T>{(!isValid && errors?.organizationKey?.message) || ''}</T>
                </p>
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
              <p>
                <T>{(!isValid && errors?.nickname?.message) || ''}</T>
              </p>
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
              <p>
                <T>{errors?.password?.message || ''}</T>
              </p>
            </div>
            <div className="jk-col gap stretch">
              <div className="jk-row left">
                <Div
                  className="link"
                  data-tour-key="forgot-password"
                  onClick={() => setOpenForgotPasswordModal(true)}
                  onKeyDownClick
                >
                  <T className="tt-se">forgot password?</T>
                </Div>
              </div>
              {!multiOrganizations && (
                <div>
                  <p className="label">
                    <T className="tt-se">not a member?</T>,&nbsp;
                    <button type="button" className="link" onClick={onSignUpButton}>
                      <T>sign up now</T>
                    </button>
                  </p>
                </div>
              )}
              <div className="jk-row-col gap block">
                <ButtonLoader type="secondary" onClick={onClose}>
                  <T className="tt-se">cancel</T>
                </ButtonLoader>
                <ButtonLoader disabled={!isValid} setLoaderStatusRef={(setLoader) => (setLoaderRef.current = setLoader)} submit>
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
