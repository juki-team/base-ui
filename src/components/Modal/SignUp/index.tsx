import { yupResolver } from '@hookform/resolvers/yup';
import { consoleWarn } from '@juki-team/commons';
import React, { useRef } from 'react';
import GoogleLogin from 'react-google-login';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ALPHANUMERIC_DASH_UNDERSCORE_REGEX, LEAST_ONE_UPPERCASE_LOWERCASE_NUMBER_REGEX } from '../../../constants';
import {
  ButtonLoader,
  Input,
  InputCheckbox,
  InputPassword,
  JukiLaptopImage,
  SetLoaderStatusOnClickType,
  T,
  useJukiBase,
  useT,
} from '../../index';
import { SplitModal } from '../SplitModal';
import { SignUpInputType, SignUpModalProps } from './types';

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

export const SignUpModal = ({ onCancel, onSubmit, signUpWithGoogle, reactAppGoogleClientId }: SignUpModalProps) => {
  
  const { register, handleSubmit, formState: { errors, isValid }, control } = useForm<SignUpInputType>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  const refSetLoading = useRef<SetLoaderStatusOnClickType>();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  const { t } = useT();
  const { viewPortSize } = useJukiBase();
  
  return (
    <SplitModal
      isOpen={true}
      onClose={onCancel}
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
            <GoogleLogin
              clientId={reactAppGoogleClientId}
              onSuccess={signUpWithGoogle(refSetLoading.current)}
              onFailure={(err) => consoleWarn({ message: 'FAILURE GOOGLE LOGIN', err })}
              cookiePolicy="single_host_origin"
              buttonText={t('sign up with Google')}
              className="google-button"
            />
            <div className="jk-divider"><T>or</T></div>
          </>
        )}
        <form onSubmit={handleSubmit((data: SignUpInputType) => onSubmit(data, setLoaderRef.current!))}>
          <div className="jk-col gap stretch">
            <div className="jk-row block">
              <div className="jk-form-item">
                <label>
                  <T>first name</T>
                  <Input register={{ ...register('givenName') }} />
                </label>
                <p><T>{(!isValid && errors?.givenName?.message) || ''}</T></p>
              </div>
              <div className="jk-form-item">
                <label>
                  <T>last name</T>
                  <Input register={register('familyName')} />
                </label>
                <p><T>{errors.familyName?.message || ''}</T></p>
              </div>
            </div>
            <div className="jk-form-item">
              <label>
                <T>nickname</T>
                <Input register={register('nickname')} />
              </label>
              <p><T>{(!isValid && errors?.nickname?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <label>
                <T>e-mail address</T>
                <Input register={register('email')} />
              </label>
              <p><T>{(!isValid && errors?.email?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <p><T>minimum 8 characters</T></p>
              <label>
                <T>password</T>
                <InputPassword register={register('password')} />
              </label>
              <p><T>{(!isValid && errors?.password?.message) || ''}</T></p>
            </div>
            <div className="jk-form-item">
              <label>
                <T>confirm password</T>
                <InputPassword register={register('passwordConfirmation')} />
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
            <div className="jk-row gap right">
              <ButtonLoader type="text" onClick={onCancel} extend={viewPortSize === 'sm' || viewPortSize === 'md'}>
                <T>cancel</T>
              </ButtonLoader>
              <ButtonLoader
                type="primary"
                setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
                disabled={!isValid}
                submit
                extend={viewPortSize === 'sm' || viewPortSize === 'md'}
              >
                <T>sign up</T>
              </ButtonLoader>
            </div>
          </div>
        </form>
      </div>
    </SplitModal>
  );
};

export * from './types';
