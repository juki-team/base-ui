import { mex, PROGRAMMING_LANGUAGE, SUBMISSION_RUN_STATUS } from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { classNames } from '../../../helpers';
import { SubmissionRunStatus } from '../../../types';
import { DeleteIcon, LoadingIcon, PlusIcon } from '../../graphics';
import { TextArea } from '../../Input';
import { NotificationType, useNotification } from '../../Notifications';
import { Popover } from '../../Popover';
import { SplitPane } from '../../SplitPane';
import { Tabs, TabType } from '../../Tabs';
import { T } from '../../Translate';
import { TestCasesProps } from '../types';
import { getErrors } from '../utils';
import { LogInfo } from './LogInfo';

export const TestCases = ({ testCases, onChange, language, timeLimit, memoryLimit, errorData, direction }: TestCasesProps) => {
  const testCasesValues = Object.values(testCases).sort((a, b) => (a.sample !== b.sample) ? +b.sample - +a.sample : a.index - b.index);
  const [testCaseKey, setTestCaseKey] = useState(testCasesValues[0]?.key || '');
  useEffect(() => {
    const testCasesValues = Object.values(testCases);
    if (testCasesValues.length) {
      if (!testCasesValues.some(testCase => testCase.key === testCaseKey)) {
        setTestCaseKey(testCasesValues[0].key);
      }
    }
  }, [testCaseKey, testCases]);
  const tabs: TabType<string>[] = testCasesValues.map(testCaseValue => ({
    key: testCaseValue.key,
    header: testCaseValue.sample
      ? testCaseValue.key === testCaseKey
        ? <div className="text-case"><T className="tt-se">sample</T> {testCaseValue.index + 1}</div>
        : <div className="text-case"><T className="tt-se">s.</T>{testCaseValue.index + 1}</div>
      : testCaseValue.key === testCaseKey
        ? <div className="text-case">
          <T className="tt-se">custom</T>
          &nbsp;{testCaseValue.index + 1}&nbsp;
          {Object.keys(testCases).length > 1 && (
            <DeleteIcon size="small" onClick={() => {
              const newTestCases = { ...testCases };
              delete newTestCases[testCaseValue.key];
              onChange?.({ testCases: newTestCases });
            }} />
          )}
        </div>
        : <div className="text-case"><T className="tt-se">c.</T>{testCaseValue.index + 1}</div>,
    body: (
      <TextArea
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
  }));
  
  const actionSection = (
    <Popover content={<T className="ws-np tt-se tx-s">add sample test case</T>} placement="bottomRight">
      <div>
        <PlusIcon
          size="small"
          circle
          onClick={() => {
            const customCases = testCasesValues.filter(testCaseValue => !testCaseValue.sample);
            if (customCases.length < 10) {
              const key = v4();
              const index = mex(customCases.map(testCaseValue => testCaseValue.index));
              onChange?.({
                testCases: {
                  ...testCases,
                  [key]: { key, index, in: '', out: '', err: '', log: '', sample: false, status: SubmissionRunStatus.NONE },
                },
              });
            } else {
              addNotification({ type: NotificationType.QUIET, message: <T>maximum test cases achieved</T> });
            }
          }}
        />
      </div>
    </Popover>
  );
  
  const [outputTab, setOutputTab] = useState('output');
  const { addNotification } = useNotification();
  const status = testCases[testCaseKey]?.status;
  useEffect(() => {
    setOutputTab(status === SubmissionRunStatus.FAILED || status === SubmissionRunStatus.COMPILATION_ERROR ? 'error' : 'output');
  }, [status]);
  
  const outputTabs: TabType<string>[] = [
    {
      key: 'output',
      header: (
        <T
          className={classNames('tt-se tx-s', { 'cr-er': getErrors(testCases[testCaseKey], timeLimit, memoryLimit).failed })}
        >
          output
        </T>
      ),
      body: (
        <div>
          {testCases[testCaseKey]?.log && testCases[testCaseKey]?.status !== SubmissionRunStatus.FAILED && (
            <LogInfo testCase={testCases[testCaseKey]} timeLimit={timeLimit} memoryLimit={memoryLimit} />
          )}
          <div className="content-log">
            <span className="text-stdout">{testCases[testCaseKey]?.out}</span>
          </div>
        </div>
      ),
    },
  ];
  
  if (errorData?.err) {
    outputTabs.push({
      key: 'error',
      header: (
        <T className={classNames('tt-se tx-s cr-er')}>
          {PROGRAMMING_LANGUAGE[language].hasBuildFile && errorData?.status === SubmissionRunStatus.COMPILATION_ERROR ? 'compilation log' : 'error'}
        </T>
      ),
      body: (
        <div>
          <LogInfo testCase={errorData} timeLimit={timeLimit} memoryLimit={memoryLimit} />
          <span className="text-stdout">{errorData?.out}</span>
        </div>
      ),
    });
  }
  
  return (
    <div className="jk-code-mirror-editor-test-cases">
      <SplitPane direction={direction === 'row' ? 'column' : 'row'}>
        <div className="test-cases-inputs">
          <Tabs
            tabs={tabs}
            selectedTabKey={testCaseKey}
            onChange={tabKey => setTestCaseKey(tabKey)}
            actionsSection={[actionSection]}
          />
        </div>
        <div className="test-cases-output-stderr">
          {testCases[testCaseKey]?.status === SubmissionRunStatus.RECEIVED && (
            <div className="jk-overlay ">
              <div className="jk-row-gap">
                <T>{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RECEIVED].label}</T>... <LoadingIcon />
              </div>
            </div>
          )}
          {testCases[testCaseKey]?.status === SubmissionRunStatus.COMPILING && (
            <div className="jk-overlay ">
              <div className="jk-row-gap">
                <T>{SUBMISSION_RUN_STATUS[SubmissionRunStatus.COMPILING].label}</T>... <LoadingIcon />
              </div>
            </div>
          )}
          {testCases[testCaseKey]?.status === SubmissionRunStatus.RUNNING_TEST_CASE && (
            <div className="jk-overlay ">
              <div className="jk-row-gap">
                <T>{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RUNNING_TEST_CASE].label}</T>... <LoadingIcon />
              </div>
            </div>
          )}
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
