import { Status } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

import {
  ButtonLoader,
  ButtonLoaderProps,
  ButtonProps,
  EventIcon,
  EyeInvisibleIcon,
  NotificationProvider,
} from '../../index';
import { MockupJukiProvider } from '../../mockup';

export default {
  component: ButtonLoader,
};

const Comp = (args: ButtonProps) => {
  const { size, ...restArgs } = args;
  const onClick: (status: Status) => ButtonLoaderProps['onClick'] = (status) => (setLoader, loader) => {
    action('onClick')({ setLoader, loader });
    setLoader(Status.LOADING);
    setTimeout(() => setLoader(status), 5000);
  }
  
  return (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <div className="jk-col">
          <div>24px tiny</div>
          <div>30px <span style={{ textDecoration: 'line-through' }}>32px</span> small</div>
          <div>36px <span style={{ textDecoration: 'line-through' }}>36px</span> regular</div>
          <div>48px <span style={{ textDecoration: 'line-through' }}>56px</span> large</div>
          <div>60px huge</div>
        </div>
        <div className="jk-row gap block" style={{ width: 500 }}>
          <ButtonLoader
            {...args}
            onClick={onClick(Status.SUCCESS)}
          >
            click me
          </ButtonLoader>
          <ButtonLoader
            {...args}
            onClick={onClick(Status.ERROR)}
          >
            click me
          </ButtonLoader>
        </div>
        <div className="jk-row gap">
          <ButtonLoader
            {...args}
            onClick={onClick(Status.SUCCESS)}
            icon={<EventIcon />}
          />
        </div>
        <div className="jk-row gap">
          <ButtonLoader
            {...args}
            onClick={onClick(Status.SUCCESS)}
          >
            click me
          </ButtonLoader>
          <ButtonLoader
            {...args}
            onClick={onClick(Status.NONE)}
            icon={<EyeInvisibleIcon />}
          >
            click me
          </ButtonLoader>
          <ButtonLoader
            {...args}
            onClick={onClick(Status.SUCCESS)}
            icon={<EyeInvisibleIcon />}
          >
            click me
          </ButtonLoader>
          <ButtonLoader
            {...args}
            onClick={onClick(Status.ERROR)}
            icon={<EyeInvisibleIcon />}
          >
            click me
          </ButtonLoader>
          <div style={{ width: 200 }}>
            <ButtonLoader
              {...args}
              onClick={onClick(Status.ERROR)}
              icon={<EyeInvisibleIcon />}
            >
              large text text text
            </ButtonLoader>
          </div>
          <ButtonLoader
            {...restArgs}
            onClick={onClick(Status.ERROR)}
            icon={<EyeInvisibleIcon />}
            responsive
          >
            responsive
          </ButtonLoader>
        </div>
      </div>
    </MockupJukiProvider>
  );
};

const Template: Story<ButtonProps> = (args) => {
  return (
    <NotificationProvider>
      <Comp {...args} />
    </NotificationProvider>
  );
};

export const Regular = Template.bind({});
