import React, { useState } from 'react';
import { Button, ButtonLoader, LoadingIcon, LoginIcon, LogoutIcon, Popover, T } from '../../components';
import { classNames } from '../../helpers';
import { useJukiUI, useJukiUser } from '../../hooks';
import { QueryParamKey } from '../../types';

interface LoginUserProps {
  collapsed: boolean,
  popoverPlacement: 'rightBottom' | 'bottomRight',
  onSeeMyProfile: () => void,
  profileSelected?: boolean,
}

export const LoginUser = ({ collapsed, popoverPlacement, onSeeMyProfile, profileSelected }: LoginUserProps) => {
  
  const { user, isLoading, logout } = useJukiUser();
  const { viewPortSize, components: { Image }, router: { setSearchParams } } = useJukiUI();
  const [ visible, setVisible ] = useState(false);
  
  if (isLoading) {
    return <div className="jk-row"><LoadingIcon className="cr-we" /></div>;
  }
  
  if (user.isLogged) {
    return (
      <Popover
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
        content={
          <div
            className={classNames('jk-col gap user-profile-popup', {
              'jk-pad-md': viewPortSize === 'sm',
              'jk-pad-sm': viewPortSize !== 'sm',
            })}
          >
            <Image
              src={user.imageUrl}
              className="jk-user-profile-img huge elevation-1"
              alt={user.nickname}
              height={50}
              width={50}
            />
            {user.nickname}
            <div className="jk-col gap">
              <ButtonLoader
                extend
                onClick={async () => {
                  await onSeeMyProfile();
                  setVisible(false);
                }}
              >
                <T className="ws-np">my account</T>
              </ButtonLoader>
              <ButtonLoader
                extend
                onClick={(setLoader) => logout({ setLoader, onSuccess: () => setVisible(false) })}
                type="outline"
                icon={<LogoutIcon />}
              >
                <T className="ws-np">sign out</T>
              </ButtonLoader>
            </div>
            {/*<div className="jk-divider tiny" />*/}
            {/*<div className="jk-row space-between nowrap">*/}
            {/*  <div className="tx-s capitalized-case"><T>privacy policy</T></div>*/}
            {/*  <div className="tx-s capitalized-case"><T>terms of service</T></div>*/}
            {/*</div>*/}
          </div>
        }
        triggerOn="click"
        placement={popoverPlacement}
      >
        <div className={classNames('user-logged-head nowrap jk-row gap')}>
          <img
            src={user.imageUrl}
            alt={user.nickname}
            className={classNames('jk-user-profile-img large')}
          />
          {viewPortSize !== 'sm' && viewPortSize !== 'md' && !collapsed && (
            <div className="jk-row nickname">{user.nickname}</div>
          )}
          {popoverPlacement === 'bottomRight' && profileSelected && <div className="selected horizontal" />}
          {popoverPlacement === 'rightBottom' && profileSelected && <div className="selected vertical" />}
        </div>
      </Popover>
    );
  }
  
  return (
    <div className="jk-row extend">
      <Button
        type="secondary"
        onClick={() => setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' })}
        size={viewPortSize === 'sm' ? 'small' : undefined}
        icon={!collapsed && <LoginIcon />}
        extend
      >
        {!collapsed ? <T className="ws-np ws-np">sign in</T> : <LoginIcon />}
      </Button>
    </div>
  );
};
