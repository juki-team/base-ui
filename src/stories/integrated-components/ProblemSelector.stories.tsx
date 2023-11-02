import { USER_GUEST } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import {
  Button,
  CalendarMonthIcon,
  ChangePasswordModal as UserChangePasswordModalCmp,
  DrawerViewMenuMobile as DrawerViewMenuMobileCmp,
  EventIcon,
  ForgotPasswordModal as UserForgotPasswordModalCmp,
  ProblemSelector as ProblemSelectorComponent,
  UserPreviewModal as UserPreviewModalCmp,
  UserProfileSettings as UserProfileSettingsCmp,
  WelcomeModal as WelcomeModalCmp,
} from '../../components';
import { MockupJukiProvider } from '../../components/mockup/MockupJukiProvider';
import { MockupToggleThemeButton } from '../../components/mockup/MockupToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

export const ProblemSelector = () => {
  return (
    <MockupJukiProvider>
      <div className="jk-pad-lg">
        <ProblemSelectorComponent onSelect={action('onSelect')} />
        <MockupToggleThemeButton />
      </div>
    </MockupJukiProvider>
  );
};

export const UserPreviewModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      <div className="jk-pad-lg">
        {open && (
          <UserPreviewModalCmp userHref={'#'} onClose={() => setOpen(false)} nickname="OscarGauss" />
        )}
        <Button onClick={() => setOpen(true)}>open</Button>
        <MockupToggleThemeButton />
      </div>
    </MockupJukiProvider>
  );
};

export const UserProfileSettings = () => {
  return (
    <MockupJukiProvider>
      <UserProfileSettingsCmp
        user={{
          ...USER_GUEST,
          canEditProfileData: true,
          canEditSettingsData: true,
          canEditPermissionsData: true,
          canUpdatePassword: true,
          canResetPassword: true,
        }}
        onClickUpdatePassword={() => console.info('click onClickUpdatePassword')}
      />
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  );
};

export const UserChangePasswordModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      {open && <UserChangePasswordModalCmp onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)}>open</Button>
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  );
};

export const UserForgotPasswordModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      {open && <UserForgotPasswordModalCmp onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)}>open</Button>
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  );
};

export const WelcomeModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <MockupJukiProvider>
      {open && (
        <WelcomeModalCmp
          onClose={() => setOpen(false)}
          nickname="OscarGauss"
          onSeeMyProfile={action('onSeeMyProfile')}
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
      <MockupToggleThemeButton />
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
              menuItemWrapper: (children) => <>{children}</>,
            },
            {
              icon: <EventIcon />,
              label: 'calendar menu',
              selected: false,
              menuItemWrapper: (children) => <a href="/" target="_blank">{children}</a>,
            },
          ]}
          onClose={() => setOpen(false)}
          logoImageUrl="https://images.juki.pub/c/juki-judge-horizontal-color-logo.svg"
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  );
};
