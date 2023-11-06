import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, useNotification } from '../../../index';
import { MockupJukiProvider } from '../../mockup';

export default {
  component: Button,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Comp = () => {
  const {
    addInfoNotification,
    addSuccessNotification,
    addWarningNotification,
    addErrorNotification,
    addQuietNotification,
  } = useNotification();
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
  const textMessage = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
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
const Template: Story<{}> = (args) => {
  return (
    <MockupJukiProvider>
      <Comp {...args} />
    </MockupJukiProvider>
  );
};

export const Notifications = Template.bind({});

Notifications.args = {
  onClick: action('onClick'),
  children: 'text',
};