import { action, configureActions } from '@storybook/addon-actions';
import React, { ReactNode } from 'react';
import { SAMPLE_MD_CONTENT } from '../constants/md';
import {
  AppsIcon,
  Button,
  ConstructionIcon,
  DrawerActionsType,
  FilterIcon_,
  HeadlineIcon_,
  HorizontalMenu,
  JukiCouchLogoHorImage,
  JukiJudgeLogoHorImage,
  JukiUtilsLogoHorImage,
  MdMathEditor,
  PlusIcon,
  Popover,
  SettingIcon_,
  T,
  useNotification,
  VerticalMenu,
} from '../index';
import { JukiProvider } from './JukiProvider';
import { ToggleThemeButton } from './ToggleThemeButton';

export default {
  title: 'Components/Menus',
  component: VerticalMenu,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const menu = [
  { label: 'contests', icon: <HeadlineIcon_ />, selected: false, onClick: () => action('/contests') },
  { label: 'problems', icon: <PlusIcon />, selected: true, onClick: () => action('/problems') },
  { label: 'admin', icon: <FilterIcon_ />, selected: false, onClick: () => action('/admin') },
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
        <Button icon={<SettingIcon_ />} type="text" />
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
  children: <div className="cr-we"><HeadlineIcon_ /></div>,
  content: ({ close }: DrawerActionsType) => (
    <div className="jk-col gap more-apps-popover">
      <div className="fw-bd tt-se"><T>more apps coming soon</T></div>
      <div className="jk-col gap cr-py" style={{ width: '100px' }}>
        <div className="jk-row">
          <JukiCouchLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
        </div>
        <div className="jk-row">
          <JukiUtilsLogoHorImage /> <ConstructionIcon /> <T className="tt-se">developing</T>...
        </div>
        <div onClick={close}>close right!</div>
      </div>
    </div>
  ),
};

const centerMobile = {
  children: <div className="cr-we"><JukiJudgeLogoHorImage /></div>,
  content: ({ close }: DrawerActionsType) => <div>TOP MENU <div onClick={close}>close top!</div></div>,
};

const drawerMenuMobile = <div>Rest of Menu</div>;

export const MenuVerticalClassic = () => {
  return (
    <div style={{ height: '400px' }}>
      <VerticalMenu
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
      </VerticalMenu>
      <ToggleThemeButton />
    </div>
  );
};

const menuHorizontal = [
  {
    label: 'contests',
    selected: false,
    onClick: () => action('/contests'),
    menuItemWrapper: (children: ReactNode) => <div className="test-children" key="test-contest">{children}</div>,
  },
  { label: 'problems', selected: true, onClick: () => action('/problems') },
  { label: 'admin', icon: <FilterIcon_ />, selected: true, onClick: () => action('/admin') },
];

export const ButtonN = () => {
  const { addInfoNotification, addQuietNotification } = useNotification();
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
export const HorizontalMenuClassic = () => {
  
  return (
    <JukiProvider>
      <div style={{ height: '400px' }}>
        <HorizontalMenu
          menu={menuHorizontal}
          leftSection={<div className="jk-row" style={{ width: '240px' }}><JukiJudgeLogoHorImage /></div>}
          rightSection={<div className="">{rightSection({})}</div>}
          rightMobile={rightMobile}
          centerMobile={centerMobile}
          drawerMenuMobile={drawerMenuMobile}
        >
          <div>
            <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
            <ButtonN />
          </div>
        </HorizontalMenu>
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};
