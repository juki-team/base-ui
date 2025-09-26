import { ReactNode } from 'react';
import { action, configureActions } from 'storybook/actions';
import { TriggerAction } from '../../../enums';
import { Button, Popover, T } from '../../atoms';

import { useJukiNotification } from '../../hooks/useJukiNotification';
import { MockupJukiProvider } from '../../mockup';
import { DrawerActionsType } from '../../molecules/Drawer/types';
import { AppsIcon, FilterListIcon, SettingsIcon, ViewHeadlineIcon } from '../../server';
import { HorizontalMenu as HorizontalMenuCmp, MdMathEditor, VerticalMenu } from '../index';
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
      popoverClassName="bc-we jk-br-ie elevation-1"
      content={<div className="cr-g1"> Settings </div>}
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
      open={open}
    >
      <div>
        <Button icon={<SettingsIcon />} type="light" />
      </div>
    </Popover>
    <Popover
      open={open}
      content={
        <div className="jk-col gap more-apps-popover cr-g1">
          <div className="fw-bd tt-se">
            <T>more apps coming soon</T>
          </div>
          <div className="jk-col gap cr-py">
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
        <Button icon={<AppsIcon />} type="text" />
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
      <div className="jk-col gap cr-py" style={{ width: '100px' }}>
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
  children: (
    <div className="cr-we">
      {/*<JukiJudgeLogoHorImage />*/}
    </div>
  ),
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
        addInfoNotification(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        );
        addInfoNotification('Lorem ipsum');
        addQuietNotification(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        );
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
          <MdMathEditor
            value={SAMPLE_MD_CONTENT}
            onChange={() => {
            }}
            informationButton
          />
          <ButtonN />
        </div>
      </HorizontalMenuCmp>
    </div>
  </MockupJukiProvider>
);
