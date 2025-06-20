import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MockupToggleThemeButton } from '../../../../mockup/MockupToggleThemeButton';
import { ArrowIcon, CheckIcon_, CloseIcon_, DoubleUpIcon, ExclamationIcon, MinusIcon, PlusIcon, UpIcon } from './';

const meta = {
  component: ArrowIcon,
  argTypes: {
    color: { control: 'color' },
    size: {
      options: [ 'tiny', 'small', 'regular', 'large', 'huge', 'very-huge' ],
      control: { type: 'select' },
    },
    circle: { control: 'boolean' },
    square: { control: 'boolean' },
    filledCircle: { control: 'text' },
    filledSquare: { control: 'text' },
    rotate: { control: 'number', defaultValue: 0 },
    className: { control: 'text' },
  },
} satisfies Meta<typeof ArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Signs = {
  render: (args) => {
    const icons = {
      ArrowIcon,
      ExclamationIcon,
      MinusIcon,
      PlusIcon,
      UpIcon_: UpIcon,
      CloseIcon_,
      DoubleUpIcon,
      CheckIcon_,
    };
    
    return (
      <div className="jk-row block gap" style={{ color: args.color }}>
        {Object.entries(icons)
          .sort(([ a ], [ b ]) => a.localeCompare(b))
          .map(([ iconName, Component ]) => (
            <div className="jk-row nowrap center" key={iconName}>
              <Component {...args} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>
                {iconName}
              </div>
            </div>
          ))}
        <MockupToggleThemeButton />
      </div>
    );
  },
  args: {
    color: 'red',
    size: 'regular',
    circle: true,
    square: false,
    filledCircle: false,
    filledSquare: false,
    rotate: 0,
    className: '',
  },
} satisfies Story;
