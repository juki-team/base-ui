import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MockupJukiProvider } from '../../../mockup';
import { Pagination } from '../../../molecules/Pagination/Pagination';
import { DataViewer } from './';
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

const Pag = () => {
  
  const [ page, setPage ] = useState(0);
  
  return (
    <Pagination
      dataLength={1}
      loading={false}
      initializing={false}
      pageSizeOptions={[ 1 ]}
      total={145}
      page={page}
      pageSize={1}
      jumpToPage={setPage}
      onPageSizeChange={() => null}
      isOnToolbar
      key="first-row-pagination"
    />
  );
};
export const Regular: Story = {
  render: ({ data, ...args }) => (
    <BrowserRouter>
      <MockupJukiProvider>
        <Pag />
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
