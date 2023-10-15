import { action, configureActions } from '@storybook/addon-actions';
import React from 'react';
import {
  FilterListIcon,
  MainMenu as MainMenuCmp,
  MdMathEditor,
  PlusIcon,
  SAMPLE_MD_CONTENT,
  ViewHeadlineIcon,
} from '../../index';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
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
  <JukiProvider>
    <div style={{ height: '400px' }}>
      <MainMenuCmp
        menu={menu}
        onSeeMyProfile={() => console.log('onSeeMyProfile')}
      >
        <div>
          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
        </div>
      </MainMenuCmp>
      <ToggleThemeButton />
    </div>
  </JukiProvider>
);
