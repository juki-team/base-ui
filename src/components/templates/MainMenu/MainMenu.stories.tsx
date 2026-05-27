import { MenuViewMode } from '@juki-team/commons/enums';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action, configureActions } from 'storybook/actions';
import { Button } from '../../atoms/Button/Button';
import { T } from '../../atoms/T/T';
import { AssignmentIcon } from '../../atoms/server/icons/google/AssignmentIcon';
import { LeaderboardIcon } from '../../atoms/server/icons/google/LeaderboardIcon';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { TwoContentLayout } from '../../molecules/layouts/TwoContentLayout';
import { MdMathViewer } from '../../organisms/MdMathViewer/MdMathViewer';
import { MdMathEditor } from '../../organisms/_layz_/MdMathEditor';
import { SAMPLE_MD_CONTENT } from '../../organisms/MdMathViewer/constants';
import { FilterListIcon } from '../../atoms/server/icons/google/FilterListIcon';
import { LoadingIcon } from '../../atoms/server/icons/google/LoadingIcon';
import { ViewHeadlineIcon } from '../../atoms/server/icons/google/ViewHeadlineIcon';
import { MainMenu as MainMenuCmp } from './MainMenu';

const meta: Meta<typeof MainMenuCmp> = {
  component: MainMenuCmp,
  argTypes: {
    menuViewMode: {
      options: [MenuViewMode.HORIZONTAL, MenuViewMode.VERTICAL],
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
          multiOrganizations
          profileSelected={true}
          moreApps={
            <>
              <div className="jk-row">
                <div style={{ width: 95 }}>{/*<JukiCouchLogoHorImage />*/}</div>
                <LoadingIcon size="small" /> <T className="tt-se">developing</T>
                ...
              </div>
              <div className="jk-row">
                <div style={{ width: 95 }}>{/*<JukiUtilsLogoHorImage />*/}</div>
                <LoadingIcon size="small" /> <T className="tt-se">developing</T>
                ...
              </div>
            </>
          }
        >
          <div className="jk-pg-lg ow-ao ht-100">
            <div className="bc-sf-md jk-pg">
              <MdMathViewer source={SAMPLE_MD_CONTENT} />
            </div>
            <div className="bc-sf-md">
              <MdMathEditor value={SAMPLE_MD_CONTENT} onChange={() => {}} informationButton />
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
  const [index, setIndex] = useState(0);
  return (
    <MockupJukiProvider>
      <div style={{ height: '100VH' }}>
        <MainMenuCmp
          menu={menu.map((item, i) => ({ ...item, selected: i === index }))}
          onSeeMyProfile={() => console.info('onSeeMyProfile')}
          menuViewMode={menuViewMode}
          multiOrganizations
          moreApps={
            <>
              <div className="jk-row">
                <div style={{ width: 95 }}>{/*<JukiCouchLogoHorImage />*/}</div>
                <LoadingIcon size="small" /> <T className="tt-se">developing</T>
                ...
              </div>
              <div className="jk-row">
                <div style={{ width: 95 }}>{/*<JukiUtilsLogoHorImage />*/}</div>
                <LoadingIcon size="small" /> <T className="tt-se">developing</T>
                ...
              </div>
            </>
          }
        >
          <TwoContentLayout loading breadcrumbs={[<div>a</div>]}>
            <h1>Title 1</h1>
            <Button
              onClick={() => {
                setIndex((index + 1) % menu.length);
              }}
            >
              click
            </Button>
          </TwoContentLayout>
        </MainMenuCmp>
      </div>
    </MockupJukiProvider>
  );
};

export const MainMenuLoading: Story = {
  render: ({ menuViewMode }) => <Cmp menuViewMode={menuViewMode} />,
};
