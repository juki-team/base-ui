import { configureActions } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button, T, TabsInline } from '../../../index';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { MockupToggleThemeButton } from '../../mockup/MockupToggleThemeButton';
import { MockJkContestTable } from '../../organisms/DataViewer/JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from '../../organisms/DataViewer/JkProblemTableTest/MockJkProblemTable';
import { MockJkUserTable } from '../../organisms/DataViewer/JkUserTableTest/MockJkUserTable';
import { TabsInlineBody } from './TabsInline';
import { TabsInlineProps, TabsType } from './types';

const meta: Meta<typeof TabsInline> = {
  component: TabsInline,
};

export default meta;

type Story = StoryObj<typeof TabsInline>;

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Component = <T, >(args: TabsInlineProps<T>) => {
  const tabs = {
    1: {
      key: '1',
      header: <div>1</div>,
      body: <div className="jk-row gap">1</div>,
    },
    2: {
      key: '2',
      header: <div>2</div>,
      body: <div className="jk-row gap">2</div>,
    },
    3: {
      key: '3',
      header: (
        <div className="ws-np">content 3 content 3 content 3 content 3</div>
      ),
      body: <div> CONTENT 3 CONTENT 3</div>,
    },
    4: { key: '4', header: <div className="ws-np">tab 4 4 4 4 4 </div> },
    5: { key: '5', header: <div className="ws-np">tabtabtabtab</div> },
  };
  
  const outputTabs: TabsType<string> = {
    ['problems']: {
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
    test: {
      key: 'test',
      header: 'test',
      body: (
        <div>test</div>
      ),
    },
  };
  
  const [ outputTab, setOutputTab ] = useState('problems');
  
  return (
    <MockupJukiProvider>
      {/*<div style={{ height: '200px' }}>*/}
      {/*  <TabsComponent*/}
      {/*    tabs={Object.values(tabs)}*/}
      {/*    extraNodes={[*/}
      {/*      <Button>button 1</Button>,*/}
      {/*      <Button>button button 2</Button>,*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</div>*/}
      <div style={{ height: '200px', position: 'relative' }}>
        <TabsInline
          {...args}
          tabs={tabs}
          extraNodes={[
            <Button className="ws-np">
              <T>button 1</T>
            </Button>,
            <Button className="ws-np">button button 2</Button>,
          ]}
          onChange={() => null}
          selectedTabKey={'1'}
          tickStyle="background"
        />
      </div>
      <div
        style={{
          height: '200px',
          position: 'relative',
          border: '1px solid red',
        }}
      >
        <TabsInline
          tabs={tabs}
          extraNodes={[
            <Button className="ws-np">
              <T>button 1</T>
            </Button>,
            <Button className="ws-np">button button 2</Button>,
          ]}
          onChange={() => null}
          selectedTabKey={'2'}
          extraNodesPlacement="bottomLeft"
        />
      </div>
      <div className="jk-col gap nowrap bc-wd" style={{ height: 400 }}>
        <TabsInline tabs={outputTabs} onChange={setOutputTab} selectedTabKey={outputTab} tickStyle="background" />
        <div className="flex-1" style={{ overflow: 'auto', width: '100%', height: '300px', position: 'relative' }}>
          <TabsInlineBody tabs={outputTabs} selectedTabKey={outputTab} />
        </div>
      </div>
      {/*<div style={{ height: '200px' }}>*/}
      {/*  <TabsComponent*/}
      {/*    tabs={Object.values(tabs)}*/}
      {/*    extraNodes={[ <Button>button 1</Button> ]}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div style={{ height: '200px' }}>*/}
      {/*  <TabsComponent*/}
      {/*    tabs={[*/}
      {/*      { key: '1', header: <div>tab 1 </div>, body: <div>1</div> },*/}
      {/*      { key: '2', header: <div>tab 2</div> },*/}
      {/*    ]}*/}
      {/*    extraNodes={[ <Button>button 1</Button>, <Button>button 2</Button> ]}*/}
      {/*  />*/}
      {/*</div>*/}
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => <Component {...args} />,
};
