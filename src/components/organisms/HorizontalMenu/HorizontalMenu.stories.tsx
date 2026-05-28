import type { ReactNode } from 'react';
import { action, configureActions } from 'storybook/actions';
import { TriggerAction } from '../../../enums';
import { Button } from '../../atoms/Button/Button';
import { T } from '../../atoms/T/T';
import { Popover } from '../../atoms/_lazy_/Popover';

import { useJukiNotification } from '../../hooks/useJukiNotification';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import type { DrawerActionsType } from '../../molecules/Drawer/types';
import { AppsIcon } from '../../atoms/server/icons/google/AppsIcon';
import { FilterListIcon } from '../../atoms/server/icons/google/FilterListIcon';
import { SettingsIcon } from '../../atoms/server/icons/google/SettingsIcon';
import { ViewHeadlineIcon } from '../../atoms/server/icons/google/ViewHeadlineIcon';
import { VerticalMenu } from '../VerticalMenu/VerticalMenu';
import { MdMathEditor } from '../_layz_/MdMathEditor';
import { HorizontalMenu as HorizontalMenuCmp } from './HorizontalMenu';
import { SAMPLE_MD_CONTENT } from '../MdMathViewer/constants';

export default {
  component: VerticalMenu,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const rightSection = ({ open = undefined }: { open?: boolean }) => (
  <div className="jk-row gap" style={{ width: '240px' }}>
    <Popover
      popoverClassName="bc-sf-hi jk-br-ie elevation-1"
      content={<div> Settings </div>}
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
      open={open}
    >
      <div>
        <Button icon={<SettingsIcon />} type="secondary" />
      </div>
    </Popover>
    <Popover
      open={open}
      content={
        <div className="jk-col gap more-apps-popover">
          <div className="fw-bd tt-se">
            <T>more apps coming soon</T>
          </div>
          <div className="jk-col gap">
            <div className="jk-row">
              {/*<JukiCouchLogoHorImage /> <ManufacturingIcon />{' '}*/}
              <T className="tt-se">developing</T>...
            </div>
            <div className="jk-row">
              {/*<JukiUtilsLogoHorImage /> <ManufacturingIcon />{' '}*/}
              <T className="tt-se">developing</T>...
            </div>
          </div>
        </div>
      }
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
    >
      <div>
        <Button icon={<AppsIcon />} type="ghost" />
      </div>
    </Popover>
    <div className="cr-we">User</div>
  </div>
);

const rightMobile = {
  children: (
    <div className="cr-we">
      <ViewHeadlineIcon />
    </div>
  ),
  content: ({ onClose }: DrawerActionsType) => (
    <div className="jk-col gap more-apps-popover">
      <div className="fw-bd tt-se">
        <T>more apps coming soon</T>
      </div>
      <div className="jk-col gap" style={{ width: '100px' }}>
        <div className="jk-row">
          {/*<JukiCouchLogoHorImage /> <ManufacturingIcon />{' '}*/}
          <T className="tt-se">developing</T>...
        </div>
        <div className="jk-row">
          {/*<JukiUtilsLogoHorImage /> <ManufacturingIcon />{' '}*/}
          <T className="tt-se">developing</T>...
        </div>
        <div onClick={onClose}>close right!</div>
      </div>
    </div>
  ),
};

const centerMobile = {
  children: <div className="cr-we">{/*<JukiJudgeLogoHorImage />*/}</div>,
  content: ({ onClose }: DrawerActionsType) => (
    <div>
      TOP MENU <div onClick={onClose}>close top!</div>
    </div>
  ),
};

const drawerMenuMobile = <div>Rest of Menu</div>;

const menuHorizontal = [
  {
    label: 'contests',
    selected: false,
    onClick: () => action('/contests'),
    menuItemWrapper: ({ children }: { children: ReactNode }) => (
      <div className="test-children" key="test-contest">
        {children}
      </div>
    ),
  },
  { label: 'problems', selected: true, onClick: () => action('/problems') },
  {
    label: 'admin',
    icon: <FilterListIcon />,
    selected: true,
    onClick: () => action('/admin'),
  },
];

const ButtonN = () => {
  const { addInfoNotification, addQuietNotification } = useJukiNotification();
  return (
    <Button
      onClick={() => {
        addInfoNotification('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        addInfoNotification('Lorem ipsum');
        addQuietNotification('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
        addQuietNotification('Lorem ipsum ');
      }}
    >
      notification
    </Button>
  );
};

export const HorizontalMenu = () => (
  <MockupJukiProvider>
    <div style={{ height: '400px' }}>
      <HorizontalMenuCmp
        menu={menuHorizontal}
        leftSection={
          <div className="jk-row" style={{ width: '240px' }}>
            {/*<JukiJudgeLogoHorImage />*/}
          </div>
        }
        rightSection={<div className="">{rightSection({})}</div>}
        rightMobile={rightMobile}
        centerMobile={centerMobile}
        drawerMenuMobile={drawerMenuMobile}
      >
        <div>
          <MdMathEditor value={SAMPLE_MD_CONTENT} onChange={() => {}} informationButton />
          <ButtonN />
        </div>
      </HorizontalMenuCmp>
    </div>
  </MockupJukiProvider>
);
