import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { UserMyActiveSessions } from './UserMyActiveSessions';

const meta: Meta<typeof UserMyActiveSessions> = {
  component: UserMyActiveSessions,
};

export default meta;

type Story = StoryObj<typeof UserMyActiveSessions>;

export const Regular: Story = {
  render: () => (
    <MockupJukiProvider>
      <div className="jk-col gap wh-100">
        <UserMyActiveSessions />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
