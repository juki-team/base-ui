import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MockupJukiProvider } from '../../mockup';
import { CircularProgress } from './CircularProgress';
import { MultiProgressBar } from './MultiProgressBar';

const meta: Meta<typeof MultiProgressBar> = {
  component: MultiProgressBar,
};

export default meta;

type Story = StoryObj<typeof MultiProgressBar>;

export const Regular: Story = {
  render: (_) => (
    <MockupJukiProvider>
      <div style={{ padding: '100px 50px' }}>
        <MultiProgressBar
          progress={[ { label: 'test1', percentage: 10, color: 'red' }, {
            label: 'test2',
            percentage: 20,
            color: 'green',
          } ]}
        />
        <div>with label:</div>
        <MultiProgressBar
          progress={[ { label: 'test1', percentage: 10 }, { label: 'test2', percentage: 20 } ]}
          label="TESTING..."
        />
        <div>circular:</div>
        <CircularProgress progress={60} size={80} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
