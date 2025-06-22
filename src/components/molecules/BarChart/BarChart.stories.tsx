import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { BarChart } from './BarChart';

const meta = {
  component: BarChart,
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [ { label: 'a', value: 10 }, { label: 'a', value: 2 }, { label: 'b', value: 7 } ],
  },
};
