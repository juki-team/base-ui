import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Button, NotificationProvider, useNotification } from '../../packages/base-ui';

export default {
  title: 'Components/General/Notifications',
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
      holiiiiiiiiiii
      <ul>
        <li>testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 1</li>
        <li>test 2</li>
        <li>test 3</li>
      </ul>
    </div>
  );
  const textMessage = 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum';
  const shortMessage = <div> holiiiiiiiiiii </div>;
  return (
    <div className="jk-row start">
      <div className="jk-col">
        <Button
          onClick={() => {
            addInfoNotification(largeMessage);
            addInfoNotification(shortMessage);
            addInfoNotification(textMessage);
          }}
          type="text"
          className="color-info"
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
          className="color-success"
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
          className="color-warning"
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
          className="color-error"
        >
          error
        </Button>
        <Button
          onClick={() => {
            addQuietNotification(largeMessage);
            addQuietNotification(shortMessage);
            addQuietNotification(textMessage);
          }}
          type="text"
          className="color-primary-light"
        >
          quiet
        </Button>
      </div>
    </div>
  );
};
const Template: Story<{}> = (args) => {
  return (
    <NotificationProvider>
      <Comp {...args} />
    </NotificationProvider>
  );
};

export const Notifications = Template.bind({});

Notifications.args = {
  onClick: action('onClick'),
  children: 'text',
};
