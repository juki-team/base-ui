import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from '@juki-team/commons';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { BasicModalProps, ButtonLoader, InputPassword, Modal, SetLoaderStatusOnClickType, T } from '../../components';
import { classNames } from '../../helpers';
import { useJukiUI, useJukiUser } from '../../hooks';

export type ProfileChangePasswordInput = {
  oldPassword: string,
  newPassword: string,
  newPasswordConfirmation: string,
}

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
    .oneOf([yup.ref('newPassword'), ''], 'both passwords must match'),
});

export const ChangePasswordModal = ({ onClose }: BasicModalProps) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ProfileChangePasswordInput>({
    resolver: yupResolver(profileSettingsChangePasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  
  const { updatePassword } = useJukiUser();
  const { viewPortSize } = useJukiUI();
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <Modal
      isOpen={true}
      className="wh-ao"
      onClose={onClose}
    >
      <div className="jk-pad-md jk-col gap stretch">
        <h2>update password</h2>
        <form
          onSubmit={handleSubmit((data: ProfileChangePasswordInput) => updatePassword({
            body: {
              newPassword: data.newPassword,
              oldPassword: data.oldPassword,
            },
            setLoader: setLoaderRef.current!,
            onSuccess: () => onClose(() => () => Status.SUCCESS, [Status.SUCCESS, 0], {}),
          }))}>
          <div className="jk-form-item">
            <label>
              <T>password</T>
              <InputPassword register={register('oldPassword')} />
            </label>
            <p><T>{errors.oldPassword?.message || ''}</T></p>
          </div>
          <div className="jk-form-item">
            <label>
              <T>new password</T>
              <InputPassword register={register('newPassword')} />
            </label>
            <p><T>{errors.newPassword?.message || ''}</T></p>
          </div>
          <div className="jk-form-item">
            <label>
              <T>confirm new password</T>
              <InputPassword register={register('newPasswordConfirmation')} />
            </label>
            <p><T>{errors.newPasswordConfirmation?.message || ''}</T></p>
          </div>
          <div className={classNames('gap block', {
            'jk-row': viewPortSize !== 'sm',
            'jk-col': viewPortSize === 'sm',
          })}>
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
              <T className="ws-np">update password</T>
            </ButtonLoader>
          </div>
        </form>
      </div>
    </Modal>
  );
};
