import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Timer } from './Timer';
import { TimerLabeled } from './TimerLabeled';

const meta: Meta<typeof TimerLabeled> = {
  component: TimerLabeled,
};

export default meta;

type Story = StoryObj<typeof TimerLabeled>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <h3>TimerClock</h3>
      {[ 15 * 1000, 0, -30 * 1000 ].map((startTimestamp) => (
        <TimerLabeled
          startDate={new Date(Date.now() + startTimestamp)}
          endDate={new Date(Date.now() + startTimestamp + 15 * 1000)}
          laps={7}
          abbreviated
        />
      ))}
      <TimerLabeled
        endDate={new Date(Date.now() - 15 * 1000)}
        startDate={new Date(Date.now() + 15 * 1000)}
        laps={7}
      />
      <h3>laps 4</h3>
      {[ 15 * 1000, 0, -30 * 1000 ].map((startTimestamp) => (
        <TimerLabeled
          startDate={new Date(Date.now() + startTimestamp)}
          endDate={new Date(Date.now() + startTimestamp + 15 * 1000)}
          laps={4}
          literal
        />
      ))}
      <TimerLabeled
        endDate={new Date(Date.now() - 15 * 1000)}
        startDate={new Date(Date.now() + 15 * 1000)}
        laps={4}
      />
      <h3>Timer</h3>
      <Timer interval={-1} currentTimestamp={10 * 1000} laps={7} />
      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} />
      <Timer interval={-1} currentTimestamp={60 * 1000} laps={1} />
      <Timer
        interval={-1}
        currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000}
        laps={7}
      />
      <Timer
        interval={1}
        currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000}
        laps={7}
      />
      <Timer interval={1} currentTimestamp={10 * 60 * 1000} laps={7} />
      
      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} literal laps={2} />
    </MockupJukiProvider>
  ),
};
