import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { TwoContentLayout as TwoContentLayoutComponent } from './TwoContentLayout';

const meta: Meta<typeof TwoContentLayoutComponent> = {
  component: TwoContentLayoutComponent,
};

export default meta;

type Story = StoryObj<typeof TwoContentLayoutComponent>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap" style={{ height: 400 }}>
        <TwoContentLayoutComponent {...args} loading>
          <h1>Title 1</h1>
        </TwoContentLayoutComponent>
      </div>
    </MockupJukiProvider>
  ),
};

export const Regular2: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap" style={{ height: 400 }}>
        <TwoContentLayoutComponent {...args} loading>
          <h1>Title 1</h1>
        </TwoContentLayoutComponent>
      </div>
    </MockupJukiProvider>
  ),
};
