import React from 'react';
import { EMPTY_USER } from '../../../constants';
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
          ...EMPTY_USER,
          canEditProfileData: true,
          canEditSettingsData: true,
          canEditPermissionsData: true,
          canUpdatePassword: true,
          canResetPassword: true,
          aboutMe: '',
          city: '',
          country: '',
          institution: '',
          handles: {},
          email: '',
          familyName: '',
          givenName: '',
        }}
        onClickUpdatePassword={() => console.info('click onClickUpdatePassword')}
      />
    </MockupJukiProvider>
  );
};
