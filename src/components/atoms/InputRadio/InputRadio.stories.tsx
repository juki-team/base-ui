import type { Meta, StoryObj } from '@storybook/react-vite';
// import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { InputRadio } from './InputRadio';

const meta: Meta<typeof InputRadio> = {
  component: InputRadio,
};

export default meta;

type Story = StoryObj<typeof InputRadio>;

export const Regular: Story = {
  // play: waitForLoadingToDisappear,
  render: ({ label = 'radio label', ...args }) => (
    <MockupJukiProvider>
      <InputRadio label={label} {...args} />
    </MockupJukiProvider>
  ),
};
