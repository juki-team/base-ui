import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DateDisplayType } from '../../../types';

import { DateLiteral } from './DateLiteral';

// @ts-ignore
DateLiteral.defaultProps = {
  show: 'year-month-day-hours-minutes-seconds' as DateDisplayType,
};

const meta: Meta<typeof DateLiteral> = {
  component: DateLiteral,
};

export default meta;

type Story = StoryObj<typeof DateLiteral>;

export const Regular: Story = {
  render: (args) => (
    <div className="jk-col">
      <DateLiteral {...args} date={new Date()} />
      <DateLiteral {...args} date={new Date()} twoLines />
    </div>
  ),
};
