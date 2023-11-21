import { MenuViewMode } from '@juki-team/commons';
import { action, configureActions } from '@storybook/addon-actions';
import React from 'react';
import {
  FilterListIcon,
  JukiCouchLogoHorImage,
  JukiUtilsLogoHorImage,
  LoadingIcon,
  MainMenu as MainMenuCmp,
  MdMathEditor,
  PlusIcon,
  SAMPLE_MD_CONTENT,
  T,
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
        moreApps={
          <>
            <div className="jk-row">
              <JukiCouchLogoHorImage /> <LoadingIcon size="small" /> <T className="tt-se">developing</T>...
            </div>
            <div className="jk-row">
              <JukiUtilsLogoHorImage /> <LoadingIcon size="small" /> <T className="tt-se">developing</T>...
            </div>
          </>
        }
      >
        <div>
          <MdMathEditor source={SAMPLE_MD_CONTENT} uploadImageButton informationButton />
        </div>
      </MainMenuCmp>
    </div>
  </MockupJukiProvider>
);
