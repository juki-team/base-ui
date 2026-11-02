import {
  type ContentsResponse,
  MenuViewMode,
  type OrganizationUserPermissionsResponseDto,
  ProfileSetting,
  Theme,
} from '@juki-team/commons';
import { useCallback, useMemo, useState } from 'react';
import { QueryParamKey, TriggerAction } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Popover, Select, T } from '../../atoms';
import { classNames } from '../../helpers';
import { useFetcher } from '../../hooks/useFetcher';
import { useStableRef } from '../../hooks/useStableRef';
import { JukiLoadingLayout } from '../../molecules';
import { HorizontalMenu, LoginUser, VerticalMenu } from '../../organisms';
import type { MenuType } from '../../organisms/types';
import { SpinIcon } from '../../server';
import { SettingsSection } from './SettingsSection';
import type { MainMenuProps } from './types';

const LOGO_SIZE = {
  '': 160,
  sm: 80,
  md: 120,
  lg: 160,
  hg: 192,
};

export function MainMenu(props: MainMenuProps) {
  const {
    menu: initialMenu,
    onSeeMyProfile: _onSeeMyProfile,
    menuViewMode,
    profileSelected,
    moreApps,
    multiOrganizations,
    children,
    topImageUrl,
    onBack,
  } = props;

  const { Link, Image } = useUIStore((store) => store.components);
  const viewPortSize = usePageStore((store) => store.viewPort.screen);
  const setSearchParams = useRouterStore((state) => state.setSearchParams);
  const isLoading = useUserStore((state) => state.isLoading);
  const { imageUrl: organizationImageUrl, name, styles } = useUserStore((state) => state.organization);
  // only the fields the menu uses (not the whole user object, which changes with any user update)
  const isLogged = useUserStore((state) => state.user.isLogged);
  const preferredTheme = useUserStore((state) => state.user.settings[ProfileSetting.THEME]);
  const userPreferredMenuViewMode = useUserStore((state) => state.user.settings[ProfileSetting.MENU_VIEW_MODE]);

  const imageUrl = topImageUrl || organizationImageUrl;

  // consumers usually pass an inline callback: keep a stable one so the memoized LoginUser doesn't re-render
  const onSeeMyProfileRef = useStableRef(_onSeeMyProfile);
  const onSeeMyProfile = useCallback<NonNullable<MainMenuProps['onSeeMyProfile']>>(
    (...args) => onSeeMyProfileRef.current?.(...args),
    [onSeeMyProfileRef],
  );

  // The organization selector (multi-organization installations) is disabled. While it is, don't fetch the
  // permission list nor subscribe to the URL (every navigation re-rendered the whole menu).
  const enabled = false;
  const withOrganizationSelector = !!multiOrganizations && isLogged && enabled;
  const { data } = useFetcher<ContentsResponse<OrganizationUserPermissionsResponseDto>>(
    withOrganizationSelector ? jukiApiManager.API_V2.organization.getPermissionList().url : null,
  );
  const organizationKey = useRouterStore((state) =>
    withOrganizationSelector ? (state.searchParams.get(QueryParamKey.ORGANIZATION) as string) : '',
  );
  const organizations = useMemo(() => (data?.success ? data.contents : []), [data]);
  const organization = useMemo(() => organizations.find((organization) => organization.key === organizationKey), [organizationKey, organizations]);
  const isSmall = viewPortSize === 'sm';
  const isMedium = viewPortSize === 'md';
  const [helpOpen, setHelpOpen] = useState(false);

  const content = useMemo(() => (isLoading ? <JukiLoadingLayout /> : children), [isLoading, children]);

  const menu = useMemo(() => {
    const menu: MenuType[] = [];
    if (withOrganizationSelector) {
      const select = (
        <Select
          options={organizations.map((organization) => ({
            value: organization.key,
            label: <span className="ws-np">{organization.name}</span>,
          }))}
          selectedOption={{ value: organization?.key || '', label: organization?.key ? undefined : <T>select</T> }}
          onChange={({ value }) => setSearchParams({ name: QueryParamKey.ORGANIZATION, value })}
          className="jk-br-ie jk-button secondary"
          // containerWidth={1000}
          expand
        />
      );

      menu.push(
        {
          label: null,
          icon: null,
          selected: false,
          menuItemWrapper: ({ isOpenVerticalMenu }) => {
            let imageUrl = organization?.imageUrl?.replace('horizontal', 'vertical') || '';
            if (isSmall && preferredTheme !== Theme.DARK) {
              imageUrl = imageUrl.replace('white', 'color');
            }

            return (
              <div className={classNames('jk-menu-item menu-item-organization-selector cr-tx-ht-it', { 'jk-col gap': isSmall })}>
                <div className="jk-menu-item-icon" style={{ height: 48 }}>
                  {organization && (
                    <Popover
                      popoverClassName="bc-sf-hi jk-br-ie elevation-1"
                      triggerOn={isOpenVerticalMenu ? [] : TriggerAction.CLICK}
                      content={<div style={{ width: 200 }}>{select}</div>}
                      placement="right"
                    >
                      <Image src={imageUrl} alt={organization?.name} width={24} height={48} />
                    </Popover>
                  )}
                </div>
                <div className="jk-menu-item-label" style={{ ...(isSmall ? { width: '100%' } : {}) }}>
                  {select}
                </div>
              </div>
            );
          },
        },
        { label: <div />, icon: <div />, selected: false },
      );
    }
    menu.push(...initialMenu);
    return menu;
  }, [withOrganizationSelector, initialMenu, organizations, organization, setSearchParams, isSmall, preferredTheme, Image]);

  const preferredMenuViewMode = menuViewMode || userPreferredMenuViewMode;

  const logoImageUrl =
    styles?.[preferredTheme || Theme.LIGHT]?.navbar?.logoTheme === Theme.LIGHT ? imageUrl.replace('white', 'color') : imageUrl;

  // const drawerMenuMobile = (props: { onClose: () => void, menu: MenuType[] }) => (
  //   <DrawerViewMenuMobile {...props} logoImageUrl={logoImageUrl} moreApps={moreApps} />
  // );

  const rightMobile = {
    children: (
      <LoginUser popoverPlacement="bottom-end" isHorizontal onSeeMyProfile={onSeeMyProfile} profileSelected={profileSelected} />
    ),
  };

  const centerMobile = {
    children: (
      <div className="jk-row">
        <Link href="/" style={{ display: 'contents' }}>
          {isLoading || !logoImageUrl ? <SpinIcon /> : <Image src={logoImageUrl} alt={name} height={40} width={80} />}
        </Link>
      </div>
    ),
  };

  const topSection = ({ isOpen }: { isOpen: boolean }) => (
    <Link href="/">
      <div className="jk-row" style={{ height: '100%' }}>
        {isLoading || !logoImageUrl ? (
          <SpinIcon />
        ) : (
          <Image
            src={isOpen ? logoImageUrl : logoImageUrl.replace('horizontal', 'vertical')}
            alt={name}
            height={isOpen ? LOGO_SIZE[viewPortSize] / 2 : 80}
            width={isOpen ? LOGO_SIZE[viewPortSize] : 40}
          />
        )}
      </div>
    </Link>
  );

  const bottomSection = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <div
        className={classNames('jk-col stretch gap settings-apps-login-user-content nowrap jk-pg-tb', {
          'jk-pg-xsm-rl': isOpen,
        })}
      >
        <SettingsSection
          isOpen={isOpen}
          isMobile={false}
          helpOpen={helpOpen}
          setHelpOpen={setHelpOpen}
          popoverPlacement="right"
          moreApps={moreApps}
        />
        <LoginUser
          withLabel={isOpen && !(isSmall || isMedium)}
          isVertical
          popoverPlacement="right-end"
          onSeeMyProfile={onSeeMyProfile}
          profileSelected={profileSelected}
          className={isOpen && !(isSmall || isMedium) ? 'left' : ''}
        />
      </div>
    );
  };

  const leftSection = () => (
    <Link href="/">
      <div className="jk-col extend">
        <div className="jk-row jk-pg-rl">
          {isLoading || !logoImageUrl ? (
            <SpinIcon />
          ) : (
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
      <div className="jk-row stretch gap-2 settings-apps-login-user-content nowrap jk-pg-rl">
        <SettingsSection
          isOpen={false}
          isMobile={false}
          helpOpen={helpOpen}
          setHelpOpen={setHelpOpen}
          popoverPlacement="bottom"
          moreApps={moreApps}
        />
        <LoginUser
          withLabel={!(isSmall || isMedium)}
          isHorizontal
          popoverPlacement="bottom-end"
          onSeeMyProfile={onSeeMyProfile}
          profileSelected={profileSelected}
        />
      </div>
    );
  };

  return preferredMenuViewMode === MenuViewMode.HORIZONTAL ? (
    <HorizontalMenu
      menu={menu}
      leftSection={leftSection}
      rightSection={rightSection}
      // drawerMenuMobile={drawerMenuMobile}
      rightMobile={rightMobile}
      centerMobile={centerMobile}
      onBack={onBack}
    >
      {content}
    </HorizontalMenu>
  ) : (
    <VerticalMenu
      menu={menu}
      topSection={topSection}
      bottomSection={bottomSection}
      // drawerMenuMobile={drawerMenuMobile}
      rightMobile={rightMobile}
      centerMobile={centerMobile}
      onBack={onBack}
    >
      {content}
    </VerticalMenu>
  );
}
