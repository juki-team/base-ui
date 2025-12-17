import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup';

import { Portal } from './Portal';

const meta = {
  component: Portal,
} satisfies Meta<typeof Portal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupJukiProvider>
      <Portal>
        <div>portal div</div>
      </Portal>
    </MockupJukiProvider>
  ),
};
