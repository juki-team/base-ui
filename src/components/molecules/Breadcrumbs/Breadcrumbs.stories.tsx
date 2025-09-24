import { Meta, StoryObj } from '@storybook/react-webpack5';
import { MockupJukiProvider } from '../../mockup';
import { Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Regular: Story = {
  render: (_) => {
    const breadcrumbs = [
      <div>Problems</div>,
      <div>1234</div>,
      <div>statements</div>,
      <div>statements</div>,
      <div>statements</div>,
      <div>statements</div>,
      <div>statements</div>,
      <div>1</div>,
      // <div>2</div>,
    ];
    
    return (
      <MockupJukiProvider>
        <div>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </MockupJukiProvider>
    );
  },
};
