import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { DateLiteral } from './DateLiteral';

const meta: Meta<typeof DateLiteral> = {
  component: DateLiteral,
};

export default meta;

type Story = StoryObj<typeof DateLiteral>;

export const Regular: Story = {
  render: (args) => <DateLiteral {...args} date={new Date()} />,
};
