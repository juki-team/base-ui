import { yupResolver } from '@hookform/resolvers/yup';
// import { consoleWarn } from '@juki-team/commons';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  ButtonLoader,
  Input,
  InputCheckbox,
  InputPassword,
  JukiLaptopImage,
  SetLoaderStatusOnClickType,
  SplitModal,
  T,
} from '../../components';
import { ALPHANUMERIC_DASH_UNDERSCORE_REGEX, LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX } from '../../constants';
import { classNames } from '../../helpers';
import { SignUpFormType, SignUpModalComponentProps } from './types';

const signUpSchema = yup.object().shape({
  givenName: yup.string()
    .required('cannot be empty')
    .min(3, 'must be at least 3 characters'),
  familyName: yup.string()
    .required('cannot be empty')
    .min(3, 'must be at least 3 characters'),
  email: yup.string()
    .required('cannot be empty')
    .email('must be a valid email'),
  checkbox: yup.boolean()
    .required('you must accept the terms of service')
    .oneOf([true], 'you must accept the terms of service'),
  nickname: yup.string()
    .required('cannot be empty')
    .matches(ALPHANUMERIC_DASH_UNDERSCORE_REGEX, 'only alphanumeric characters or dash or underscore is valid')
    .min(3, 'must be at least 3 characters'),
  password: yup.string()
    .required('cannot be empty')
    .min(8, 'must be at least 8 characters')
    .matches(LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX,
      'must have at least one uppercase, one lowercase letter and one number'),
  passwordConfirmation: yup.string()
    .required('cannot be empty')
    .oneOf([yup.ref('password'), ''], 'both passwords must match'),
});

export const SignUpModalComponent = ({
  onClose,
  onSubmit,
  signUpWithGoogle,
  reactAppGoogleClientId,
}: SignUpModalComponentProps) => {
  
  const { register, handleSubmit, formState: { errors, isValid, touchedFields }, control } = useForm<SignUpFormType>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  // const refSetLoading = useRef<SetLoaderStatusOnClickType>();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  // const { t } = useT();
  
  console.log({ errors, isValid, touchedFields });
  
  return (
    <SplitModal
      isOpen={true}
      onClose={onClose}
      className="modal-sign-up"
      title={
        <>
          <h3><T className="tt-se cr-g1">sign up</T></h3>
          <p className="tx-h"><T className="tt-se">happy you join us</T></p>
        </>
      }
      graphic={<JukiLaptopImage />}
    >
      <div className="jk-col stretch">
        {signUpWithGoogle && reactAppGoogleClientId && (
          <>
            {/*<GoogleLogin*/}
            {/*  clientId={reactAppGoogleClientId}*/}
            {/*  onSuccess={signUpWithGoogle(refSetLoading.current)}*/}
            {/*  onFailure={(err) => consoleWarn({ message: 'FAILURE GOOGLE LOGIN', err })}*/}
            {/*  cookiePolicy="single_host_origin"*/}
            {/*  buttonText={t('sign up with Google')}*/}
            {/*  className="google-button"*/}
            {/*/>*/}
            <div className="jk-divider"><T>or</T></div>
          </>
        )}
        <form onSubmit={handleSubmit((data: SignUpFormType) => onSubmit(data, setLoaderRef.current!))}>
          <div className="jk-col stretch">
            <div className="jk-row gap block">
              <div className="jk-form-item">
                <label>
                  <T>first name</T>
                  <Input
                    register={{ ...register('givenName') }}
                    className={classNames({
                      error: !!errors?.givenName?.message,
                      success: !!touchedFields.givenName && !errors?.givenName?.message,
                    })}
                  />
                </label>
                <p><T>{errors?.givenName?.message || ''}</T></p>
              </div>
              <div className="jk-form-item">
                <label>
                  <T>last name</T>
                  <Input
                    register={register('familyName')}
                    className={classNames({
                      error: !!errors?.familyName?.message,
                      success: !!touchedFields.familyName && !errors?.familyName?.message,
                    })}
                  />
                </label>
                <p><T>{errors.familyName?.message || ''}</T></p>
              </div>
            </div>
            <div className="jk-form-item">
              <label>
                <T>nickname</T>
                <Input
                  register={register('nickname')}
                  className={classNames({
                    error: !!errors?.nickname?.message,
                    success: !!touchedFields.nickname && !errors?.nickname?.message,
                  })}
                />
              </label>
              <p><T>{(!isValid && errors?.nickname?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <label>
                <T>e-mail address</T>
                <Input
                  register={register('email')}
                  className={classNames({
                    error: !!errors?.email?.message,
                    success: !!touchedFields.email && !errors?.email?.message,
                  })}
                />
              </label>
              <p><T>{(!isValid && errors?.email?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <p><T>minimum 8 characters</T></p>
              <label>
                <T>password</T>
                <InputPassword
                  register={register('password')}
                  className={classNames({
                    error: !!errors?.password?.message,
                    success: !!touchedFields.password && !errors?.password?.message,
                  })}
                />
              </label>
              <p><T>{(!isValid && errors?.password?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <label>
                <T>confirm password</T>
                <InputPassword
                  register={register('passwordConfirmation')}
                  className={classNames({
                    error: !!errors?.passwordConfirmation?.message,
                    success: !!touchedFields.passwordConfirmation && !errors?.passwordConfirmation?.message,
                  })}
                />
              </label>
              <p><T>{(!isValid && errors?.passwordConfirmation?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <Controller
                control={control}
                name="checkbox"
                defaultValue={false}
                render={({ field: { value, ...field } }) => {
                  return (
                    <InputCheckbox
                      {...field}
                      checked={value}
                      label={<T>I accept the Terms of Service and Privacy Policy</T>}
                    />
                  );
                }}
              />
              <p><T>{(!isValid && errors?.checkbox?.message) || ''}</T></p>
            </div>
            <div className="jk-row-col gap block">
              <ButtonLoader type="light" onClick={onClose}>
                <T>cancel</T>
              </ButtonLoader>
              <ButtonLoader
                type="primary"
                setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
                disabled={!isValid}
                submit
              >
                <T className="ws-np">sign up</T>
              </ButtonLoader>
            </div>
          </div>
        </form>
      </div>
    </SplitModal>
  );
};
