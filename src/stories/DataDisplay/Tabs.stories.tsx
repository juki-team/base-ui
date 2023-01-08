import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, Tabs as TabsComponent, TabsProps } from '../../index';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Data Display',
  component: TabsComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Tabs: Story<TabsProps<string>> = () => {
  const tabs = [
    {
      key: '1',
      header: <div>1</div>,
      body: (
        <div className="jk-row gap">
          1
        </div>
      ),
    },
    {
      key: '2',
      header: <div>2</div>,
      body: (
        <div className="jk-row gap">
          2
        </div>
      ),
    },
    {
      key: '3',
      header: <div>content 3 content 3 content 3 content 3</div>,
      body: <div> CONTENT 3 CONTENT 3</div>,
    },
    { key: '4', header: <div>tab 4 4 4 4 4 </div> },
    { key: '5', header: <div>tabtabtabtab</div> },
  ];
  return (
    <JukiProvider>
      <div style={{ height: '200px' }}>
        <TabsComponent
          tabs={tabs}
          extraNodes={[<Button>button 1</Button>, <Button>button button 2</Button>]}
        />
      </div>
      <div style={{ height: '200px' }}>
        <TabsComponent
          tabs={tabs}
          extraNodes={[<Button>button 1</Button>]}
        />
      </div>
      <div style={{ height: '200px' }}>
        <TabsComponent
          tabs={[
            { key: '1', header: <div>tab 1 </div>, body: <div>1</div> },
            { key: '2', header: <div>tab 2</div> },
          ]}
          extraNodes={[<Button>button 1</Button>, <Button>button 2</Button>]}
        />
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};
