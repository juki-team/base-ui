import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components';
import { MockupJukiProvider } from '../components/mockup';
import { NotificationProvider } from '../contexts/NotificationProvider/NotificationProvider';
import { useJukiNotification } from '../hooks';

const meta = {
  component: NotificationProvider,
} satisfies Meta<typeof NotificationProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonWithHooks = () => {
  const {
    addSuccessNotification,
    addErrorNotification,
    addInfoNotification,
    addWarningNotification,
    addQuietNotification,
  } = useJukiNotification();
  return (
    <>
      <Button onClick={() => addSuccessNotification('success 1234')}>success</Button>
      <Button onClick={() => addErrorNotification('error 1234')}>error</Button>
      <Button onClick={() => addInfoNotification('info 1234')}>info</Button>
      <Button onClick={() => addWarningNotification('warning 1234')}>warning</Button>
      <Button onClick={() => addQuietNotification('quiet 1234')}>quiet</Button>
    </>
  );
};

export const Primary = {
  render: () => <MockupJukiProvider> <ButtonWithHooks /></MockupJukiProvider>,
} satisfies Story;
