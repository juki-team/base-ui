import { yupResolver } from '@hookform/resolvers/yup';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonLoader, InputPassword, Modal, SetLoaderStatusOnClickType, T } from '../../components';
import { useJukiUser } from '../../hooks';

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

export const ChangePasswordModal = ({ onClose }: { onClose: () => void, }) => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ProfileChangePasswordInput>({
    resolver: yupResolver(profileSettingsChangePasswordSchema),
    mode: 'onChange',
    reValidateMode: 'onBlur',
  });
  
  const { updatePassword } = useJukiUser();
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  return (
    <Modal
      isOpen={true}
      className="modal-change-password"
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
            onSuccess: onClose,
          }))}>
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
          <div className="jk-form-item">
            <label>
              <T>password</T>
              <InputPassword register={register('oldPassword')} />
            </label>
            <p><T>{errors.oldPassword?.message || ''}</T></p>
          </div>
          <div className="jk-row gap right">
            <ButtonLoader type="text" onClick={onClose}>
              <T>cancel</T>
            </ButtonLoader>
            <ButtonLoader
              type="primary"
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isValid}
              submit
            >
              <T>update password</T>
            </ButtonLoader>
          </div>
        </form>
      </div>
    </Modal>
  );
};
