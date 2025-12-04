import { Button, Modal, T } from '../../atoms';
import { useJukiUser } from '../../hooks/useJukiUser';
import { ButtonLoader } from '../../molecules';
import { UserNicknameLink } from '../../organisms';
import type { ResetPasswordModalProps } from './types';

export function ResetPasswordModal({ nickname, companyKey, ...modalProps }: ResetPasswordModalProps) {
  
  const { resetUserPassword } = useJukiUser();
  
  return (
    <Modal {...modalProps}>
      <div className="jk-pg-md jk-col gap left stretch">
        <h2><T className="tt-se">reset password</T></h2>
        <div className="jk-row left">
          <T className="tt-se">the password for</T>&nbsp;
          <UserNicknameLink nickname={nickname}>
            <div className="link">{nickname}</div>
          </UserNicknameLink>&nbsp;
          <T>will be reset</T>.
        </div>
        <div className="jk-row left">
          <T className="tt-se">{'the new password will be sent to user\'s email'}</T>.
        </div>
        <div className="jk-row right gap extend">
          <Button type="light" onClick={modalProps.onClose}><T className="tt-se">cancel</T></Button>
          <ButtonLoader
            onClick={(setLoader) => resetUserPassword({
              params: { nickname, companyKey },
              setLoader,
              onSuccess: modalProps.onClose,
            })}
          >
            <T className="tt-se">reset_2</T>
          </ButtonLoader>
        </div>
      </div>
    </Modal>
  );
}
