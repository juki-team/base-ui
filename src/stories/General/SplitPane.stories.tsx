import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { SplitPane as SplitPaneComponent, SplitPaneProps } from '../../index';
import { MockupToggleThemeButton } from '../../components/mockup/MockupToggleThemeButton';

export default {
  title: 'Components/General',
  component: SplitPaneComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const ImagesTemplate: Story<SplitPaneProps> = (props) => {
  return (
    <div style={{ border: '1px solid red', width: 800, height: 1000 }}>
      <SplitPaneComponent toggleOption>
        <div style={{ background: '' }}>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ pane: 'both', align: 'right', hideLabel: '' }} closableSecondPane={{ align: 'right', hideLabel: '' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'right', hideLabel: '' }}
                                closableSecondPane={{ align: 'right', hideLabel: '' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'center' }} closableSecondPane={{align: 'center'}}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'center' }}
                                closableSecondPane={{ align: 'center' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'left' }} closableSecondPane={{align: 'left'}}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="row" closableFirstPane={{ align: 'left' }}
                                closableSecondPane={{ align: 'left' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
        </div>
        <div style={{ background: '' }}>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'right', hideLabel: '' }} closableSecondPane={{ align: 'right' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'right', hideLabel: '' }}
                                closableSecondPane={{ align: 'right' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'center' }} closableSecondPane={{ align: 'center' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'center' }}
                                closableSecondPane={{ align: 'center' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          {`<SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'left' }} closableSecondPane={{ align: 'left' }}>`}
          <div style={{ height: 200 }}>
            <SplitPaneComponent minSize={1} direction="column" closableFirstPane={{ align: 'left' }}
                                closableSecondPane={{ align: 'left' }}>
              <div style={{ background: 'yellow' }}>A<br />A</div>
              <div style={{ background: 'blueviolet' }}>B</div>
            </SplitPaneComponent>
          </div>
          <MockupToggleThemeButton />
        </div>
      </SplitPaneComponent>
    </div>
  );
};

export const SplitPane = ImagesTemplate.bind({});

SplitPane.args = {
  // onClick: action('onClick'),
};
