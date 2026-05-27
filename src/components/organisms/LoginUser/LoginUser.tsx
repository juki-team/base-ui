import { QueryParamKey } from '../../../enums';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, Popover, T } from '../../atoms';
import { classNames } from '../../helpers/commons';
import { getQuerySessionId } from '../../helpers/fetch';
import { useJukiUser } from '../../hooks/useJukiUser';
import { ButtonLoader } from '../../molecules';
import { LoginIcon, LogoutIcon, SpinIcon } from '../../server';
import { UserChip } from '../UserChip/UserChip';
import type { LoginUserProps } from './types';

export function LoginUser({
  withLabel,
  isVertical,
  popoverPlacement,
  isHorizontal,
  onSeeMyProfile,
  profileSelected,
  className,
}: LoginUserProps) {
  const { logout } = useJukiUser();
  const userNickname = useUserStore((state) => state.user.nickname);
  const organizationKey = useUserStore((state) => state.organization.key);
  const userImageUrl = useUserStore((state) => state.user.imageUrl);
  const userIsLogged = useUserStore((state) => state.user.isLogged);
  const userIsLoading = useUserStore((state) => state.isLoading);
  const setSearchParams = useRouterStore((state) => state.setSearchParams);
  const { Image } = useUIStore((store) => store.components);

  if (userIsLoading) {
    return (
      <div className="jk-row">
        <SpinIcon className="cr-we" />
      </div>
    );
  }

  if (userIsLogged) {
    return (
      <Popover
        popoverClassName="bc-sf-hi jk-br-ie elevation-1"
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
              {!!onSeeMyProfile && (
                <ButtonLoader expand onClick={() => onSeeMyProfile(userNickname, organizationKey)}>
                  <T className="ws-np tt-se">my account</T>
                </ButtonLoader>
              )}
              <ButtonLoader
                expand
                onClick={(setLoader) => logout({ setLoader })}
                type="secondary"
                icon={<LogoutIcon />}
                disabled={!!getQuerySessionId()}
              >
                <T className="ws-np tt-se">sign out</T>
              </ButtonLoader>
            </div>
            {/*<div className="jk-divider tiny" />*/}
            {/*<div className="jk-row space-between nowrap">*/}
            {/*  <div className="tx-s"><T className="tt-ce">privacy policy</T></div>*/}
            {/*  <div className="tx-s"><T className="tt-ce">terms of service</T></div>*/}
            {/*</div>*/}
          </div>
        }
        offset={4}
        placement={popoverPlacement}
      >
        <UserChip
          organizationKey={organizationKey}
          imageUrl={userImageUrl}
          nickname={userNickname}
          className={classNames('user-logged-head extend', { left: !!withLabel }, className)}
          onlyImage={!withLabel}
        >
          {/*<div className={classNames('user-logged-head nowrap jk-row gap fw-br', className)}>*/}
          {/*  <span className="jk-user-profile-img large">*/}
          {/*    <Image src={userImageUrl} alt={userNickname} fill className="br-50-pc" />*/}
          {/*  </span>*/}
          {/*  {withLabel && <div className="jk-row nickname">{userNickname}</div>}*/}
          {isHorizontal && profileSelected && <div className="selected horizontal" />}
          {isVertical && profileSelected && <div className="selected vertical" />}
          {/*</div>*/}
        </UserChip>
      </Popover>
    );
  }

  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={!withLabel ? 'sign in' : ''}
      data-tooltip-t-class-name="ws-np ws-np"
      className="jk-row extend"
    >
      <Button onClick={() => setSearchParams({ name: QueryParamKey.SIGN_IN, value: 'true' })} icon={<LoginIcon />} expand>
        {withLabel && <T className="ws-np tt-se">sign in</T>}
      </Button>
    </div>
  );
}
