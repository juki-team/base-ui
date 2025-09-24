import { useState } from 'react';
import { MockJkContestTable } from '../../../organisms/DataViewer/JkContestTableTest/MockJkContestTable';
import { MockJkProblemTable } from '../../../organisms/DataViewer/JkProblemTableTest/MockJkProblemTable';
import { MockJkUserTable } from '../../../organisms/DataViewer/JkUserTableTest/MockJkUserTable';
import { TabsInline } from '../../index';
import { TabsInlineBody } from '../TabsInlineBody';
import { TabsType } from '../types';

const outputTabs: TabsType<string> = {
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
  test: {
    key: 'test',
    header: <div>'test'</div>,
    body: (
      <div>test</div>
    ),
  },
};

export const JudgeTabs = () => {
  
  const [ outputTab, setOutputTab ] = useState('problems');
  
  return (
    <div className="jk-col gap nowrap bc-wd" style={{ height: 400 }}>
      <TabsInline tabs={outputTabs} onChange={setOutputTab} selectedTabKey={outputTab} tickStyle="background" />
      <div className="flex-1" style={{ overflow: 'hidden auto', width: '100%', height: '300px', position: 'relative' }}>
        <TabsInlineBody tabs={outputTabs} selectedTabKey={outputTab} />
      </div>
    </div>
  );
};
