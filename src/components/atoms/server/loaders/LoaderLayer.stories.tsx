import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../../mockup';
import { LoaderLayer } from './LoaderLayer';

const meta: Meta<typeof LoaderLayer> = {
  component: LoaderLayer,
};

export default meta;

type Story = StoryObj<typeof LoaderLayer>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <LoaderLayer {...args}>click me!</LoaderLayer>
    </MockupJukiProvider>
  ),
};
