import { useUserStore } from '../../../../stores/user/useUserStore';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { SignUpModalTemplate } from './SignUpModalTemplate';
import type { SignUpModalComponentProps } from './SignUpModalTemplate/types';
import type { SignUpModalProps } from './types';

export default function SignUpModal({ isOpen, onClose, onSuccess, onSignInButton }: SignUpModalProps) {
  
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
