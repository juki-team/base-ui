import { Status } from '@juki-team/commons';
import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, ButtonLoader, ButtonProps, EyeInvisibleIcon, NotificationProvider } from '../../index';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/General/Buttons',
  component: Button,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Comp = (args: ButtonProps) => {
  const { size, ...restArgs } = args;
  
  return (
    <JukiProvider>
      <div className="jk-col">
        <div className="jk-col">
          <div>32px small</div>
          <div>36px regular</div>
          <div>56px large</div>
          <div>64px huge</div>
        </div>
        <div className="jk-row gap">
          <Button {...args} loading={true} />
          <Button {...args} icon={<EyeInvisibleIcon />} />
          <ButtonLoader
            {...args}
            onClick={(setLoader, loader) => {
              action('onClick')({ setLoader, loader });
              setLoader(Status.LOADING);
              setTimeout(() => setLoader(Status.SUCCESS), 1000);
            }}
          />
          <ButtonLoader
            {...args}
            onClick={(setLoader, loader) => {
              action('onClick')({ setLoader, loader });
              setLoader(Status.LOADING);
              setTimeout(() => setLoader(Status.NONE), 1000);
            }}
            icon={<EyeInvisibleIcon />}
          />
          <ButtonLoader
            {...args}
            onClick={(setLoader, loader) => {
              action('onClick')({ setLoader, loader });
              setLoader(Status.LOADING);
              setTimeout(() => setLoader(Status.SUCCESS), 1000);
            }}
            icon={<EyeInvisibleIcon />}
          />
          <ButtonLoader
            {...args}
            onClick={(setLoader, loader) => {
              action('onClick')({ setLoader, loader });
              setLoader(Status.LOADING);
              setTimeout(() => setLoader(Status.ERROR), 1000);
            }}
            icon={<EyeInvisibleIcon />}
          />
          <ButtonLoader
            {...restArgs}
            onClick={(setLoader, loader) => {
              action('onClick')({ setLoader, loader });
              setLoader(Status.LOADING);
              setTimeout(() => setLoader(Status.ERROR), 1000);
            }}
            icon={<EyeInvisibleIcon />}
            responsive
          >
            responsive
          </ButtonLoader>
        </div>
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};

const Template: Story<ButtonProps> = (args) => {
  return (
    <NotificationProvider>
      <Comp {...args} />
    </NotificationProvider>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  children: 'text',
};
