import { action, configureActions } from '@storybook/addon-actions';
import React from 'react';
import {
  AppsIcon,
  Button,
  ConstructionIcon,
  DrawerActionsType,
  FilterListIcon,
  JukiCouchLogoHorImage,
  JukiJudgeLogoHorImage,
  JukiUtilsLogoHorImage,
  MdMathEditor,
  PlusIcon,
  Popover, SAMPLE_MD_CONTENT,
  SettingsIcon,
  T,
  VerticalMenu as VerticalMenuCmp,
  ViewHeadlineIcon,
} from '../../index';
import { MockupToggleThemeButton } from '../../components/mockup/MockupToggleThemeButton';

export default {
  title: 'Components/General',
  component: VerticalMenuCmp,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const menu = [
  { label: 'contests', icon: <ViewHeadlineIcon />, selected: false, onClick: () => action('/contests') },
  { label: 'problems', icon: <PlusIcon />, selected: true, onClick: () => action('/problems') },
  { label: 'admin', icon: <FilterListIcon />, selected: false, onClick: () => action('/admin') },
];

const rightSection = ({ open = undefined }: { open?: boolean }) => (
  <div className="jk-row gap" style={{ width: '240px' }}>
    <Popover
      content={<div className="cr-g1"> Settings </div>}
      triggerOn="click"
      placement="bottom"
      visible={open}
    >
      <div>
        <Button icon={<SettingsIcon />} type="text" />
      </div>
    </Popover>
    <Popover
      visible={open}
      content={
        <div className="jk-col gap more-apps-popover cr-g1">
          <div className="fw-bd tt-se"><T>more apps coming soon</T></div>
          <div className="jk-col gap cr-py">
            <div className="jk-row">
              <JukiCouchLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
            </div>
            <div className="jk-row">
              <JukiUtilsLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
            </div>
          </div>
        </div>
      }
      triggerOn="click"
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
  children: <div className="cr-we"><ViewHeadlineIcon /></div>,
  content: ({ onClose }: DrawerActionsType) => (
    <div className="jk-col gap more-apps-popover">
      <div className="fw-bd tt-se"><T>more apps coming soon</T></div>
      <div className="jk-col gap cr-py" style={{ width: '100px' }}>
        <div className="jk-row">
          <JukiCouchLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
        </div>
        <div className="jk-row">
          <JukiUtilsLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
        </div>
        <div onClick={onClose}>close right!</div>
      </div>
    </div>
  ),
};

const centerMobile = {
  children: <div className="cr-we"><JukiJudgeLogoHorImage /></div>,
  content: ({ onClose }: DrawerActionsType) => <div>TOP MENU <div onClick={onClose}>close top!</div></div>,
};

const drawerMenuMobile = <div>Rest of Menu</div>;

export const VerticalMenu = () => (
  <div style={{ height: '400px' }}>
    <VerticalMenuCmp
      menu={menu}
      topSection={<div className="jk-row" style={{ width: '60px' }}><JukiJudgeLogoHorImage /></div>}
      bottomSection={<div className="">{rightSection({})}</div>}
      rightMobile={rightMobile}
      centerMobile={centerMobile}
      drawerMenuMobile={drawerMenuMobile}
    >
      <div>
        <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
      </div>
    </VerticalMenuCmp>
    <MockupToggleThemeButton />
  </div>
);
