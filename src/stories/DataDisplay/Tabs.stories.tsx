import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, T, Tabs as TabsComponent, TabsInline, TabsProps } from '../../index';
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
  const tabs = {
    1: {
      key: '1',
      header: <div>1</div>,
      body: (
        <div className="jk-row gap">
          1
        </div>
      ),
    },
    2: {
      key: '2',
      header: <div>2</div>,
      body: (
        <div className="jk-row gap">
          2
        </div>
      ),
    },
    3: {
      key: '3',
      header: <div className="ws-np">content 3 content 3 content 3 content 3</div>,
      body: <div> CONTENT 3 CONTENT 3</div>,
    },
    4: { key: '4', header: <div className="ws-np">tab 4 4 4 4 4 </div> },
    5: { key: '5', header: <div className="ws-np">tabtabtabtab</div> },
  };
  
  return (
    <JukiProvider>
      <div style={{ height: '200px' }}>
        <TabsComponent
          tabs={Object.values(tabs)}
          extraNodes={[<Button>button 1</Button>, <Button>button button 2</Button>]}
        />
      </div>
      <div style={{ height: '200px', position: 'relative' }}>
        <TabsInline
          tabs={tabs}
          extraNodes={[<Button className="ws-np"><T>button 1</T></Button>, <Button className="ws-np">button button 2</Button>]}
          onChange={() => null}
          selectedTabKey={'1'}
        />
      
      </div>
      <div style={{ height: '200px', position: 'relative', border: '1px solid red' }}>
        <TabsInline
          tabs={tabs}
          extraNodes={[<Button className="ws-np"><T>button 1</T></Button>, <Button className="ws-np">button button 2</Button>]}
          onChange={() => null}
          selectedTabKey={'2'}
          extraNodesPlacement="bottomLeft"
        />
      </div>
      <div style={{ height: '200px' }}>
        <TabsComponent
          tabs={Object.values(tabs)}
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
