import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { oneTab } from '../../../helpers';
import { Input, T } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { MockJkContestTable } from '../../organisms/DataViewer/JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from '../../organisms/DataViewer/JkProblemTableTest/MockJkProblemTable';
import { MockJkUserTable } from '../../organisms/DataViewer/JkUserTableTest/MockJkUserTable';
import { TabsType } from '../Tabs/types';
import { TwoContentLayout as TwoContentLayoutComponent } from './TwoContentLayout';
import { TwoContentLayoutProps } from './types';

const meta: Meta<typeof TwoContentLayoutComponent> = {
  component: TwoContentLayoutComponent,
};

export default meta;

type Story = StoryObj<typeof TwoContentLayoutComponent>;

const Component = <T, >(args: TwoContentLayoutProps<T>) => {
  const [ layout, setLayout ] = useState(1);
  
  const outputTabs: TabsType<string> = {
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
  
  return (
    <MockupJukiProvider>
      <div style={{ position: 'absolute', top: 50, right: 50, zIndex: 10 }}>
        <Input<number> type="number" value={layout} onChange={setLayout} />
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
      </div>
    </MockupJukiProvider>
  );
};
export const Regular: Story = {
  render: (args) => <Component  {...args} />,
};
