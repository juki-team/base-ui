import React, { useState } from 'react';
import { classNames, isQueryToken } from '../../../helpers';
import { useJukiRouter, useJukiUI, useJukiUser } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { Button, LoginIcon, LogoutIcon, Popover, SpinIcon, T } from '../../atoms';
import { ButtonLoader } from '../../molecules';

interface LoginUserProps {
  collapsed: boolean,
  popoverPlacement: 'rightBottom' | 'bottomRight',
  onSeeMyProfile: (() => Promise<void>) | (() => void),
  profileSelected?: boolean,
}

export const LoginUser = ({ collapsed, popoverPlacement, onSeeMyProfile, profileSelected }: LoginUserProps) => {
  
  const { user, isLoading, logout } = useJukiUser();
  const { setSearchParams } = useJukiRouter();
  const { viewPortSize, components: { Image } } = useJukiUI();
  const [ visible, setVisible ] = useState(false);
  
  if (isLoading) {
    return <div className="jk-row"><SpinIcon className="cr-we" /></div>;
  }
  
  if (user.isLogged) {
    return (
      <Popover
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
        content={
          <div
            className={classNames('jk-col gap user-profile-popup', {
              'jk-pg-md': viewPortSize === 'sm',
              'jk-pg-sm': viewPortSize !== 'sm',
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
                type="light"
                icon={<LogoutIcon />}
                disabled={isQueryToken()}
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
        <div
          className={classNames('user-logged-head nowrap jk-row gap')}
          style={{ padding: collapsed ? undefined : 'var(--pad-xt)' }}
        >
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
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={collapsed ? 'sign in' : ''}
      data-tooltip-t-class-name="ws-np ws-np"
      className="jk-row extend"
    >
      <Button
        type="secondary"
        onClick={() => setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' })}
        size={viewPortSize === 'sm' ? 'small' : undefined}
        icon={!collapsed && <LoginIcon />}
        extend
        style={(popoverPlacement === 'rightBottom' && !collapsed) ? { margin: '0 var(--pad-xt)' } : undefined}
      >
        {viewPortSize !== 'sm' && (!collapsed ? <T className="ws-np ws-np">sign in</T> : <LoginIcon />)}
      </Button>
    </div>
  );
};
