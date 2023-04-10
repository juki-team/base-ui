import { USER_GUEST } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { Button, CalendarMonthIcon, EventIcon } from '../../components';
import {
  ChangePasswordModal as UserChangePasswordModalCmp,
  DrawerViewMenuMobile as DrawerViewMenuMobileCmp,
  ForgotPasswordModal as UserForgotPasswordModalCmp,
  ProblemSelector as ProblemSelectorComponent,
  UserPreviewModal as UserPreviewModalCmp,
  UserProfileSettings as UserProfileSettingsCmp,
  WelcomeModal as WelcomeModalCmp,
} from '../../integrated-components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

export const ProblemSelector = () => {
  return (
    <JukiProvider>
      <div className="jk-pad-lg">
        <ProblemSelectorComponent onSelect={action('onSelect')} />
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

export const UserPreviewModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <JukiProvider>
      <div className="jk-pad-lg">
        {open && (
          <UserPreviewModalCmp userHref={'#'} onClose={() => setOpen(false)} nickname="OscarGauss" />
        )}
        <Button onClick={() => setOpen(true)}>open</Button>
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

export const UserProfileSettings = () => {
  return (
    <JukiProvider>
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
      <ToggleThemeButton />
    </JukiProvider>
  );
};

export const UserChangePasswordModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <JukiProvider>
      {open && <UserChangePasswordModalCmp onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)}>open</Button>
      <ToggleThemeButton />
    </JukiProvider>
  );
};

export const UserForgotPasswordModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <JukiProvider>
      {open && <UserForgotPasswordModalCmp onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)}>open</Button>
      <ToggleThemeButton />
    </JukiProvider>
  );
};

export const WelcomeModal = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <JukiProvider>
      {open && (
        <WelcomeModalCmp
          onClose={() => setOpen(false)}
          nickname="OscarGauss"
          onSeeMyProfile={action('onSeeMyProfile')}
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
      <ToggleThemeButton />
    </JukiProvider>
  );
};

export const DrawerViewMenuMobile = () => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <JukiProvider>
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
              menuItemWrapper: (children) => <a href="#" target="_blank">{children}</a>,
            },
          ]}
          onClose={() => setOpen(false)}
          logoImageUrl="https://images.juki.pub/c/juki-judge-horizontal-color-logo.svg"
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
      <ToggleThemeButton />
    </JukiProvider>
  );
};
