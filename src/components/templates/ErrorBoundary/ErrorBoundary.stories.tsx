import { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../mockup';
import { ErrorBoundary as ErrorBoundaryCmp } from './ErrorBoundary';

const meta: Meta<typeof ErrorBoundaryCmp> = {
  component: ErrorBoundaryCmp,
};

export default meta;

type Story = StoryObj<typeof ErrorBoundaryCmp>;

const Error = () => {
  return <div>{JSON.parse('error')}</div>;
};

export const Regular: Story = {
  render: () => (
    <MockupJukiProvider>
      <ErrorBoundaryCmp reload={() => console.info('reload')}>
        <Error />
      </ErrorBoundaryCmp>
    </MockupJukiProvider>
  ),
};
