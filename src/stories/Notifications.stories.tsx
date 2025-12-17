import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components';

import { useJukiNotification } from '../components/hooks/useJukiNotification';
import { MockupJukiProvider } from '../components/mockup';
import { NotificationProvider } from '../components/providers/NotificationProvider/NotificationProvider';

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
