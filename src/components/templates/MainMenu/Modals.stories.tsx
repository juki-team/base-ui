import { useState } from 'react';
import { action } from 'storybook/actions';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import {
  ForgotPasswordModal as UserForgotPasswordModalCmp,
} from '../../organisms/modals/LoginModal/LoginModalTemplate';
import { WelcomeModal as WelcomeModalCmp } from '../../organisms/modals/WelcomeModal';
import { CalendarMonthIcon, EventIcon } from '../../server';
import { DrawerViewMenuMobile as DrawerViewMenuMobileCmp } from './DrawerViewMenuMobile';

export default {
  component: DrawerViewMenuMobileCmp,
};

export const UserForgotPasswordModal = () => {
  const [ open, setOpen ] = useState(false);
  return (
    <MockupJukiProvider>
      <UserForgotPasswordModalCmp
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};

export const WelcomeModal = () => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <WelcomeModalCmp
        isOpen={open}
        onClose={() => setOpen(false)}
        nickname="OscarGauss"
        onSeeMyProfile={action('onSeeMyProfile')}
      />
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};

export const DrawerViewMenuMobile = () => {
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      {open && (
        <DrawerViewMenuMobileCmp
          menu={[
            {
              icon: <CalendarMonthIcon />,
              label: 'calendar menu',
              selected: true,
              menuItemWrapper: ({ children }) => <>{children}</>,
            },
            {
              icon: <EventIcon />,
              label: 'calendar menu',
              selected: false,
              menuItemWrapper: ({ children }) => (
                <a href="/" target="_blank">
                  {children}
                </a>
              ),
            },
          ]}
          onClose={() => setOpen(false)}
          logoImageUrl="https://images.juki.pub/c/juki-judge-horizontal-color-logo.svg"
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};
