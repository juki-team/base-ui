import type { Meta, StoryObj } from '@storybook/react-vite';
// import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { Div } from './Div';

const meta: Meta<typeof Div> = {
  component: Div,
};

export default meta;

type Story = StoryObj<typeof Div>;

export const Regular: Story = {
  // play: waitForLoadingToDisappear,
  render: (args) => (
    <MockupJukiProvider>
      <Div {...args}>click me!</Div>
    </MockupJukiProvider>
  ),
};
