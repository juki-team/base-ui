import { type Meta, type StoryObj } from '@storybook/react-webpack5';
import { MockupJukiProvider } from '../../../mockup';

import { LineLoader } from './LineLoader';

const meta: Meta<typeof LineLoader> = {
  component: LineLoader,
};

export default meta;

type Story = StoryObj<typeof LineLoader>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <LineLoader {...args} />
    </MockupJukiProvider>
  ),
};
