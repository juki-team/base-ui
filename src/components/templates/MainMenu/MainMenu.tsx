import {
  CompanyUserPermissionsResponseDTO,
  ContentsResponseType,
  MenuViewMode,
  ProfileSetting,
  Status,
  Theme,
} from '@juki-team/commons';
import React, { useEffect, useMemo, useState } from 'react';
import { jukiSettings } from '../../../config';
import { classNames } from '../../../helpers';
import { useFetcher, useJukiRouter, useJukiUI, useJukiUser } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { Popover, Select, SpinIcon, T } from '../../atoms';
import { HorizontalMenu, MenuType, VerticalMenu } from '../../organisms';
import { DrawerViewMenuMobile } from './DrawerViewMenuMobile';
import { LoginModal } from './LoginModal';
import { LoginUser } from './LoginUser';
import { SettingsSection } from './SettingsSection';
import { SignUpModal } from './SignUpModal';
import { MainMenuProps } from './types';
import { WelcomeModal } from './WelcomeModal';

export const MainMenu = (props: MainMenuProps) => {
  
  const {
    menu: initialMenu,
    onSeeMyProfile,
    menuViewMode,
    profileSelected,
    moreApps,
    multiCompanies,
    children,
  } = props;
  
  const { viewPortSize, components: { Link, Image } } = useJukiUI();
  
  const { searchParams, deleteSearchParams, setSearchParams, appendSearchParams } = useJukiRouter();
  
  const {
    user: {
      isLogged,
      nickname,
      settings: { [ProfileSetting.THEME]: preferredTheme, [ProfileSetting.MENU_VIEW_MODE]: userPreferredMenuViewMode },
    },
    isLoading,
    company: { imageUrl, name },
  } = useJukiUser();
  
  const { data } = useFetcher<ContentsResponseType<CompanyUserPermissionsResponseDTO>>(multiCompanies && isLogged ? jukiSettings.API.company.getPermissionList().url : null);
  const companyKey = searchParams.get(QueryParamKey.COMPANY) as string;
  const companies = useMemo(() => data?.success ? data.contents : [], [ data ]);
  const company = useMemo(() => companies.find((company) => company.key === companyKey), [ companyKey, companies ]);
  
  useEffect(() => {
    if (isLogged && (searchParams.has(QueryParamKey.SIGN_IN))) {
      deleteSearchParams({ name: QueryParamKey.SIGN_IN })
    }
    if (isLogged && (searchParams.has(QueryParamKey.SIGN_UP))) {
      deleteSearchParams({ name: QueryParamKey.SIGN_UP })
    }
  }, [ isLogged, searchParams, deleteSearchParams ]);
  const [ helpOpen, setHelpOpen ] = useState(false);
  
  const menu = useMemo(() => {
    const menu: MenuType[] = [];
    if (multiCompanies && isLogged) {
      const select = (
        <Select
          options={companies.map(company => ({
            value: company.key,
            label: <span className="ws-np">{company.name}</span>,
          }))}
          selectedOption={{ value: company?.key || '', label: company?.key ? undefined : <T>select</T> }}
          onChange={({ value }) => setSearchParams({ name: QueryParamKey.COMPANY, value })}
          className="jk-br-ie jk-button secondary"
          // containerWidth={1000}
          extend
        />
      );
      
      menu.push({
          label: null,
          icon: null,
          selected: false,
          menuItemWrapper: ({ isOpenVerticalMenu }) => {
            let imageUrl = company?.imageUrl?.replace('horizontal', 'vertical') || '';
            if (viewPortSize === 'sm' && preferredTheme !== Theme.DARK) {
              imageUrl.replace('white', 'color');
            }
            const isSmall = viewPortSize === 'sm';
            return (
              <div
                className={classNames('jk-menu-item menu-item-company-selector', { 'jk-col gap': isSmall })}
              >
                <div className="jk-menu-item-icon" style={{ height: 48 }}>
                  {company && (
                    <Popover
                      triggerOn={isOpenVerticalMenu ? [] : 'click'}
                      content={<div style={{ width: 200 }}>{select}</div>}
                      placement="right"
                    >
                      <Image
                        src={imageUrl}
                        alt={company?.name}
                        width={24}
                        height={48}
                      />
                    </Popover>
                  )}
                </div>
                <div className="jk-menu-item-label" style={{ ...(isSmall ? { width: '100%' } : {}) }}>
                  <div className="menu-item-label-company-selector">
                    {select}
                  </div>
                </div>
              </div>
            )
          },
        },
        { label: <div />, icon: <div />, selected: false },
      );
    }
    menu.push(...initialMenu);
    return menu;
  }, [ initialMenu, companies, company, setSearchParams, isLogged, viewPortSize ]);
  
  const preferredMenuViewMode = menuViewMode || userPreferredMenuViewMode
  
  const logoImageUrl = (viewPortSize === 'sm' && preferredTheme !== Theme.DARK) ? imageUrl.replace(
    'white',
    'color',
  ) : imageUrl;
  
  const drawerMenuMobile = (props: { onClose: () => void, menu: MenuType[] }) => (
    <DrawerViewMenuMobile {...props} logoImageUrl={logoImageUrl} moreApps={moreApps} />
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
          {(isLoading || !logoImageUrl)
            ? <SpinIcon />
            : (
              <Image
                src={logoImageUrl}
                alt={name}
                height={45}
                width={90}
              />
            )}
        </Link>
      </div>
    ),
  };
  
  const topSection = ({ isOpen }: { isOpen: boolean }) => (
    <Link href="/">
      <div className="jk-row" style={{ padding: 'calc(var(--pad-lg) + var(--pad-lg)) 0' }}>
        {(isLoading || !logoImageUrl)
          ? <SpinIcon />
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
          moreApps={moreApps}
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
          {(isLoading || !logoImageUrl)
            ? <SpinIcon />
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
          moreApps={moreApps}
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
      <SignUpModal
        isOpen={searchParams.has(QueryParamKey.SIGN_UP)}
        onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_UP })}
        onSuccess={() => {
          deleteSearchParams({ name: QueryParamKey.SIGN_UP });
          appendSearchParams({ name: QueryParamKey.WELCOME, value: '1' });
        }}
      />
      <LoginModal
        isOpen={searchParams.has(QueryParamKey.SIGN_IN)}
        onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_IN })}
        onSignUpButton={() => {
          deleteSearchParams({ name: QueryParamKey.SIGN_IN });
          appendSearchParams({ name: QueryParamKey.SIGN_UP, value: '1' });
        }}
        multiCompanies={multiCompanies}
      />
      <WelcomeModal
        isOpen={searchParams.has(QueryParamKey.WELCOME)}
        nickname={nickname}
        onClose={() => deleteSearchParams({ name: QueryParamKey.WELCOME })}
        onSeeMyProfile={async (setLoaderStatus, ...props) => {
          setLoaderStatus(Status.LOADING);
          await onSeeMyProfile();
          deleteSearchParams({ name: QueryParamKey.WELCOME })
          setLoaderStatus(Status.SUCCESS);
        }}
      />
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
              <div className="jk-col extend"><SpinIcon size="very-huge" className="cr-py" /></div> : children}
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
              <div className="jk-col extend"><SpinIcon size="very-huge" className="cr-py" /></div> : children}
          </VerticalMenu>
        )}
    </>
  );
};
