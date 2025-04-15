import React, { useState } from 'react';
import { classNames } from '../../../../helpers';
import { useJukiUI, useJukiUser, useRouterStore, useUserStore } from '../../../../hooks';
import { jukiApiSocketManager } from '../../../../settings';
import { QueryParamKey } from '../../../../types';
import { Button, Popover, T } from '../../../atoms';
import { ButtonLoader } from '../../../molecules';
import { LoginIcon, LogoutIcon, SpinIcon } from '../../../server';

interface LoginUserProps {
  collapsed: boolean,
  isVertical?: boolean,
  isHorizontal?: boolean,
  onSeeMyProfile: (() => Promise<void>) | (() => void),
  profileSelected?: boolean,
}

export const LoginUser = ({ collapsed, isVertical, isHorizontal, onSeeMyProfile, profileSelected }: LoginUserProps) => {
  
  const { logout } = useJukiUser();
  const userNickname = useUserStore(state => state.user.nickname);
  const userImageUrl = useUserStore(state => state.user.imageUrl);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const userIsLoading = useUserStore(state => state.isLoading);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const { viewPortSize, components: { Image } } = useJukiUI();
  const [ visible, setVisible ] = useState(false);
  
  if (userIsLoading) {
    return <div className="jk-row"><SpinIcon className="cr-we" /></div>;
  }
  
  if (userIsLogged) {
    return (
      <Popover
        open={visible}
        onOpenChange={(visible) => setVisible(visible)}
        content={
          <div className="jk-col gap user-profile-popup jk-br-ie bc-we elevation-1 jk-pg-sm">
            <Image
              src={userImageUrl}
              className="jk-user-profile-img huge elevation-1"
              alt={userNickname}
              height={50}
              width={50}
            />
            {userNickname}
            <div className="jk-col gap">
              <ButtonLoader
                expand
                onClick={async () => {
                  await onSeeMyProfile();
                  setVisible(false);
                }}
              >
                <T className="ws-np">my account</T>
              </ButtonLoader>
              <ButtonLoader
                expand
                onClick={(setLoader) => logout({ setLoader, onSuccess: () => setVisible(false) })}
                type="light"
                icon={<LogoutIcon />}
                disabled={jukiApiSocketManager.isQueryToken()}
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
        offset={4}
        placement={isVertical ? 'right-end' : 'bottom-end'}
      >
        <div
          className={classNames('user-logged-head nowrap jk-row gap')}
          style={{ padding: collapsed ? undefined : '0 var(--pad-xt)' }}
          onClick={() => setVisible(prevState => !prevState)}
        >
          <img
            src={userImageUrl}
            alt={userNickname}
            className={classNames('jk-user-profile-img large')}
          />
          {viewPortSize !== 'sm' && viewPortSize !== 'md' && !collapsed && (
            <div className="jk-row nickname">{userNickname}</div>
          )}
          {isHorizontal && profileSelected && <div className="selected horizontal" />}
          {isVertical && profileSelected && <div className="selected vertical" />}
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
        expand
        style={(isVertical && !collapsed) ? { margin: '0 var(--pad-xt)' } : undefined}
      >
        {viewPortSize !== 'sm' && (!collapsed ? <T className="ws-np ws-np">sign in</T> : <LoginIcon />)}
      </Button>
    </div>
  );
};
