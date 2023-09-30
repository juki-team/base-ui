import { MenuViewMode, ProfileSetting, Status, Theme } from '@juki-team/commons';
import React, { ReactNode, useEffect, useState } from 'react';
import { DrawerViewMenuMobile, LoginModal, SettingsSection, SignUpModal, WelcomeModal } from '../';
import { HorizontalMenu, LoadingIcon, MenuType, VerticalMenu } from '../../components';
import { useJukiUI, useJukiUser } from '../../hooks';
import { QueryParamKey } from '../../types';
import { LoginUser } from './LoginUser';

export interface MainMenuProps {
  onSeeMyProfile: () => Promise<void> | void,
  menu: MenuType[],
  menuViewMode?: MenuViewMode,
  profileSelected?: boolean,
  children: ReactNode,
}

export const MainMenu = ({ menu, onSeeMyProfile, menuViewMode, profileSelected, children }: MainMenuProps) => {
  
  const {
    viewPortSize,
    components: { Link, Image },
    router: { searchParams, deleteSearchParams, appendSearchParams },
  } = useJukiUI();
  const {
    user: {
      isLogged,
      nickname,
      settings: { [ProfileSetting.THEME]: preferredTheme, [ProfileSetting.MENU_VIEW_MODE]: userPreferredMenuViewMode },
    },
    isLoading,
    company: { imageUrl, name },
  } = useJukiUser();
  
  useEffect(() => {
    if (isLogged && (searchParams.has(QueryParamKey.SIGN_IN))) {
      deleteSearchParams({ name: QueryParamKey.SIGN_IN })
    }
    if (isLogged && (searchParams.has(QueryParamKey.SIGN_UP))) {
      deleteSearchParams({ name: QueryParamKey.SIGN_UP })
    }
  }, [ isLogged, searchParams, deleteSearchParams ]);
  const [ helpOpen, setHelpOpen ] = useState(false);
  
  const preferredMenuViewMode = menuViewMode || userPreferredMenuViewMode
  
  const logoImageUrl = (viewPortSize === 'sm' && preferredTheme !== Theme.DARK) ? imageUrl.replace(
    'white',
    'color',
  ) : imageUrl;
  
  const drawerMenuMobile = (props: { onClose: () => void, menu: MenuType[] }) => (
    <DrawerViewMenuMobile {...props} logoImageUrl={logoImageUrl} />
  );
  
  const rightMobile = {
    children: (
      <div className="jk-row">
        <LoginUser
          collapsed={false}
          popoverPlacement="bottomRight"
          onSeeMyProfile={onSeeMyProfile}
          profileSelected={profileSelected}
        />
      </div>
    ),
  };
  
  const centerMobile = {
    children: (
      <div className="jk-row">
        <Link href="/">
          <Image
            src={logoImageUrl}
            alt={name}
            height={45}
            width={90}
          />
        </Link>
      </div>
    ),
  };
  
  const topSection = ({ isOpen }: { isOpen: boolean }) => (
    <Link href="/">
      <div className="jk-row" style={{ padding: 'calc(var(--pad-lg) + var(--pad-lg)) 0' }}>
        {isLoading
          ? <LoadingIcon />
          : (
            <Image
              src={isOpen ? logoImageUrl : logoImageUrl.replace('horizontal', 'vertical')}
              alt={name}
              height={isOpen ? 60 : 80}
              width={isOpen ? 120 : 40}
            />
          )}
      </div>
    </Link>
  );
  const bottomSection = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <div className="jk-col stretch gap settings-apps-login-user-content nowrap pad-top-bottom">
        <SettingsSection
          isOpen={isOpen}
          isMobile={false}
          helpOpen={helpOpen}
          setHelpOpen={setHelpOpen}
          popoverPlacement="right"
        />
        <LoginUser
          collapsed={!isOpen}
          popoverPlacement="rightBottom"
          onSeeMyProfile={onSeeMyProfile}
          profileSelected={profileSelected}
        />
      </div>
    );
  };
  
  const leftSection = () => (
    <Link href="/">
      <div className="jk-col extend">
        <div className="jk-row pad-left-right">
          {isLoading
            ? <LoadingIcon />
            : (
              <Image
                src={logoImageUrl}
                alt={name}
                height={viewPortSize === 'md' ? 40 : 46}
                width={viewPortSize === 'md' ? 80 : 92}
              />
            )}
        </div>
      </div>
    </Link>
  );
  const rightSection = () => {
    return (
      <div className="jk-row stretch gap settings-apps-login-user-content nowrap pad-left-right">
        <SettingsSection
          isOpen={false}
          isMobile={false}
          helpOpen={helpOpen}
          setHelpOpen={setHelpOpen}
          popoverPlacement="bottom"
        />
        <LoginUser
          collapsed={false}
          popoverPlacement="bottomRight"
          onSeeMyProfile={onSeeMyProfile}
          profileSelected={profileSelected}
        />
      </div>
    );
  };
  
  return (
    <>
      {searchParams.has(QueryParamKey.SIGN_UP) && (
        <SignUpModal
          onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_UP })}
          onSuccess={() => {
            deleteSearchParams({ name: QueryParamKey.SIGN_UP });
            appendSearchParams({ name: QueryParamKey.WELCOME, value: '1' });
          }}
        />
      )}
      {searchParams.has(QueryParamKey.SIGN_IN) && (
        <LoginModal
          onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_IN })}
          onSignUpButton={() => {
            deleteSearchParams({ name: QueryParamKey.SIGN_IN });
            appendSearchParams({ name: QueryParamKey.SIGN_UP, value: '1' });
          }}
        />
      )}
      {searchParams.has(QueryParamKey.WELCOME) && (
        <WelcomeModal
          nickname={nickname}
          onClose={() => deleteSearchParams({ name: QueryParamKey.WELCOME })}
          onSeeMyProfile={async (setLoaderStatus, ...props) => {
            setLoaderStatus(Status.LOADING);
            await onSeeMyProfile();
            deleteSearchParams({ name: QueryParamKey.WELCOME })
            setLoaderStatus(Status.SUCCESS);
          }}
        />
      )}
      {preferredMenuViewMode === MenuViewMode.HORIZONTAL
        ? (
          <HorizontalMenu
            menu={menu}
            leftSection={leftSection}
            rightSection={rightSection}
            drawerMenuMobile={drawerMenuMobile}
            rightMobile={rightMobile}
            centerMobile={centerMobile}
          >
            {isLoading ?
              <div className="jk-col extend"><LoadingIcon size="very-huge" className="cr-py" /></div> : children}
          </HorizontalMenu>
        )
        : (
          <VerticalMenu
            menu={menu}
            topSection={topSection}
            bottomSection={bottomSection}
            drawerMenuMobile={drawerMenuMobile}
            rightMobile={rightMobile}
            centerMobile={centerMobile}
          >
            {isLoading ?
              <div className="jk-col extend"><LoadingIcon size="very-huge" className="cr-py" /></div> : children}
          </VerticalMenu>
        )}
    </>
  );
};
