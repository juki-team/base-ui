import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupToggleThemeButton } from '../../mockup/MockupToggleThemeButton';
import { JudgeTabs } from '../Tabs/mocks/JudgeTabs';
import { SplitPane as SplitPaneComponent } from './SplitPane';

const meta: Meta<typeof SplitPaneComponent> = {
  component: SplitPaneComponent,
};

export default meta;

type Story = StoryObj<typeof SplitPaneComponent>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ border: '1px solid red', width: 800, height: 1000 }}>
      <SplitPaneComponent toggleable {...args}>
        <div style={{ background: '' }}>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ pane: 'both', align: 'right', hideLabel: '' }} closableSecondPane={{ align: 'right', hideLabel: '' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="row"
              closableFirstPane={{ align: 'right', hideLabel: '' }}
              closableSecondPane={{ align: 'right', hideLabel: '' }}
              toggleable
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>
                <JudgeTabs />
              </div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'center' }} closableSecondPane={{align: 'center'}}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="row"
              closableFirstPane={{ align: 'center' }}
              closableSecondPane={{ align: 'center' }}
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'left' }} closableSecondPane={{align: 'left'}}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="row"
              closableFirstPane={{ align: 'left' }}
              closableSecondPane={{ align: 'left' }}
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
        </div>
        <div style={{ background: '' }}>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'right', hideLabel: '' }} closableSecondPane={{ align: 'right' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="column"
              closableFirstPane={{ align: 'right', hideLabel: '' }}
              closableSecondPane={{ align: 'right' }}
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'center' }} closableSecondPane={{ align: 'center' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="column"
              closableFirstPane={{ align: 'center' }}
              closableSecondPane={{ align: 'center' }}
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'left' }} closableSecondPane={{ align: 'left' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent
              minSize={1}
              direction="column"
              closableFirstPane={{ align: 'left' }}
              closableSecondPane={{ align: 'left' }}
            >
              <div style={{ background: 'yellow' }}>
                A<br />A
              </div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          <MockupToggleThemeButton />
        </div>
      </SplitPaneComponent>
    </div>
  ),
};
