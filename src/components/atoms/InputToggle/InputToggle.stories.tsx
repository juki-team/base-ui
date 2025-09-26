import type { Meta, StoryObj } from '@storybook/react-webpack5';
// import { waitForLoadingToDisappear } from '../../../../.storybook/globalPlay';
import { MockupJukiProvider } from '../../mockup';
import { InputToggleProps } from '../Input/types';
import { InputToggle } from './InputToggle';

// @ts-ignore
InputToggle.defaultProps = {
  type: 'rounded' as InputToggleProps['type'],
  size: 'regular' as InputToggleProps['size'],
  disabled: false,
};

const meta: Meta<typeof InputToggle> = {
  component: InputToggle,
};

export default meta;

type Story = StoryObj<typeof InputToggle>;

export const Regular: Story = {
  // play: waitForLoadingToDisappear,
  render: ({ leftLabel = 'left label', rightLabel = 'right label', ...args }) => (
    <MockupJukiProvider>
      <InputToggle leftLabel={leftLabel} rightLabel={rightLabel} {...args} />
    </MockupJukiProvider>
  ),
};
