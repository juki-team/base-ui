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
  MdMathViewer,
  PlusIcon,
  SAMPLE_MD_CONTENT,
  T,
  TwoContentLayout as TwoContentLayoutComponent,
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
  {
    label: 'contests',
    icon: <ViewHeadlineIcon />,
    selected: false,
    onClick: () => action('/contests'),
  },
  {
    label: 'problems',
    icon: <PlusIcon />,
    selected: true,
    onClick: () => action('/problems'),
  },
  {
    label: 'admin',
    icon: <FilterListIcon />,
    selected: false,
    onClick: () => action('/admin'),
  },
];

export const MainMenu = () => (
  <MockupJukiProvider>
    <div style={{ height: '500px' }}>
      <MainMenuCmp
        menu={menu}
        onSeeMyProfile={() => console.info('onSeeMyProfile')}
        menuViewMode={MenuViewMode.VERTICAL}
        multiCompanies
        moreApps={
          <>
            <div className="jk-row">
              <div style={{ width: 95 }}>
                <JukiCouchLogoHorImage />
              </div>
              <LoadingIcon size="small" /> <T className="tt-se">developing</T>
              ...
            </div>
            <div className="jk-row">
              <div style={{ width: 95 }}>
                <JukiUtilsLogoHorImage />
              </div>
              <LoadingIcon size="small" /> <T className="tt-se">developing</T>
              ...
            </div>
          </>
        }
      >
        <div className="jk-pg-lg">
          <div className="bc-we jk-pg">
            <MdMathViewer source={SAMPLE_MD_CONTENT} />
          </div>
          <div className="bc-we">
            <MdMathEditor
              source={SAMPLE_MD_CONTENT}
              uploadImageButton
              informationButton
            />
          </div>
        </div>
      </MainMenuCmp>
    </div>
  </MockupJukiProvider>
);

export const MainMenuLoading = () => (
  <MockupJukiProvider>
    <div style={{ height: '100VH' }}>
      <MainMenuCmp
        menu={menu}
        onSeeMyProfile={() => console.info('onSeeMyProfile')}
        menuViewMode={MenuViewMode.VERTICAL}
        multiCompanies
        moreApps={
          <>
            <div className="jk-row">
              <div style={{ width: 95 }}>
                <JukiCouchLogoHorImage />
              </div>
              <LoadingIcon size="small" /> <T className="tt-se">developing</T>
              ...
            </div>
            <div className="jk-row">
              <div style={{ width: 95 }}>
                <JukiUtilsLogoHorImage />
              </div>
              <LoadingIcon size="small" /> <T className="tt-se">developing</T>
              ...
            </div>
          </>
        }
      >
        <TwoContentLayoutComponent loading breadcrumbs={[ <div>a</div> ]}>
          <h1>Title 1</h1>
        </TwoContentLayoutComponent>
      </MainMenuCmp>
    </div>
  </MockupJukiProvider>
);
