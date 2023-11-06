import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockupJukiProvider } from '../../mockup';
import { DataViewer } from './DataViewer';
import { JkUserTable } from './JkUserTableTest/JkUserTable';

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
        <JkUserTable {...args} />
      </MockupJukiProvider>
    </BrowserRouter>
  ),
};
