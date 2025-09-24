import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MockupJukiProvider } from '../../mockup';
import { ThemeColorPalette } from './ThemeColorPalette';

const meta: Meta<typeof ThemeColorPalette> = {
  component: ThemeColorPalette,
};

export default meta;

type Story = StoryObj<typeof ThemeColorPalette>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <ThemeColorPalette />
      </div>
    </MockupJukiProvider>
  ),
};
