import { QueryParamKey } from '../../../enums';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, Popover, T } from '../../atoms';
import { classNames, getQuerySessionId } from '../../helpers';
import { useJukiUser } from '../../hooks/useJukiUser';
import { ButtonLoader } from '../../molecules';
import { LoginIcon, LogoutIcon, SpinIcon } from '../../server';
import type { LoginUserProps } from './types';

export function LoginUser({ collapsed, isVertical, isHorizontal, onSeeMyProfile, profileSelected }: LoginUserProps) {
  
  const { logout } = useJukiUser();
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userImageUrl = useUserStore(state => state.user.imageUrl);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const userIsLoading = useUserStore(state => state.isLoading);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const viewPortSize = usePageStore(store => store.viewPort.screen);
  const { Image } = useUIStore(store => store.components);
  
  if (userIsLoading) {
    return <div className="jk-row"><SpinIcon className="cr-we" /></div>;
  }
  
  if (userIsLogged) {
    return (
      <Popover
        popoverClassName="bc-we jk-br-ie elevation-1"
        content={
          <div className="jk-col gap user-profile-popup jk-pg-sm">
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
                  await onSeeMyProfile(userNickname, companyKey);
                }}
              >
                <T className="ws-np tt-se">my account</T>
              </ButtonLoader>
              <ButtonLoader
                expand
                onClick={(setLoader) => logout({ setLoader })}
                type="light"
                icon={<LogoutIcon />}
                disabled={!!getQuerySessionId()}
              >
                <T className="ws-np tt-se">sign out</T>
              </ButtonLoader>
            </div>
            {/*<div className="jk-divider tiny" />*/}
            {/*<div className="jk-row space-between nowrap">*/}
            {/*  <div className="tx-s capitalized-case"><T>privacy policy</T></div>*/}
            {/*  <div className="tx-s capitalized-case"><T>terms of service</T></div>*/}
            {/*</div>*/}
          </div>
        }
        offset={4}
        placement={isVertical ? 'right-end' : 'bottom-end'}
      >
        <div
          className={classNames('user-logged-head nowrap jk-row gap jk-pg-xsm-tb', { 'jk-br-ie': !collapsed })}
          style={{ padding: collapsed ? undefined : '0 var(--pad-xt)' }}
        >
          <Image
            src={userImageUrl}
            alt={userNickname}
            className={classNames('jk-user-profile-img large')}
            width={32}
            height={32}
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
        onClick={() => setSearchParams({ name: QueryParamKey.SIGN_IN, value: 'true' })}
        icon={!collapsed && <LoginIcon />}
        expand
      >
        {viewPortSize !== 'sm' && (!collapsed ? <T className="ws-np tt-se">sign in</T> : <LoginIcon />)}
      </Button>
    </div>
  );
}
