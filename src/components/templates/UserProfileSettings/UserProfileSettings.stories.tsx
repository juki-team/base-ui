import { USER_GUEST } from '@juki-team/commons';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { UserProfileSettings as UserProfileSettingsCmp } from './UserProfileSettings';

export default {
  component: UserProfileSettingsCmp,
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
    </MockupJukiProvider>
  );
};
