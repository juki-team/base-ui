import type { Meta, StoryObj } from '@storybook/react-vite';

import { LineChart } from './';

const meta = {
  component: LineChart,
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [ { label: 'a', value: 10 }, { label: 'a', value: 2 }, { label: 'b', value: 7 } ],
  },
};
