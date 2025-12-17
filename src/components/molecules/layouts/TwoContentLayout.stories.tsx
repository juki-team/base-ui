import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { EMPTY_USER } from '../../../constants';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, Input, T } from '../../atoms';
import { oneTab } from '../../helpers';
import { MockupJukiProvider } from '../../mockup';
import { MockJkContestTable } from '../../organisms/_layz_/DataViewer/JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from '../../organisms/_layz_/DataViewer/JkProblemTableTest/MockJkProblemTable';
import { MockJkUserTable } from '../../organisms/_layz_/DataViewer/JkUserTableTest/MockJkUserTable';
import { TabsType } from '../../types';
import { ApplicationLoaderLayout } from './ApplicationLoaderLayout';
import { TwoContentLayout as TwoContentLayoutComponent } from './TwoContentLayout';
import { TwoContentLayoutProps } from './types';
import { UserLoaderLayout } from './UserLoaderLayout';

const meta: Meta<typeof TwoContentLayoutComponent> = {
  component: TwoContentLayoutComponent,
};

export default meta;

type Story = StoryObj<typeof TwoContentLayoutComponent>;

const UserLoader = () => {
  
  const user = useUserStore(store => store.user);
  const setUser = useUserStore(store => store.setUser);
  
  return (
    <Button
      onClick={() => {
        setUser(EMPTY_USER);
        setTimeout(() => setUser(user), 3000);
      }}
    >
      user loader
    </Button>
  );
};

const Component = <T, >(args: TwoContentLayoutProps<T>) => {
  const [ layout, setLayout ] = useState(1);
  
  const outputTabs: TabsType = {
    problems: {
      key: 'problems',
      header: <div>problems</div>,
      body: (
        <div className="jk-row gap">
          <MockJkProblemTable />
        </div>
      ),
    },
    contests: {
      key: 'contests',
      header: <div>contests</div>,
      body: (
        <div className="jk-row gap">
          <MockJkContestTable />
        </div>
      ),
    },
    users: {
      key: 'users',
      header: <div>users</div>,
      body: (
        <div className="jk-row gap">
          <MockJkUserTable />
        </div>
      ),
    },
  };
  const [ isOpenAppLoader, setIsOpenAppLoader ] = useState(false);
  
  return (
    <MockupJukiProvider>
      {isOpenAppLoader && <ApplicationLoaderLayout />}
      <UserLoaderLayout />
      <div style={{ position: 'absolute', top: 50, right: 50, zIndex: 10 }}>
        <Input<number> type="number" value={layout} onChange={setLayout} />
        <div>
          <Button
            onClick={() => {
              setIsOpenAppLoader(true);
              setTimeout(() => setIsOpenAppLoader(false), 3000);
            }}
          >
            app loader
          </Button>
          <UserLoader />
        </div>
      </div>
      <div className="jk-col gap" style={{ height: 400 }}>
        {layout === 1 && (
          <TwoContentLayoutComponent {...args} loading>
            <h1>Title 1 loading</h1>
          </TwoContentLayoutComponent>
        )}
        {layout === 2 && (
          <TwoContentLayoutComponent<T>
            {...args}
            getHrefOnTabChange={() => '#'}
            breadcrumbs={[ <div>a</div>, <div>b</div> ]}
            tabs={outputTabs as unknown as TabsType<T>}
          >
            <h1>Title 2</h1>
          </TwoContentLayoutComponent>
        )}
        {layout === 3 && (
          <TwoContentLayoutComponent {...args}>
            <h1>Title 3</h1>
          </TwoContentLayoutComponent>
        )}
        {layout === 4 && (
          <TwoContentLayoutComponent {...args} loading={<><T>loading</T>...</>}>
            <h1>Title 1 loading</h1>
          </TwoContentLayoutComponent>
        )}
        {layout === 5 && (
          <TwoContentLayoutComponent tabs={oneTab(<div>one tab</div>)}>
            <h1>Title 5</h1>
          </TwoContentLayoutComponent>
        )}
        {layout === 6 && (
          <div className="expand-absolute jk-row">
            <h1>Title 6</h1>
          </div>
        )}
        {layout === 7 && (
          <TwoContentLayoutComponent tabs={oneTab(<div className="expand-absolute jk-col">one tab</div>)}>
            <h1>Title 7</h1>
          </TwoContentLayoutComponent>
        )}
      </div>
    </MockupJukiProvider>
  );
};
export const Regular: Story = {
  render: (args) => <Component  {...args} />,
};
