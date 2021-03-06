import { action, configureActions } from '@storybook/addon-actions';
import React from 'react';
import {
  AppsIcon,
  Button,
  ConstructionIcon,
  DrawerActionsType,
  FilterIcon,
  HeadlineIcon,
  HorizontalMenu,
  JukiCouchLogoHorImage,
  JukiJudgeLogoHorImage,
  JukiUtilsLogoHorImage,
  MdMathEditor,
  PlusIcon,
  Popover,
  SettingIcon,
  T,
  VerticalMenu,
} from '../index';
import { SAMPLE_MD_CONTENT } from '../constants/md';

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
  { label: 'contests', icon: <HeadlineIcon />, selected: false, onClick: () => action('/contests') },
  { label: 'problems', icon: <PlusIcon />, selected: true, onClick: () => action('/problems') },
  { label: 'admin', icon: <FilterIcon />, selected: false, onClick: () => action('/admin') },
];

const rightSection = ({ open = undefined }: { open?: boolean }) => (
  <div className="jk-row gap" style={{ width: '240px' }}>
    <Popover
      content={<div className="color-gray-1"> Settings </div>}
      triggerOn="click"
      placement="bottom"
      visible={open}
    >
      <div>
        <Button icon={<SettingIcon />} type="text" />
      </div>
    </Popover>
    <Popover
      visible={open}
      content={
        <div className="jk-col gap more-apps-popover color-gray-1">
          <div className="tx-wd-bold text-sentence-case"><T>more apps coming soon</T></div>
          <div className="jk-col gap color-primary">
            <div className="jk-row">
              <JukiCouchLogoHorImage /> <ConstructionIcon /> <T className="text-sentence-case">developing</T>...
            </div>
            <div className="jk-row">
              <JukiUtilsLogoHorImage /> <ConstructionIcon /> <T className="text-sentence-case">developing</T>...
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
    <div className="color-white">User</div>
  </div>
);

const rightMobile = {
  children: <div className="color-white"><HeadlineIcon /></div>,
  content: ({ close }: DrawerActionsType) => (
    <div className="jk-col gap more-apps-popover">
      <div className="tx-wd-bold text-sentence-case"><T>more apps coming soon</T></div>
      <div className="jk-col gap color-primary" style={{ width: '100px' }}>
        <div className="jk-row">
          <JukiCouchLogoHorImage /> <ConstructionIcon /> <T className="text-sentence-case">developing</T>...
        </div>
        <div className="jk-row">
          <JukiUtilsLogoHorImage /> <ConstructionIcon /> <T className="text-sentence-case">developing</T>...
        </div>
        <div onClick={close}>close right!</div>
      </div>
    </div>
  ),
};

const centerMobile = {
  children: <div className="color-white"><JukiJudgeLogoHorImage /></div>,
  content: ({ close }: DrawerActionsType) => <div>TOP MENU <div onClick={close}>close top!</div></div>,
};

const leftMobile = {
  children: ({ toggle }: DrawerActionsType) => <div className="color-white">LEFT
    <div onClick={toggle}>toggle</div>
  </div>,
  content: ({ close }: DrawerActionsType) => <div>LEFT MENU <div onClick={close}>close left!</div></div>,
};

export const MenuVerticalClassic = () => {
  return (
    <div style={{ height: '400px' }}>
      <VerticalMenu
        menu={menu}
        topSection={<div className="jk-row color-white" style={{ width: '60px' }}><JukiJudgeLogoHorImage /></div>}
        bottomSection={<div className="color-white">{rightSection({})}</div>}
        rightMobile={rightMobile}
        centerMobile={centerMobile}
        leftMobile={leftMobile}
      >
        <div style={{ background: 'bisque' }}>
          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
        </div>
      </VerticalMenu>
    </div>
  );
};

const menuHorizontal = [
  { label: 'contests', selected: false, onClick: () => action('/contests') },
  { label: 'problems', selected: true, onClick: () => action('/problems') },
  { label: 'admin', icon: <FilterIcon />, selected: true, onClick: () => action('/admin') },
];

export const HorizontalMenuClassic = () => {
  return (
    <div style={{ height: '400px' }}>
      <HorizontalMenu
        menu={menuHorizontal}
        left={<div className="jk-row color-white" style={{ width: '240px' }}><JukiJudgeLogoHorImage /></div>}
        right={<div className="color-white">{rightSection({})}</div>}
        rightMobile={rightMobile}
        centerMobile={centerMobile}
        leftMobile={leftMobile}
      >
        <div style={{ background: 'bisque' }}>
          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
        </div>
      </HorizontalMenu>
    </div>
  );
};