import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup';
import { LoginUser } from './LoginUser';

const meta: Meta<typeof LoginUser> = {
  component: LoginUser,
};

export default meta;

type Story = StoryObj<typeof LoginUser>;

export const NotLogged: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-row">
        <LoginUser {...args} />
      </div>
    </MockupJukiProvider>
  ),
  args: {
    withLabel: false,
  },
};

export const NotLoggedCollapsed: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <LoginUser {...args} />
    </MockupJukiProvider>
  ),
  args: {
    withLabel: true,
  },
};

export const Vertical: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ width: '200px' }}>
        <LoginUser {...args} />
      </div>
    </MockupJukiProvider>
  ),
  args: {
    withLabel: false,
    isVertical: true,
    profileSelected: false,
  },
};

export const VerticalCollapsed: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div style={{ width: '60px' }}>
        <LoginUser {...args} />
      </div>
    </MockupJukiProvider>
  ),
  args: {
    withLabel: true,
    isVertical: true,
    profileSelected: true,
  },
};

export const Horizontal: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <LoginUser {...args} />
    </MockupJukiProvider>
  ),
  args: {
    withLabel: false,
    isHorizontal: true,
    profileSelected: false,
  },
};
