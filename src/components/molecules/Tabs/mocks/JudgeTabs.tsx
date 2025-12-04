import { useState } from 'react';
import { Button } from '../../../atoms';
import { EditIcon } from '../../../atoms/server';
import { MockJkContestTable } from '../../../organisms/_layz_/DataViewer/JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from '../../../organisms/_layz_/DataViewer/JkProblemTableTest/MockJkProblemTable';
import {
  MockJkSubmissionTable,
} from '../../../organisms/_layz_/DataViewer/JkSubmissionsTableTest/MockJkSubmissionTable';
import { MockJkUserTable } from '../../../organisms/_layz_/DataViewer/JkUserTableTest/MockJkUserTable';
import { TabsType } from '../../../types';
import { TabsInline } from '../../index';
import { TabsInlineBody } from '../../TabsInlineBody/TabsInlineBody';

const outputTabs: TabsType = {
  ['problems']: {
    key: 'problems',
    header: <div>problems</div>,
    body: (
      <div className="jk-row gap">
        <MockJkProblemTable />
      </div>
    ),
  },
  contests: {
    key: 'contests',
    header: <div>contests</div>,
    body: (
      <div className="jk-row gap">
        <MockJkContestTable />
      </div>
    ),
  },
  users: {
    key: 'users',
    header: <div>users</div>,
    body: (
      <div className="jk-row gap">
        <MockJkUserTable />
      </div>
    ),
  },
  submissions: {
    key: 'submissions',
    header: <div>submissions</div>,
    body: (
      <div className="jk-row gap">
        <MockJkSubmissionTable />
      </div>
    ),
  },
  submissions_1: {
    key: 'submissions_1',
    header: <div>submissions</div>,
    body: (
      <div className="jk-row gap">
        <MockJkSubmissionTable />
      </div>
    ),
  },
  submissions_2: {
    key: 'submissions_2',
    header: <div>submissions</div>,
    body: (
      <div className="jk-row gap">
        <MockJkSubmissionTable />
      </div>
    ),
  },
  submissions_3: {
    key: 'submissions_3',
    header: <div>submissions</div>,
    body: (
      <div className="jk-row gap">
        <MockJkSubmissionTable />
      </div>
    ),
  },
  submissions_4: {
    key: 'submissions_4',
    header: <div>submissions</div>,
    body: (
      <div className="jk-row gap">
        <MockJkSubmissionTable />
      </div>
    ),
  },
  test: {
    key: 'test',
    header: <div>test</div>,
    body: (
      <div>test</div>
    ),
  },
};

export const JudgeTabs = () => {
  
  const [ outputTab, setOutputTab ] = useState('problems');
  
  return (
    <div className="jk-col gap nowrap bc-we-dk" style={{ height: 400 }}>
      <TabsInline
        tabs={outputTabs}
        onChange={setOutputTab}
        selectedTabKey={outputTab}
        tickStyle="background"
        extraNodes={[ <Button key="edit" icon={<EditIcon />} /> ]}
      />
      <div className="flex-1" style={{ overflow: 'hidden auto', width: '100%', height: '300px', position: 'relative' }}>
        <TabsInlineBody tabs={outputTabs} selectedTabKey={outputTab} />
      </div>
    </div>
  );
};
