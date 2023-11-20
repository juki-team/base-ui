import { MenuViewMode } from '@juki-team/commons';
import { action, configureActions } from '@storybook/addon-actions';
import React from 'react';
import {
  FilterListIcon,
  MainMenu as MainMenuCmp,
  MdMathEditor,
  PlusIcon,
  SAMPLE_MD_CONTENT,
  ViewHeadlineIcon,
} from '../../../index';
import { MockupJukiProvider } from '../../mockup';

export default {
  component: MainMenuCmp,
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


export const MainMenu = () => (
  <MockupJukiProvider>
    <div style={{ height: '400px' }}>
      <MainMenuCmp
        menu={menu}
        onSeeMyProfile={() => console.info('onSeeMyProfile')}
        menuViewMode={MenuViewMode.HORIZONTAL}
      >
        <div>
          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
        </div>
      </MainMenuCmp>
    </div>
  </MockupJukiProvider>
);
