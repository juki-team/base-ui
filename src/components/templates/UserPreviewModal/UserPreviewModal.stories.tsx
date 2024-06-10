import React, { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { UserPreviewModal as UserPreviewModalCmp } from './index';

export default {
  component: UserPreviewModalCmp,
};

export const UserPreviewModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
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
