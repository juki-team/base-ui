import { MenuViewMode } from '@juki-team/commons';
import { action, configureActions } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import {
  Button,
  MainMenu as MainMenuCmp,
  MdMathEditor,
  MdMathViewer,
  T,
  TwoContentLayout as TwoContentLayoutComponent,
} from '../../../index';
import { AssignmentIcon } from '../../atoms/server/icons/google/AssignmentIcon';
import { LeaderboardIcon } from '../../atoms/server/icons/google/LeaderboardIcon';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from '../../organisms/mdMath/constants';
import {
  FilterListIcon,
  JukiCouchLogoHorImage,
  JukiUtilsLogoHorImage,
  LoadingIcon,
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
          <div className="jk-pg-lg ow-ao ht-100">
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
    icon: <ViewHeadlineIcon size="small" />,
    tooltipLabel: 'contests',
    selected: true,
    onClick: () => action('/contests'),
  },
  {
    label: 'problems',
    icon: <AssignmentIcon size="small" />,
    selected: false,
    onClick: () => action('/problems'),
  },
  {
    label: 'ranking',
    icon: <LeaderboardIcon size="small" />,
    selected: false,
    onClick: () => action('/admin'),
  },
  {
    label: 'admin',
    icon: <FilterListIcon size="small" />,
    selected: false,
    onClick: () => action('/admin'),
  },
];

export const MainMenu: Story = {
  args: {},
};

const Cmp = ({ menuViewMode }: { menuViewMode?: MenuViewMode }) => {
  const [ index, setIndex ] = useState(0);
  return (
    <MockupJukiProvider>
      <div style={{ height: '100VH' }}>
        <MainMenuCmp
          menu={menu.map((item, i) => ({ ...item, selected: i === index }))}
          onSeeMyProfile={() => console.info('onSeeMyProfile')}
          menuViewMode={menuViewMode}
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
            <Button
              onClick={() => {
                setIndex((index + 1) % menu.length);
              }}
            >
              click
            </Button>
          </TwoContentLayoutComponent>
        </MainMenuCmp>
      </div>
    </MockupJukiProvider>
  );
};

export const MainMenuLoading: Story = {
  render: ({ menuViewMode }) => (
    <Cmp menuViewMode={menuViewMode} />
  ),
};
