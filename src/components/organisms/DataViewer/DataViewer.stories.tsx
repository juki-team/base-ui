import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockupJukiProvider } from '../../mockup';
import { DataViewer } from './DataViewer';
import { MockJkContestTable } from './JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from './JkProblemTableTest/MockJkProblemTable';
import { MockJkSubmissionTable } from './JkSubmissionsTableTest/MockJkSubmissionTable';
import { MockJkUserTable } from './JkUserTableTest/MockJkUserTable';

const meta: Meta<typeof DataViewer> = {
  component: DataViewer,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DataViewer>;

export const Regular: Story = {
  render: ({ data, ...args }) => (
    <BrowserRouter>
      <MockupJukiProvider>
        <div>DadaViewer</div>
        {/* @ts-ignore*/}
        <MockJkUserTable {...args} />
      </MockupJukiProvider>
    </BrowserRouter>
  ),
};

export const RegularProblem: Story = {
  render: ({ data, ...args }) => (
    <BrowserRouter>
      <MockupJukiProvider>
        <div>DadaViewer</div>
        {/* @ts-ignore*/}
        <MockJkProblemTable {...args} />
      </MockupJukiProvider>
    </BrowserRouter>
  ),
};

export const RegularContest: Story = {
  render: ({ data, ...args }) => (
    <BrowserRouter>
      <MockupJukiProvider>
        <div>DadaViewer</div>
        {/* @ts-ignore*/}
        <MockJkContestTable {...args} />
      </MockupJukiProvider>
    </BrowserRouter>
  ),
};

export const RegularSubmission: Story = {
  render: ({ data, ...args }) => (
    <BrowserRouter>
      <MockupJukiProvider>
        <div>DadaViewer</div>
        {/* @ts-ignore*/}
        <MockJkSubmissionTable {...args} />
      </MockupJukiProvider>
    </BrowserRouter>
  ),
};
