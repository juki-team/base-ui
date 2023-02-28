import { USER_GUEST } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import React, { useState } from 'react';
import { Button } from '../../components';
import {
  ImageCmpProps,
  ProblemSelector as ProblemSelectorComponent,
  UserChangePasswordModal as UserChangePasswordModalCmp,
  UserPreviewModal as UserPreviewModalCmp,
  UserProfileSettings as UserProfileSettingsCmp,
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

const Image = ({ src, className, alt, style, width, height }: ImageCmpProps) => {
  return <img src={src} className={className} alt={alt} width={width} height={height} style={{ ...style, width, height }} />;
};

export const UserPreviewModal = () => {
  
  const [open, setOpen] = useState(false);
  
  return (
    <JukiProvider>
      <div className="jk-pad-lg">
        {open && (
          <UserPreviewModalCmp ImageCmp={Image} userHref={'#'} onClose={() => setOpen(false)} nickname="OscarGauss" />
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
        onClickUpdatePassword={() => console.log('click onClickUpdatePassword')}
      />
      <ToggleThemeButton />
    </JukiProvider>
  );
};

export const UserChangePasswordModal = () => {
  
  const [open, setOpen] = useState(false);
  
  return (
    <JukiProvider>
      {open && <UserChangePasswordModalCmp onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)}>open</Button>
      <ToggleThemeButton />
    </JukiProvider>
  );
};
