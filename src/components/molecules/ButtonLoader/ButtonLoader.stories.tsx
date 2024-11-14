import { Status } from '@juki-team/commons';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonLoader, ButtonLoaderProps, EventIcon, EyeInvisibleIcon } from '../../index';
import { MockupJukiProvider } from '../../mockup';

const meta: Meta<typeof ButtonLoader> = {
  component: ButtonLoader,
};

export default meta;

type Story = StoryObj<typeof ButtonLoader>;

export const Regular: Story = {
  render: (args) => {
    const { size, ...restArgs } = args;
    console.info(restArgs);
    const onClick: (status: Status) => ButtonLoaderProps['onClick'] =
      (status) => (setLoader, loader) => {
        action('onClick')({ setLoader, loader });
        setLoader(Status.LOADING);
        setTimeout(() => setLoader(status), 5000);
      };
    
    return (
      <MockupJukiProvider>
        <div className="jk-col gap">
          <div className="jk-col">
            <div>24px tiny</div>
            <div>
              30px <span style={{ textDecoration: 'line-through' }}>32px</span>{' '}
              small
            </div>
            <div>
              36px <span style={{ textDecoration: 'line-through' }}>36px</span>{' '}
              regular
            </div>
            <div>
              48px <span style={{ textDecoration: 'line-through' }}>56px</span>{' '}
              large
            </div>
            <div>60px huge</div>
          </div>
          <div className="jk-row gap block" style={{ width: 500 }}>
            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)}>
              click me
            </ButtonLoader>
            <ButtonLoader {...args} onClick={onClick(Status.ERROR)}>
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
            <ButtonLoader {...args} onClick={onClick(Status.SUCCESS)}>
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
          </div>
        </div>
      </MockupJukiProvider>
    );
  },
};
