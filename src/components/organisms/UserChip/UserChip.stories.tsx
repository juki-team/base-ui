import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup';
import { UserChip, UserMockChip } from './UserChip';

const meta: Meta<typeof UserChip> = {
  component: UserChip,
};

export default meta;

type Story = StoryObj<typeof UserChip>;

export const Default: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <UserChip {...args} />
    </MockupJukiProvider>
  ),
  args: {
    imageUrl: 'https://images.juki.pub/u/7a011822-b4b7-4cfa-b487-bfe946624f8d.png',
    nickname: 'johndoe',
    companyKey: 'juki',
  },
};

export const WithFullName: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <UserChip {...args} />
    </MockupJukiProvider>
  ),
  args: {
    imageUrl: 'https://images.juki.pub/u/7a011822-b4b7-4cfa-b487-bfe946624f8d.png',
    nickname: 'johndoe',
    givenName: 'John',
    familyName: 'Doe',
    companyKey: 'juki',
  },
};

export const WithEmail: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <UserChip {...args} />
    </MockupJukiProvider>
  ),
  args: {
    imageUrl: 'https://images.juki.pub/u/7a011822-b4b7-4cfa-b487-bfe946624f8d.png',
    nickname: 'johndoe',
    givenName: 'John',
    familyName: 'Doe',
    email: 'john.doe@example.com',
    companyKey: 'juki',
  },
};

export const WithoutLink: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <UserChip {...args} />
    </MockupJukiProvider>
  ),
  args: {
    imageUrl: 'https://images.juki.pub/u/7a011822-b4b7-4cfa-b487-bfe946624f8d.png',
    nickname: 'johndoe',
    givenName: 'John',
    familyName: 'Doe',
    companyKey: 'juki',
    withoutLink: true,
  },
};

export const MockChip: StoryObj<typeof UserMockChip> = {
  render: (args) => (
    <MockupJukiProvider>
      <UserMockChip {...args} />
    </MockupJukiProvider>
  ),
};
