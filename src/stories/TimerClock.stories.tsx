import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { Timer, TimerLabeled, TimerLabeledProps } from '../index';

export default {
  title: 'Components/TimerClock',
  component: TimerLabeled,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<TimerLabeledProps> = (args) => {
  return (
    <div>
      <h3>TimerClock</h3>
      {[15 * 1000, 0, -30 * 1000].map((startTimestamp) => (
        <TimerLabeled
          startDate={new Date(Date.now() + startTimestamp)}
          endDate={new Date(Date.now() + startTimestamp + 15 * 1000)}
          laps={7}
        />
      ))}
      <TimerLabeled
        endDate={new Date(Date.now() - 15 * 1000)}
        startDate={new Date(Date.now() + 15 * 1000)}
        laps={7}
      />
      <h3>Timer</h3>
      <Timer interval={-1} currentTimestamp={10 * 1000} laps={7} />
      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} />
      <Timer interval={-1} currentTimestamp={60 * 1000} laps={1} />
      <Timer interval={-1} currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000} laps={7} />
      <Timer interval={1} currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000} laps={7} />
      <Timer interval={1} currentTimestamp={10 * 60 * 1000} laps={7} />
      
      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} literal laps={2} />
    </div>
  );
};

export const PopoverNormal = Template.bind({});

PopoverNormal.args = {
  // readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<Popover Props, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};
