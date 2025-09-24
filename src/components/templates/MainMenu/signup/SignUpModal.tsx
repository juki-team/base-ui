import { useJukiUser } from '../../../../hooks/useJukiUser';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { SignUpModalTemplate } from './SignUpModalTemplate';
import { SignUpModalComponentProps } from './SignUpModalTemplate/types';
import { SignUpModalProps } from './types';

export const SignUpModal = ({ isOpen, onClose, onSuccess, onSignInButton }: SignUpModalProps) => {
  
  const { osLabel, label } = useUserStore(state => state.device);
  const { signUp } = useJukiUser();
  
  const onSubmit: SignUpModalComponentProps['onSubmit'] = (data, setLoader) => signUp({
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onSuccess,
  });
  
  return (
    <SignUpModalTemplate isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} onSignInButton={onSignInButton} />
  );
};
