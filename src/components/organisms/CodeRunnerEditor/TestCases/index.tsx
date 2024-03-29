import { mex, SUBMISSION_RUN_STATUS, SubmissionRunStatus } from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../../helpers';
import { useNotification } from '../../../../hooks';
import { AddIcon, DeleteIcon, T, TextArea, Tooltip } from '../../../atoms';
import { SplitPane, Tabs, TabsInline, TabType } from '../../../molecules';
import { NotificationType } from '../../Notifications';
import { TestCasesProps } from '../types';
import { getErrors } from '../utils';
import { LogInfo } from './LogInfo';

export const TestCases = <T, >({ testCases, onChange, timeLimit, memoryLimit, direction }: TestCasesProps<T>) => {
  const testCasesValues = Object.values(testCases)
    .sort((a, b) => (a.sample !== b.sample) ? +b.sample - +a.sample : a.index - b.index);
  const [ testCaseKey, setTestCaseKey ] = useState(testCasesValues[0]?.key || '');
  useEffect(() => {
    const testCasesValues = Object.values(testCases);
    if (testCasesValues.length) {
      if (!testCasesValues.some(testCase => testCase.key === testCaseKey)) {
        setTestCaseKey(testCasesValues[0].key);
      }
    }
  }, [ testCaseKey, testCases ]);
  
  const tabs: { [key: string]: TabType<string> } = {};
  testCasesValues.forEach(testCaseValue => {
    tabs[testCaseValue.key] = {
      key: testCaseValue.key,
      header: testCaseValue.sample
        ? testCaseValue.key === testCaseKey
          ?
          <div className="jk-row ws-np nowrap tx-s"><T className="tt-se">sample</T>&nbsp;{testCaseValue.index + 1}</div>
          : <div className="jk-row ws-np nowrap tx-s"><T className="tt-se">s.</T>&nbsp;{testCaseValue.index + 1}</div>
        : testCaseValue.key === testCaseKey
          ? <div className="jk-row ws-np nowrap tx-s">
            <T className="tt-se">custom</T>
            &nbsp;{testCaseValue.index + 1}&nbsp;
            {Object.keys(testCases).length > 1 && (
              <DeleteIcon
                size="small"
                className="clickable br-50-pc"
                onClick={() => {
                  const newTestCases = { ...testCases };
                  delete newTestCases[testCaseValue.key];
                  onChange?.({ testCases: newTestCases });
                }}
              />
            )}
          </div>
          : <div className="jk-row ws-np nowrap tx-s"><T className="tt-se">c.</T>&nbsp;{testCaseValue.index + 1}</div>,
      body: (
        <TextArea
          style={{ height: '100%', boxShadow: 'none', borderRadius: 0 }}
          className="tx-s"
          key={testCaseValue.key}
          value={testCaseValue.in}
          onChange={value => onChange?.({
            testCases: {
              ...testCases,
              [testCaseValue.key]: { ...testCaseValue, in: value },
            },
          })}
        />
      ),
    };
  });
  
  const actionSection = (
    <Tooltip content={<T className="ws-np tt-se tx-s">add sample test case</T>} placement="bottom-end">
      <div className="jk-button light small only-icon">
        <AddIcon
          size="small"
          onClick={() => {
            const customCases = testCasesValues.filter(testCaseValue => !testCaseValue.sample);
            if (customCases.length < 10) {
              const key = v4();
              const index = mex(customCases.map(testCaseValue => testCaseValue.index));
              onChange?.({
                testCases: {
                  ...testCases,
                  [key]: {
                    key,
                    index,
                    in: '',
                    out: '',
                    err: '',
                    log: '',
                    sample: false,
                    status: SubmissionRunStatus.NONE,
                  },
                },
              });
            } else {
              addNotification({ type: NotificationType.QUIET, message: <T>maximum test cases achieved</T> });
            }
          }}
        />
      </div>
    </Tooltip>
  );
  
  const [ outputTab, setOutputTab ] = useState('output');
  const { addNotification } = useNotification();
  const status = testCases[testCaseKey]?.status;
  useEffect(() => {
    setOutputTab(status === SubmissionRunStatus.FAILED
    || status === SubmissionRunStatus.COMPILATION_ERROR ? 'error' : 'output');
  }, [ status ]);
  
  const loaderAndInfo = (
    <>
      {(
        testCases[testCaseKey]?.status === SubmissionRunStatus.RECEIVED
        || testCases[testCaseKey]?.status === SubmissionRunStatus.COMPILING
        || testCases[testCaseKey]?.status === SubmissionRunStatus.RUNNING_TEST_CASES
        || testCases[testCaseKey]?.status === SubmissionRunStatus.RUNNING_TEST_CASE
      ) && (
        <div className="jk-overlay">
          <div className="jk-row" style={{ alignItems: 'baseline' }}>
            <T>{SUBMISSION_RUN_STATUS[testCases[testCaseKey]?.status].label}</T>&nbsp;
            <div className="dot-flashing" />
          </div>
        </div>
      )}
      {testCases[testCaseKey]?.log && (
        <LogInfo testCase={testCases[testCaseKey]} timeLimit={timeLimit} memoryLimit={memoryLimit} />
      )}
    </>
  );
  
  const outputTabs: TabType<string>[] = [
    {
      key: 'output',
      header: (
        <T
          className={classNames(
            'tt-se tx-s',
            { 'cr-er': getErrors(testCases[testCaseKey], timeLimit, memoryLimit).failed },
          )}
        >
          output
        </T>
      ),
      body: (
        <div>
          {loaderAndInfo}
          <div className="content-log">
            <span className="jk-text-stdout">{testCases[testCaseKey]?.out}</span>
          </div>
        </div>
      ),
    },
  ];
  
  if (testCases[testCaseKey]?.err) {
    outputTabs.push({
      key: 'error',
      header: (
        <T
          className={classNames(
            'tt-se tx-s',
            { 'cr-er': getErrors(testCases[testCaseKey], timeLimit, memoryLimit).failed },
          )}
        >
          error
        </T>
      ),
      body: (
        <div>
          {loaderAndInfo}
          <div className="content-log">
            <span className="jk-text-stderr">{testCases[testCaseKey]?.err}</span>
          </div>
        </div>
      ),
    });
  }
  
  return (
    <div className="jk-code-mirror-editor-test-cases">
      <SplitPane direction={direction === 'row' ? 'column' : 'row'}>
        <div className="jk-col extend stretch nowrap">
          <div className="jk-row nowrap" style={{ margin: '0 var(--gap)' }}>
            <div className="flex-1">
              <TabsInline
                tabs={tabs}
                selectedTabKey={testCaseKey}
                onChange={tabKey => setTestCaseKey(tabKey)}
              />
            </div>
            <div>
              {actionSection}
            </div>
          </div>
          <div className="flex-1">
            {renderReactNodeOrFunctionP1(tabs[testCaseKey]?.body, { selectedTabKey: testCaseKey })}
          </div>
        </div>
        <div className="test-cases-output-stderr">
          <Tabs
            tabs={outputTabs}
            selectedTabKey={outputTab}
            onChange={value => setOutputTab(value)}
            extend={true}
          />
        </div>
      </SplitPane>
    </div>
  );
};
