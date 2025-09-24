import { useState } from 'react';
import { useCheckAndStartServices } from '../../hooks';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { UserPreviewContentModal as UserPreviewModalCmp } from './UserPreviewContentModal/UserPreviewContentModal';

export default {
  component: UserPreviewModalCmp,
};

export const UserPreviewModal = () => {
  const [ open, setOpen ] = useState(false);
  useCheckAndStartServices();
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg">
        <UserPreviewModalCmp
          isOpen={open}
          userHref={'#'}
          onClose={() => setOpen(false)}
          nickname="OscarGauss"
          companyKey="juki-app"
        />
        <Button onClick={() => setOpen(true)}>open</Button>
      </div>
    </MockupJukiProvider>
  );
};
