import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MockupJukiProvider } from '../../mockup';
import { CircularProgress } from '../CircularProgress/CircularProgress';
import { ProgressSlide } from '../ProgressSlide/ProgressSlide';
import { ProgressMultiBar } from './ProgressMultiBar';

const meta: Meta<typeof ProgressMultiBar> = {
  component: ProgressMultiBar,
};

export default meta;

type Story = StoryObj<typeof ProgressMultiBar>;

export const Regular: Story = {
  render: (_) => (
    <MockupJukiProvider>
      <div style={{ padding: '100px 50px' }}>
        <ProgressMultiBar
          progress={[
            { label: 'test1', percentage: 10, color: 'red' },
            { label: <div className="jk-pg-xsm">test 2</div>, percentage: 20, color: 'green' },
          ]}
          points={[
            { label: 'test1', percentage: 0, color: 'blue' },
            { label: <div className="jk-pg-xsm">test1</div>, percentage: 10, color: 'var(--t-color-success)' },
            { label: 'test1', percentage: 20, color: 'black' },
            { label: 'test1', percentage: 100, color: 'yellow' },
          ]}
        />
        <div>progress:</div>
        <div className="pn-re">
          <ProgressMultiBar
            progress={[
              { label: 'test1', percentage: 10, color: 'red' },
              { label: <div className="jk-pg-xsm">test 2</div>, percentage: 20, color: 'green' },
            ]}
            points={[
              { label: <div className="jk-pg-xsm">test1</div>, percentage: 10, color: 'var(--t-color-success)' },
            ]}
            tooltipPlacement="bottom"
          />
          <ProgressSlide progress={80} className="expand-absolute pe-ne" />
        </div>
        <div>with label:</div>
        <ProgressMultiBar
          progress={[ { label: 'test1', percentage: 10 }, { label: 'test2', percentage: 20 } ]}
          label="TESTING..."
        />
        <ProgressSlide />
        <div>circular:</div>
        <CircularProgress progress={60} size={80} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
