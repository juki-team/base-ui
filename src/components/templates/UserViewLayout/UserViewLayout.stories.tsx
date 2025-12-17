import { Judge } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup';
import { UserViewLayout } from './UserViewLayout';

const meta: Meta<typeof UserViewLayout> = {
  component: UserViewLayout,
};

export default meta;

type Story = StoryObj<typeof UserViewLayout>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap wh-100">
        <UserViewLayout {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  user: {
    company: { key: 'juki-app' },
    email: 'me@oscargauss.com',
    familyName: 'family name',
    givenName: 'given name',
    imageUrl:
      'https://images.juki.pub/u/7e6d1385-9a31-4a97-9d25-abdd7fd4f773.png',
    nickname: 'OscarGauss',
    aboutMe: 'about me',
    city: 'La Paz',
    country: 'Bolivia',
    institution: 'UMSA',
    handles: {
      [Judge.CODEFORCES]: 'OscarGauss',
    },
    canEditProfileData: true,
    canEditSettingsData: true,
    canEditPermissionsData: true,
    canUpdatePassword: true,
    canResetPassword: true,
  },
  reloadUser: async () => {
  },
  extraTabs: {},
};
