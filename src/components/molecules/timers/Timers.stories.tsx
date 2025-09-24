import { Meta, StoryObj } from '@storybook/react-webpack5';
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
          {...args}
          startDate={new Date(Date.now() + startTimestamp)}
          endDate={new Date(Date.now() + startTimestamp + 15 * 1000)}
          type="weeks-days-hours-minutes-seconds-milliseconds"
          abbreviated
        />
      ))}
      <TimerLabeled
        endDate={new Date(Date.now() - 15 * 1000)}
        startDate={new Date(Date.now() + 15 * 1000)}
        type="weeks-days-hours-minutes-seconds-milliseconds"
        inline
        abbreviated
      />
      <h3>laps 4</h3>
      {[ 15 * 1000, 0, -30 * 1000 ].map((startTimestamp) => (
        <TimerLabeled
          startDate={new Date(Date.now() + startTimestamp)}
          endDate={new Date(Date.now() + startTimestamp + 15 * 1000)}
          type="hours-minutes-seconds"
          literal
        />
      ))}
      <TimerLabeled
        endDate={new Date(Date.now() - 15 * 1000)}
        startDate={new Date(Date.now() + 15 * 1000)}
        type="seconds"
      />
      <h3>Timer</h3>
      <Timer interval={-1} currentTimestamp={10 * 1000} type="weeks-days-hours-minutes-seconds-milliseconds" />
      <Timer interval={-1000} currentTimestamp={10 * 60 * 1000} type="weeks-days-hours-minutes" />
      <Timer interval={-1} currentTimestamp={60 * 1000} type="days" abbreviated />
      <Timer
        interval={-1}
        currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000}
        type="weeks-days-hours-minutes-seconds-milliseconds"
      />
      <Timer
        interval={1}
        currentTimestamp={300 * 365 * 24 * 60 * 60 * 1000}
        type="weeks-days-hours-minutes-seconds-milliseconds"
      />
      <Timer interval={1} currentTimestamp={10 * 60 * 1000} type="weeks-days-hours-minutes-seconds-milliseconds" />
      
      <Timer interval={-1} currentTimestamp={10 * 60 * 1000} literal type="seconds-milliseconds" />
    </MockupJukiProvider>
  ),
};
