import { Meta, StoryObj } from '@storybook/react-webpack5';
import { action } from 'storybook/actions';
import { Button, useJukiNotification } from '../../../index';
import { MockupJukiProvider } from '../../mockup';

const Comp = () => {
  const {
    addInfoNotification,
    addSuccessNotification,
    addWarningNotification,
    addErrorNotification,
    addQuietNotification,
  } = useJukiNotification();
  const largeMessage = (
    <div>
      LoremIpsumLoremIpsum
      <ul>
        <li>LoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsumLoremIpsum 1</li>
        <li>LoremIpsum 2</li>
        <li>LoremIpsum 3</li>
      </ul>
    </div>
  );
  const textMessage =
    'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
  const shortMessage = <div> LoremIpsumLoremIpsum </div>;
  const veryShortMessage = 'Lorem';
  // const veryShortMessage = <div> Lorem </div>;
  
  return (
    <div className="jk-row left">
      <div className="jk-col">
        <Button
          onClick={() => {
            // addInfoNotification(largeMessage);
            addInfoNotification(shortMessage);
            // addInfoNotification(textMessage);
          }}
          type="text"
          className="cr-io"
        >
          info
        </Button>
        <Button
          onClick={() => {
            addSuccessNotification(largeMessage);
            addSuccessNotification(shortMessage);
            addSuccessNotification(textMessage);
          }}
          type="text"
          className="cr-ss"
        >
          success
        </Button>
        <Button
          onClick={() => {
            addWarningNotification(largeMessage);
            addWarningNotification(shortMessage);
            addWarningNotification(textMessage);
          }}
          type="text"
          className="cr-wg"
        >
          warning
        </Button>
        <Button
          onClick={() => {
            addErrorNotification(largeMessage);
            addErrorNotification(shortMessage);
            addErrorNotification(textMessage);
          }}
          type="text"
          className="cr-er"
        >
          error
        </Button>
        <Button
          onClick={() => {
            addQuietNotification(largeMessage);
            addQuietNotification(shortMessage);
            addQuietNotification(veryShortMessage);
            addQuietNotification(textMessage);
          }}
          type="text"
          className="cr-pl"
        >
          quiet
        </Button>
      </div>
    </div>
  );
};

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Regular: Story = {
  render: (_) => (
    <MockupJukiProvider>
      <Comp />
    </MockupJukiProvider>
  ),
};

Regular.args = {
  onClick: action('onClick'),
  children: 'text',
};
