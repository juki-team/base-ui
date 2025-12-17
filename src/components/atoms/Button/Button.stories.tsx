import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { MockupJukiProvider } from '../../mockup';
import { LockIcon } from '../server';
import { T } from '../T/T';
import { Button } from './Button';

// @ts-ignore
Button.defaultProps = {
  submit: false,
  type: 'primary',
  extend: false,
  disabled: false,
  responsive: false,
  responsiveMobile: false,
};

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap jk-pg">
        <T>description</T>
        <Button {...args}>click me!</Button>
        <Button {...args} icon={<LockIcon />} />
        <Button {...args} icon={<LockIcon />} size="tiny">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="small">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />}>
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="large">
          click me!
        </Button>
        <Button {...args} icon={<LockIcon />} size="huge" className="bc-pl">
          click me!
        </Button>
      </div>
    </MockupJukiProvider>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  // play: async (ctx) => {
  //   await waitForLoadingToDisappear(ctx);
  // },
  args: {
    type: 'primary',
    // type: {
    //   control: {
    //     type: 'enum',
    //
    //   }
    // }
  },
  argTypes: {
    type: {
      control: 'radio',
      options: [ 'primary', 'secondary', 'light', 'text', 'void' ],
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, userEvent, canvasElement }) => {
    const container = canvasElement.querySelector<HTMLElement>('#juki-app');
    
    if (!container) {
      throw new Error('Container #juki-app');
    }
    
    const buttons = within(container).getAllByRole('button');
    
    for (const button of buttons) {
      await userEvent.click(button);
      await expect(button).toBeDisabled();
      await expect(args.onClick).not.toHaveBeenCalled();
    }
  },
};
