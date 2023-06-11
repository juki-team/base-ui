import { MenuViewMode, ProfileSetting, Status, Theme } from '@juki-team/commons';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { DrawerViewMenuMobile, LoginModal, SettingsSection, SignUpModal, WelcomeModal } from '../';
import { HorizontalMenu, LoadingIcon, MenuType, VerticalMenu } from '../../components';
import { useJukiUI, useJukiUser } from '../../hooks';
import { LoginUser } from './LoginUser';
import { SessionUserQueryParam } from './types';

export interface MainMenuProps {
  onSeeMyProfile: () => void,
  menu: MenuType[],
}

export const MainMenu = ({ menu, onSeeMyProfile, children }: PropsWithChildren<MainMenuProps>) => {
  
  const {
    viewPortSize,
    components: { Link, Image },
    router: { searchParams, deleteSearchParams, appendSearchParams },
  } = useJukiUI();
  const {
    user: {
      isLogged,
      nickname,
      settings: { [ProfileSetting.THEME]: preferredTheme, [ProfileSetting.MENU_VIEW_MODE]: preferredMenuViewMode },
    },
    isLoading,
    company: { imageUrl, name },
  } = useJukiUser();
  
  useEffect(() => {
    if (isLogged && (searchParams.has(SessionUserQueryParam.SIGN_IN))) {
      deleteSearchParams({ name: SessionUserQueryParam.SIGN_IN })
    }
    if (isLogged && (searchParams.has(SessionUserQueryParam.SIGN_UP))) {
      deleteSearchParams({ name: SessionUserQueryParam.SIGN_UP })
    }
  }, [ isLogged, searchParams ]);
  const [ helpOpen, setHelpOpen ] = useState(false);
  
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
        <LoginUser collapsed={false} popoverPlacement="bottomRight" onSeeMyProfile={onSeeMyProfile} />
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
        <LoginUser collapsed={!isOpen} popoverPlacement="rightBottom" onSeeMyProfile={onSeeMyProfile} />
      </div>
    );
  };
  
  const leftSection = () => (
    <Link href="/">
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
        <LoginUser collapsed={false} popoverPlacement="bottomRight" onSeeMyProfile={onSeeMyProfile} />
      </div>
    );
  };
  
  return (
    <>
      {searchParams.has(SessionUserQueryParam.SIGN_UP) && (
        <SignUpModal
          onClose={() => deleteSearchParams({ name: SessionUserQueryParam.SIGN_UP })}
          onSuccess={() => {
            deleteSearchParams({ name: SessionUserQueryParam.SIGN_UP });
            appendSearchParams({ name: SessionUserQueryParam.WELCOME, value: '1' });
          }}
        />
      )}
      {searchParams.has(SessionUserQueryParam.SIGN_IN) && (
        <LoginModal
          onClose={() => deleteSearchParams({ name: SessionUserQueryParam.SIGN_IN })}
          onSignUpButton={() => {
            deleteSearchParams({ name: SessionUserQueryParam.SIGN_IN });
            appendSearchParams({ name: SessionUserQueryParam.SIGN_UP, value: '1' });
          }}
        />
      )}
      {searchParams.has(SessionUserQueryParam.WELCOME) && (
        <WelcomeModal
          nickname={nickname}
          onClose={() => deleteSearchParams({ name: SessionUserQueryParam.WELCOME })}
          onSeeMyProfile={async (setLoaderStatus, ...props) => {
            setLoaderStatus(Status.LOADING);
            await onSeeMyProfile();
            deleteSearchParams({ name: SessionUserQueryParam.WELCOME })
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

export * from './types';
