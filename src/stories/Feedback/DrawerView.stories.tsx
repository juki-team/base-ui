import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { DrawerView as DrawerViewComponent, DrawerViewProps, MdMathViewer, SAMPLE_MD_CONTENT } from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Feedback/Drawer',
  component: DrawerViewComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<DrawerViewProps> = (args) => {
  return (
    <div style={{ height: '500px' }}>
      <DrawerViewComponent {...args}>
        <div style={{ width: 250 }}>
          <MdMathViewer source={SAMPLE_MD_CONTENT} />
        </div>
      </DrawerViewComponent>
      <ToggleThemeButton />
    </div>
  );
};

export const DrawerView = Template.bind({});

DrawerView.args = {};
