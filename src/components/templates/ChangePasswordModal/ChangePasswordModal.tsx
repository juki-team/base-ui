import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from '@juki-team/commons';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { classNames } from '../../../helpers';
import { useJukiUI, useJukiUser } from '../../../hooks';
import { BasicModalProps, InputPassword, Modal, T } from '../../atoms';
import { ButtonLoader, SetLoaderStatusOnClickType } from '../../molecules';
import { ProfileChangePasswordInput } from './types';

const profileSettingsChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string()
    .required('required in order to update the password'),
  newPassword: yup.string()
    .required('cannot be empty')
    .min(8, 'password must be at least 8 characters')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?"()-_]{8,}$/,
      'must have at least one uppercase, one lowercase letter and one number'),
  newPasswordConfirmation: yup.string()
    .required('cannot be empty')
    .oneOf([ yup.ref('newPassword'), '' ], 'both passwords must match'),
});

export const ChangePasswordModal = ({ isOpen, onClose }: BasicModalProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<ProfileChangePasswordInput>({
    resolver: yupResolver(profileSettingsChangePasswordSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });
  
  const { updatePassword } = useJukiUser();
  const { viewPortSize } = useJukiUI();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <Modal
      isOpen={isOpen}
      className="wh-ao"
      onClose={onClose}
      closeIcon={false}
    >
      <div className="jk-pad-md jk-col gap stretch change-password-modal">
        <div className="jk-row">
          <h2>update password</h2>
        </div>
        <form
          onSubmit={handleSubmit((data: ProfileChangePasswordInput) => updatePassword({
            body: {
              newPassword: data.newPassword,
              oldPassword: data.oldPassword,
            },
            setLoader: setLoaderRef.current!,
            onSuccess: () => onClose(() => () => Status.SUCCESS, Status.SUCCESS, {}),
          }))}
        >
          <div className="jk-form-item">
            <InputPassword
              extend
              labelPlacement="top"
              label={<T className="tt-se">password</T>}
              register={register('oldPassword')}
              className={classNames({
                error: !!errors?.oldPassword?.message,
                success: !!touchedFields.oldPassword && !errors?.oldPassword?.message,
              })}
              required
            />
            <p><T>{errors.oldPassword?.message || ''}</T></p>
          </div>
          <div className="jk-form-item">
            <InputPassword
              extend
              labelPlacement="top"
              label={<T className="tt-se">new password</T>}
              register={register('newPassword')}
              className={classNames({
                error: !!errors?.newPassword?.message,
                success: !!touchedFields.newPassword && !errors?.newPassword?.message,
              })}
              required
            />
            <p><T>{errors.newPassword?.message || ''}</T></p>
          </div>
          <div className="jk-form-item">
            <InputPassword
              extend
              labelPlacement="top"
              label={<T className="tt-se">confirm new password</T>}
              register={register('newPasswordConfirmation')}
              className={classNames({
                error: !!errors?.newPasswordConfirmation?.message,
                success: !!touchedFields.newPasswordConfirmation && !errors?.newPasswordConfirmation?.message,
              })}
              required
            />
            <p><T>{errors.newPasswordConfirmation?.message || ''}</T></p>
          </div>
          <div
            className={classNames('gap block', {
              'jk-row': viewPortSize !== 'sm',
              'jk-col': viewPortSize === 'sm',
            })}
          >
            <ButtonLoader type="light" onClick={onClose} extend>
              <T>cancel</T>
            </ButtonLoader>
            <ButtonLoader
              type="primary"
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isValid}
              submit
              extend
            >
              <T className="ws-np">update</T>
            </ButtonLoader>
          </div>
        </form>
      </div>
    </Modal>
  );
};
