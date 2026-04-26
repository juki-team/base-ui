import type { OrganizationUserPermissionsResponseDTO } from '@juki-team/commons/dto';
import { MenuViewMode, ProfileSetting, Theme } from '@juki-team/commons/enums';
import type { ContentsResponse } from '@juki-team/commons/types';
import { useMemo, useState } from 'react';
import { QueryParamKey, TriggerAction } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Popover, Select, T } from '../../atoms';
import { classNames } from '../../helpers';
import { useFetcher } from '../../hooks/useFetcher';
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
    onSeeMyProfile,
    menuViewMode,
    profileSelected,
    moreApps,
    multiCompanies,
    children,
    topImageUrl,
    onBack,
  } = props;

  const { Link, Image } = useUIStore((store) => store.components);
  const viewPortSize = usePageStore((store) => store.viewPort.screen);
  const searchParams = useRouterStore((state) => state.searchParams);
  const setSearchParams = useRouterStore((state) => state.setSearchParams);
  const isLoading = useUserStore((state) => state.isLoading);
  const { imageUrl: companyImageUrl, name, styles } = useUserStore((state) => state.company);
  const {
    isLogged,
    settings: { [ProfileSetting.THEME]: preferredTheme, [ProfileSetting.MENU_VIEW_MODE]: userPreferredMenuViewMode },
  } = useUserStore((state) => state.user);

  const imageUrl = topImageUrl || companyImageUrl;

  const { data } = useFetcher<ContentsResponse<OrganizationUserPermissionsResponseDTO>>(
    multiCompanies && isLogged ? jukiApiManager.API_V2.company.getPermissionList().url : null,
  );
  const companyKey = searchParams.get(QueryParamKey.COMPANY) as string;
  const companies: OrganizationUserPermissionsResponseDTO[] = useMemo(() => (data?.success ? data.contents : []), [data]);
  const company = useMemo(() => companies.find((company) => company.key === companyKey), [companyKey, companies]);
  const isSmall = viewPortSize === 'sm';
  const isMedium = viewPortSize === 'md';
  const [helpOpen, setHelpOpen] = useState(false);

  const content = useMemo(() => (isLoading ? <JukiLoadingLayout /> : children), [isLoading, children]);

  const menu = useMemo(() => {
    const menu: MenuType[] = [];
    const enabled = false;
    if (multiCompanies && isLogged && enabled) {
      const select = (
        <Select
          options={companies.map((company) => ({
            value: company.key,
            label: <span className="ws-np">{company.name}</span>,
          }))}
          selectedOption={{ value: company?.key || '', label: company?.key ? undefined : <T>select</T> }}
          onChange={({ value }) => setSearchParams({ name: QueryParamKey.COMPANY, value })}
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
            let imageUrl = company?.imageUrl?.replace('horizontal', 'vertical') || '';
            if (isSmall && preferredTheme !== Theme.DARK) {
              imageUrl = imageUrl.replace('white', 'color');
            }

            return (
              <div className={classNames('jk-menu-item menu-item-company-selector cr-tx-ht-it', { 'jk-col gap': isSmall })}>
                <div className="jk-menu-item-icon" style={{ height: 48 }}>
                  {company && (
                    <Popover
                      popoverClassName="bc-sf-hi jk-br-ie elevation-1"
                      triggerOn={isOpenVerticalMenu ? [] : TriggerAction.CLICK}
                      content={<div style={{ width: 200 }}>{select}</div>}
                      placement="right"
                    >
                      <Image src={imageUrl} alt={company?.name} width={24} height={48} />
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
  }, [multiCompanies, isLogged, initialMenu, companies, company, setSearchParams, isSmall, preferredTheme, Image]);

  const preferredMenuViewMode = menuViewMode || userPreferredMenuViewMode;

  const logoImageUrl =
    styles?.[preferredTheme?.toLowerCase() as 'light']?.navbar?.logoTheme === Theme.LIGHT
      ? imageUrl.replace('white', 'color')
      : imageUrl;

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
