import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, Drawer as DrawerComponent, DrawerProps, MdMathViewer, SAMPLE_MD_CONTENT } from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Feedback/Drawer',
  component: DrawerComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<DrawerProps> = (args) => {
  return (
    <div style={{ height: '500px' }}>
      <DrawerComponent
        {...args}
        content={<div style={{ width: 250 }}><MdMathViewer source={SAMPLE_MD_CONTENT} /></div>}
      >
        <Button>click me</Button>
        <ToggleThemeButton />
      </DrawerComponent>
    </div>
  );
};

export const Drawer = Template.bind({});

Drawer.args = {};
