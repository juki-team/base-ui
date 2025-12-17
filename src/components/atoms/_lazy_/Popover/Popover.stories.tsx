import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupJukiProvider } from '../../../mockup';
import { Popover } from './';

const meta: Meta<typeof Popover> = {
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

const test = new Array(10);
test.fill(1);

const content = (
  <div className="jk-pg-sm elevation-1">
    <h3>title</h3>
    <div>Lorem ipsum</div>
    {test.map(() => (
      <div>{1}</div>
    ))}
  </div>
);

export const Regular: Story = {
  render: ({ placement, ...args }) => (
    <MockupJukiProvider>
      <div style={{ padding: '200px' }}>
        <Popover {...args} placement={placement} content={content}>
          <div style={{ background: 'gray', width: '200px' }}>{placement}</div>
        </Popover>
        TEST
        {/*<Popover {...args} placement={placement} content={content}>*/}
        {/*  <div style={{ background: 'gray', width: '200px' }}>{placement}</div>*/}
        {/*</Popover>*/}
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  placement: 'top',
};
