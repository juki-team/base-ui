import React, { useState } from 'react';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { jukiAppRoutes } from '../../../settings';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { ProfileTab, TabsType } from '../../../types';
import { Button, T } from '../../atoms';
import { LockIcon } from '../../atoms/server';
import { TwoContentLayout } from '../../molecules';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';
import { EditProfileModal } from '../EditProfileModal/EditProfileModal';
import { ResetPasswordModal } from '../ResetPasswordModal/ResetPasswordModal';
import { UserMyActiveSessions } from '../UserActiveSessions/UserMyActiveSessions';
import { UserProfile } from '../UserProfile/UserProfile';
import { UserProfileSettings } from '../UserProfileSettings/UserProfileSettings';
import { UserViewLayoutProps } from './types';

export function UserViewLayout({ user, reloadUser, extraTabs }: UserViewLayoutProps) {
  
  const mutatePing = useUserStore(state => state.mutate);
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const replaceRoute = useRouterStore(state => state.replaceRoute);
  const searchParams = useRouterStore(state => state.searchParams);
  const [ openModal, setOpenModal ] = useState('');
  const { viewPortSize } = useJukiUI();
  
  const onClose = () => setOpenModal('');
  const tab = searchParams.get('tab') as ProfileTab || ProfileTab.OVERVIEW;
  
  let tabHeaders: TabsType<ProfileTab> = {
    [ProfileTab.OVERVIEW]: {
      key: ProfileTab.OVERVIEW,
      header: <T className="tt-ce ws-np">overview</T>,
      body: <UserProfile user={user} />,
    },
  };
  
  if (user.nickname === userNickname) {
    tabHeaders[ProfileTab.SETTINGS] = {
      key: ProfileTab.SETTINGS,
      header: <T className="tt-ce ws-np">settings</T>,
      body: (
        <UserProfileSettings
          user={user}
          onClickUpdatePassword={() => setOpenModal('UPDATE_PASSWORD')}
        />
      ),
    };
    tabHeaders[ProfileTab.MY_SESSIONS] = {
      key: ProfileTab.MY_SESSIONS,
      header: <T className="tt-ce ws-np">active sessions</T>,
      body: <UserMyActiveSessions />,
    };
  }
  
  if (extraTabs) {
    tabHeaders = {
      ...tabHeaders,
      ...extraTabs,
    };
  }
  
  const extraNodes = [
    ...(user.canResetPassword ? [
      <Button
        size={(viewPortSize !== 'sm') ? 'tiny' : 'regular'}
        icon={<LockIcon />}
        onClick={() => setOpenModal('RESET_PASSWORD')}
        expand={viewPortSize === 'sm'}
        key="reset password"
      >
        <T className="tt-se ws-np">reset password</T>
      </Button>,
    ] : []),
    ...(user.canEditProfileData ? [
      <Button
        size={(viewPortSize !== 'sm') ? 'tiny' : 'regular'}
        icon={<LockIcon />}
        onClick={() => setOpenModal('DATA')}
        expand={viewPortSize === 'sm'}
        key="update profile"
      >
        <T className="tt-se ws-np">update profile</T>
      </Button>,
    ] : []),
  ];
  
  return (
    <>
      <ChangePasswordModal isOpen={openModal === 'UPDATE_PASSWORD'} onClose={onClose} />
      <ResetPasswordModal
        isOpen={openModal === 'RESET_PASSWORD'}
        onClose={onClose}
        nickname={user.nickname}
        companyKey={companyKey}
      />
      <EditProfileModal
        isOpen={openModal === 'DATA'}
        onClose={onClose}
        user={user}
        onSuccess={async ({ body: { nickname } }) => {
          if (nickname !== user.nickname) {
            replaceRoute(jukiAppRoutes.JUDGE().profiles.view({
              nickname: nickname as string,
              tab: ProfileTab.OVERVIEW,
            }));
          } else {
            await reloadUser();
            await mutatePing();
          }
        }}
      />
      <TwoContentLayout
        // breadcrumbs={breadcrumbs}
        tabs={tabHeaders}
        tabButtons={extraNodes}
        selectedTabKey={tab}
        getHrefOnTabChange={(tab) => jukiAppRoutes.JUDGE().profiles.view({ nickname: user.nickname, tab })}
      >
        <h1>{user.nickname}</h1>
      </TwoContentLayout>
    </>
  );
}
