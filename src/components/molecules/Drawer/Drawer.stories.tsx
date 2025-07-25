import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { Button, Drawer as DrawerComponent, MdMathViewer } from '../../../index';
import { MockupToggleThemeButton } from '../../mockup/MockupToggleThemeButton';
import { SAMPLE_MD_CONTENT } from '../../organisms/mdMath/constants';

const meta: Meta<typeof DrawerComponent> = {
  component: DrawerComponent,
};

export default meta;

type Story = StoryObj<typeof DrawerComponent>;

export const Regular: Story = {
  render: (args) => (
    <div style={{ height: '500px' }}>
      <DrawerComponent
        {...args}
        content={
          <div style={{ width: 250 }}>
            <MdMathViewer source={SAMPLE_MD_CONTENT} />
          </div>
        }
      >
        <Button>click me</Button>
        <MockupToggleThemeButton />
      </DrawerComponent>
    </div>
  ),
};
