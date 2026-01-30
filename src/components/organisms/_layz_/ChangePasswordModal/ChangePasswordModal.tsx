import { yupResolver } from '@hookform/resolvers/yup';
import { Status } from '@juki-team/commons';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePageStore } from '../../../../stores/page/usePageStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { InputPassword, Modal, T } from '../../../atoms';
import { classNames } from '../../../helpers';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { ButtonLoader } from '../../../molecules';
import type { SetLoaderStatusOnClickType } from '../../../types';
import type { ChangePasswordModalProps, ProfileChangePasswordInput } from './types';

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

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  
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
  const nickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  return (
    <Modal
      isOpen={isOpen}
      className="wh-ao"
      onClose={onClose}
    >
      <div className="jk-pg-md jk-col gap stretch">
        <div className="jk-row extend">
          <h2 className="tt-se">update password</h2>
        </div>
        <form
          onSubmit={handleSubmit((data: ProfileChangePasswordInput) => updatePassword({
            params: { nickname, companyKey },
            body: { newPassword: data.newPassword, oldPassword: data.oldPassword },
            setLoader: setLoaderRef.current!,
            onSuccess: () => onClose(() => () => Status.SUCCESS, Status.SUCCESS, {}),
          }))}
        >
          <div className="jk-col stretch">
            <div className="jk-form-item">
              <InputPassword
                expand
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
                expand
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
                expand
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
          </div>
          <div
            className={classNames('gap block', {
              'jk-row': !isSmallScreen,
              'jk-col': isSmallScreen,
            })}
          >
            <ButtonLoader type="light" onClick={onClose} expand>
              <T className="tt-se">cancel</T>
            </ButtonLoader>
            <ButtonLoader
              setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
              disabled={!isValid}
              submit
              expand
            >
              <T className="tt-se">update</T>
            </ButtonLoader>
          </div>
        </form>
      </div>
    </Modal>
  );
}
