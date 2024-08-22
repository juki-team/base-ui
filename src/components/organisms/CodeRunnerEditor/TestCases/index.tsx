import {
  CodeEditorTestCasesType,
  CodeEditorTestCaseType,
  getDataOfTestCase,
  getVerdictFromTestCase,
  mex,
  SUBMISSION_RUN_STATUS,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { AddIcon, DeleteIcon, InfoIcon, T, TextArea, Tooltip } from '../../../atoms';
import { SplitPane, TabsInline, TabsType, TabType } from '../../../molecules';
import { NotificationType } from '../../Notifications';
import { ProblemVerdictTag } from '../../ProblemVerdictTag';
import { CodeRunnerEditorOnChangeType, TestCasesProps } from '../types';
import { LogInfo } from './LogInfo';

const AddCaseButton = <T, >({ onChange, testCasesValues, testCases, sample = false }: {
  onChange: CodeRunnerEditorOnChangeType<T>,
  testCasesValues: CodeEditorTestCaseType[],
  testCases: CodeEditorTestCasesType,
  sample?: boolean,
}) => {
  const { addNotification } = useJukiNotification();
  return (
    <Tooltip
      content={<T className="ws-np tt-se tx-s">{`add ${sample ? 'sample' : 'custom sample'} case`}</T>}
      placement="top-end"
    >
      <div className="jk-button light small only-icon" style={{ margin: '6px' }}>
        <AddIcon
          size="small"
          onClick={() => {
            const customCases = testCasesValues.filter(testCaseValue => !testCaseValue.sample);
            const noCustomCases = testCasesValues.filter(testCaseValue => testCaseValue.sample);
            const cases = sample ? noCustomCases : customCases;
            if (cases.length < (sample ? 30 : 15)) {
              const key = v4();
              const index = mex(cases.map(testCaseValue => testCaseValue.index));
              onChange?.({
                testCases: {
                  ...testCases,
                  [key]: {
                    key,
                    index,
                    in: '',
                    out: '',
                    testOut: '',
                    withPE: noCustomCases?.[0]?.withPE ?? true,
                    err: '',
                    log: '',
                    hidden: false,
                    sample: sample,
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
};

export const TestCases = <T, >(props: TestCasesProps<T>) => {
  
  const {
    testCases = {},
    onChange,
    timeLimit,
    memoryLimit,
    direction,
    enableAddSampleCases,
    enableAddCustomSampleCases,
  } = props;
  
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
  
  const inputTabs: { [key: string]: TabType<string> } = {};
  testCasesValues
    .filter(testCaseValue => !testCaseValue.hidden)
    .forEach(testCaseValue => {
      const headerLabel = (
        testCaseValue.key === testCaseKey
          ?
          <div className="jk-row ws-np nowrap tx-s">
            <T className="tt-se">{testCaseValue.sample ? 'sample' : 'custom'}</T>&nbsp;{testCaseValue.index + 1}
            {(testCaseValue.sample ? enableAddSampleCases : enableAddCustomSampleCases) && (
              <>
                &nbsp;
                <DeleteIcon
                  size="small"
                  className="clickable br-50-pc"
                  onClick={() => {
                    const newTestCases = { ...testCases };
                    delete newTestCases[testCaseValue.key];
                    onChange?.({ testCases: newTestCases });
                  }}
                />
              </>
            )}
          </div>
          : <div className="jk-row ws-np nowrap tx-s">
            <T className="tt-se">{testCaseValue.sample ? 's.' : 'c.'}</T>&nbsp;{testCaseValue.index + 1}
          </div>
      );
      
      const { verdict } = getVerdictFromTestCase(testCaseValue, timeLimit, memoryLimit);
      
      inputTabs[testCaseValue.key] = {
        key: testCaseValue.key,
        header: <>
          {headerLabel}
          {testCaseValue.testOut
            && (testCaseValue.status === SubmissionRunStatus.EXECUTED_TEST_CASE || testCaseValue.status === SubmissionRunStatus.FAILED_TEST_CASE)
            && (
              <>
                &nbsp;
                <ProblemVerdictTag verdict={verdict} />
              </>
            )}
        </>,
        body: (
          (testCaseValue.sample ? enableAddSampleCases : enableAddCustomSampleCases) && onChange ?
            <TextArea
              style={{ height: '100%', boxShadow: 'none', borderRadius: 0, overflow: 'auto' }}
              className="tx-s"
              key={testCaseValue.key}
              value={testCaseValue.in}
              onChange={(testCaseValue.sample ? enableAddSampleCases : enableAddCustomSampleCases) ? value => onChange?.({
                testCases: {
                  ...testCases,
                  [testCaseValue.key]: { ...testCaseValue, in: value },
                },
              }) : undefined}
            /> :
            <div className="content-log" style={{ padding: 'calc(var(--pad-sm) / 2)' }}>
              <span className="jk-text-stdout">
                {testCaseValue.in}
              </span>
            </div>
        ),
      };
    });
  
  const [ outputTab, setOutputTab ] = useState('output');
  const status = testCases[testCaseKey]?.status;
  useEffect(() => {
    setOutputTab(
      [ SubmissionRunStatus.FAILED, SubmissionRunStatus.COMPILATION_ERROR, SubmissionRunStatus.FAILED_TEST_CASE ].includes(status)
        ? 'error' : 'output',
    );
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
  
  const outputTabs: TabsType<string> = {};
  
  if (testCases[testCaseKey]?.testOut) {
    outputTabs['test-output'] = {
      key: 'test-output',
      header: (
        <div className="jk-row gap left nowrap">
          <T className={classNames('tt-se tx-s')}>
            sample output
          </T>
          {testCases[testCaseKey]?.withPE && (
            <Tooltip
              content={
                <T>{`${testCases[testCaseKey]?.testOut.lastIndexOf('\n') === testCases[testCaseKey]?.testOut.length - 1 ? '' : 'no '}newline at end of file`}</T>
              }
              placement="top-end"
              withPortal
            >
              <div className="jk-row"><InfoIcon size="small" /></div>
            </Tooltip>
          )}
        </div>
      ),
      body: (
        <div>
          {loaderAndInfo}
          <div className="content-log" style={{ padding: 'calc(var(--pad-sm) / 2)' }}>
            <span className="jk-text-stdout">{testCases[testCaseKey]?.testOut}</span>
          </div>
        </div>
      ),
    };
  }
  outputTabs['output'] = {
    key: 'output',
    header: (
      <T
        className={classNames(
          'tt-se tx-s',
          { 'cr-er': getDataOfTestCase(testCases[testCaseKey], timeLimit, memoryLimit).failed },
        )}
      >
        output
      </T>
    ),
    body: (
      <div>
        {loaderAndInfo}
        <div className="content-log" style={{ padding: 'calc(var(--pad-sm) / 2)' }}>
          <span className="jk-text-stdout">{testCases[testCaseKey]?.out}</span>
        </div>
      </div>
    ),
  };
  
  if (testCases[testCaseKey]?.err) {
    outputTabs['error'] = {
      key: 'error',
      header: (
        <T
          className={classNames(
            'tt-se tx-s',
            { 'cr-er': getDataOfTestCase(testCases[testCaseKey], timeLimit, memoryLimit).failed },
          )}
        >
          error
        </T>
      ),
      body: (
        <div>
          {loaderAndInfo}
          <div className="content-log" style={{ padding: 'calc(var(--pad-sm) / 2)' }}>
            <span className="jk-text-stderr">{testCases[testCaseKey]?.err}</span>
          </div>
        </div>
      ),
    };
  }
  
  return (
    <div className="jk-code-mirror-editor-test-cases">
      <SplitPane direction={direction === 'row' ? 'column' : 'row'}>
        <div className="jk-col extend stretch nowrap">
          <div className="jk-row nowrap border-bottom-highlight-light">
            <div className="flex-1" style={{ overflow: 'auto' }}>
              <TabsInline
                tabs={inputTabs}
                selectedTabKey={testCaseKey}
                onChange={tabKey => setTestCaseKey(tabKey)}
              />
            </div>
            {/*TODO: add character inside de buttons to distinguish the buttons*/}
            {enableAddSampleCases && onChange && (
              <div>
                <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} sample />
              </div>
            )}
            {enableAddCustomSampleCases && onChange && (
              <div>
                <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} />
              </div>
            )}
          </div>
          <div className="flex-1" style={{ overflow: 'auto' }}>
            {renderReactNodeOrFunctionP1(inputTabs[testCaseKey]?.body, { selectedTabKey: testCaseKey })}
          </div>
        </div>
        <div className="jk-col stretch test-cases-output-stderr">
          <TabsInline
            tabs={outputTabs}
            selectedTabKey={outputTab}
            onChange={value => setOutputTab(value)}
            className="border-bottom-highlight-light"
          />
          <div className="flex-1" style={{ overflow: 'auto', width: '100%' }}>
            {renderReactNodeOrFunctionP1(outputTabs[outputTab]?.body, { selectedTabKey: outputTab })}
          </div>
        </div>
      </SplitPane>
    </div>
  );
};
