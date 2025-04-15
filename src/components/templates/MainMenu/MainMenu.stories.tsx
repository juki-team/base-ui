import { MenuViewMode } from '@juki-team/commons';
import { action, configureActions } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  MainMenu as MainMenuCmp,
  MdMathEditor,
  MdMathViewer,
  T,
  TwoContentLayout as TwoContentLayoutComponent,
} from '../../../index';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from '../../organisms/mdMath/constants';
import {
  FilterListIcon,
  JukiCouchLogoHorImage,
  JukiUtilsLogoHorImage,
  LoadingIcon,
  PlusIcon,
  ViewHeadlineIcon,
} from '../../server';

const meta: Meta<typeof MainMenuCmp> = {
  component: MainMenuCmp,
  argTypes: {
    menuViewMode: {
      options: [ MenuViewMode.HORIZONTAL, MenuViewMode.VERTICAL ],
      control: { type: 'radio' },
    },
  },
  render: ({ menuViewMode }) => (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <MainMenuCmp
          menu={menu}
          onSeeMyProfile={() => console.info('onSeeMyProfile')}
          menuViewMode={menuViewMode}
          multiCompanies
          profileSelected={true}
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
  ),
};

export default meta;

type Story = StoryObj<typeof MainMenuCmp>;

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const menu = [
  {
    label: 'contests',
    icon: <ViewHeadlineIcon />,
    tooltipLabel: 'contests',
    selected: true,
    onClick: () => action('/contests'),
  },
  {
    label: 'problems',
    icon: <PlusIcon />,
    selected: false,
    onClick: () => action('/problems'),
  },
  {
    label: 'admin',
    icon: <FilterListIcon />,
    selected: false,
    onClick: () => action('/admin'),
  },
];

export const MainMenu: Story = {
  args: {},
};

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
