import { useState } from 'react';
import { Button } from '../../../atoms';
import { MockupJukiProvider } from '../../../mockup';
import { ChangePasswordModal as UserChangePasswordModalCmp } from './';

export default {
  component: UserChangePasswordModalCmp,
};

export const UserChangePasswordModal = () => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <UserChangePasswordModalCmp
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};
