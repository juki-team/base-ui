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
import { classNames } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks';
import { NotificationType } from '../../../../types';
import { T, TextArea } from '../../../atoms';
import { SplitPane, TabsInline, TabsInlineBody } from '../../../molecules';
import { TabsType } from '../../../molecules/types';
import { AddIcon, DeleteIcon, InfoIcon } from '../../../server';
import { ProblemVerdictTag } from '../../ProblemVerdictTag/ProblemVerdictTag';
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
    <div
      data-tooltip-t-class-name="ws-np tt-se tx-s"
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={`add ${sample ? 'sample' : 'custom sample'} case`}
      data-tooltip-place="top-start"
      className="jk-button light small only-icon"
    >
      <AddIcon
        size="small"
        onClick={() => {
          const customCases = testCasesValues.filter(testCaseValue => !testCaseValue.sample);
          const noCustomCases = testCasesValues.filter(testCaseValue => testCaseValue.sample);
          const cases = sample ? noCustomCases : customCases;
          if (cases.length < (sample ? 30 : 16)) {
            const key = crypto.randomUUID();
            const index = mex(cases.map(testCaseValue => testCaseValue.index));
            onChange?.({
              onTestCasesChange: (testCases) => ({
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
                  messageTimestamp: 0,
                },
              }),
            });
          } else {
            addNotification({ type: NotificationType.QUIET, message: <T>maximum test cases achieved</T> });
          }
        }}
      />
    </div>
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
    .sort((a, b) => a.key === '*' ? -1 : b.key === '*' ? 1 : (a.sample !== b.sample) ? +b.sample - +a.sample : a.index - b.index);
  const [ testCaseKey, setTestCaseKey ] = useState(testCasesValues[0]?.key || '*');
  useEffect(() => {
    const testCasesValues = Object.values(testCases);
    if (testCasesValues.length) {
      if (!testCasesValues.some(testCase => testCase.key === testCaseKey)) {
        setTestCaseKey(testCasesValues[0].key);
      }
    }
  }, [ testCaseKey, testCases ]);
  
  const [ outputTab, setOutputTab ] = useState('output');
  const test: CodeEditorTestCaseType | undefined = testCases[testCaseKey];
  const status = test?.status;
  useEffect(() => {
    setOutputTab(
      [ SubmissionRunStatus.FAILED, SubmissionRunStatus.COMPILATION_ERROR, SubmissionRunStatus.FAILED_TEST_CASE ].includes(status)
        ? 'error' : 'output',
    );
  }, [ status ]);
  
  const loaderAndInfo = (
    test?.status === SubmissionRunStatus.RECEIVED
    || test?.status === SubmissionRunStatus.COMPILING
    || test?.status === SubmissionRunStatus.RUNNING_TEST_CASES
    || test?.status === SubmissionRunStatus.RUNNING_TEST_CASE
  ) ? (
    <div
      className="jk-overlay jk-overlay-backdrop jk-row center"
      style={{ position: 'absolute', background: 'transparent' }}
    >
      <div className="jk-row" style={{ alignItems: 'baseline' }}>
        <T>{SUBMISSION_RUN_STATUS[test?.status].label}</T>&nbsp;
        <div className="dot-flashing" />
      </div>
    </div>
  ) : (
    !!test?.log &&
    <LogInfo testCase={test} timeLimit={timeLimit} memoryLimit={memoryLimit} />
  );
  
  const outputTabs: TabsType<string> = {};
  
  if (test?.testOut) {
    outputTabs['test-output'] = {
      key: 'test-output',
      header: (
        <div className="jk-row gap left nowrap">
          <T className={classNames('tt-se tx-s')}>
            expected output
          </T>
          {test?.withPE && (
            <div
              data-tooltip-id="jk-tooltip"
              data-tooltip-content={`${test?.testOut.lastIndexOf('\n') === test?.testOut.length - 1 ? '' : 'no '}newline at end of file`}
              className="jk-row"
            >
              <InfoIcon size="small" />
            </div>
          )}
        </div>
      ),
      body: (
        <div>
          {loaderAndInfo}
          <div className="jk-pg-x-sm">
            <span className="jk-text-stdout">{test?.testOut}</span>
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
          { 'cr-er': getDataOfTestCase(test, timeLimit, memoryLimit).failed },
        )}
      >
        your output
      </T>
    ),
    body: (
      <div>
        {loaderAndInfo}
        <div className="jk-pg-x-sm">
          <span className="jk-text-stdout">{test?.out}</span>
        </div>
      </div>
    ),
  };
  
  outputTabs['error'] = {
    key: 'error',
    header: (
      <T
        className={classNames(
          'tt-se tx-s',
          { 'cr-er': getDataOfTestCase(test, timeLimit, memoryLimit).failed },
        )}
      >
        error
      </T>
    ),
    body: (
      <div>
        {loaderAndInfo}
        <div className="jk-pg-x-sm">
          <span className="jk-text-stderr">{test?.err}</span>
        </div>
      </div>
    ),
  };
  
  return (
    <div className="jk-code-mirror-editor-test-cases jk-row stretch nowrap">
      <div className="jk-col nowrap stretch top tx-t border-right-highlight-light ow-ao">
        <div className="jk-row ta-cr fw-bd jk-pg-x-sm-tb border-bottom-highlight-light">
          <T className="tt-se" style={{ width: 48 }}>test cases</T>
        </div>
        {testCasesValues.map((testCase, idx) => (
          <div
            key={testCase.key}
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={`${testCase.sample ? 'sample' : 'custom sample'} case`}
            data-tooltip-place="top-start"
            onClick={() => setTestCaseKey(testCase.key)}
            className={classNames('jk-row center hoverable jk-pg-x-sm', { 'bc-hl': testCase.key === testCaseKey })}
          >
            {testCase.key === '*' ? (
              <T style={{ width: 48 }} className="tt-se ta-cr">default</T>
            ) : (
              <>
                <T className="tt-se">{testCase.sample ? 's.' : 'c.'}</T>
                &nbsp;{testCase.index + 1}
              </>
            )}
            {(testCase.sample ? enableAddSampleCases : enableAddCustomSampleCases) && testCase.key !== '*' && (
              <>
                &nbsp;
                <DeleteIcon
                  size="small"
                  className="clickable br-50-pc"
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content="delete case"
                  data-tooltip-place="right"
                  onClick={() => {
                    onChange?.({
                      onTestCasesChange: (testCases) => {
                        const newTestCases = { ...testCases };
                        delete newTestCases[testCase.key];
                        return newTestCases;
                      },
                    });
                  }}
                />
              </>
            )}
            {testCase.testOut
              && (testCase.status === SubmissionRunStatus.EXECUTED_TEST_CASE || testCase.status === SubmissionRunStatus.FAILED_TEST_CASE)
              && (
                <>
                  &nbsp;
                  <ProblemVerdictTag verdict={getVerdictFromTestCase(testCase, timeLimit, memoryLimit).verdict} small />
                </>
              )}
          </div>
        ))}
        {/*TODO: add character inside de buttons to distinguish the buttons*/}
        {enableAddSampleCases && onChange && (
          <div className="jk-row jk-pg-x-sm-t border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} sample />
          </div>
        )}
        {enableAddCustomSampleCases && onChange && (
          <div className="jk-row jk-pg-x-sm-t border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} />
          </div>
        )}
      </div>
      <SplitPane direction={direction === 'row' ? 'column' : 'row'} className="flex-1">
        <div className="jk-col extend stretch nowrap">
          <TabsInline
            tabs={{ '': { key: '', header: <T className="tt-se tx-s">input</T>, body: '' } }}
            className="border-bottom-highlight-light"
          />
          {test && !test.hidden && (
            (test?.sample ? enableAddSampleCases : enableAddCustomSampleCases) && onChange ?
              <TextArea
                style={{
                  height: 'calc(100% - 4px)',
                  overflow: 'auto',
                  width: 'calc(100% - 4px)',
                  margin: 2,
                }}
                className="tx-s flex-1"
                key={test.key}
                value={test.in}
                onChange={(test.sample ? enableAddSampleCases : enableAddCustomSampleCases) ? value => onChange?.({
                  onTestCasesChange: (testCases) => ({
                    ...testCases,
                    [test.key]: { ...test, in: value },
                  }),
                }) : undefined}
              /> : (
                <div className="flex-1 ow-ao jk-pg-x-sm">
              <span className="jk-text-stdout">
                {test.in}
              </span>
                </div>
              )
          )}
        </div>
        <div className="jk-col stretch test-cases-output-stderr">
          <TabsInline
            tabs={outputTabs}
            selectedTabKey={outputTab}
            onChange={value => setOutputTab(value)}
            className="border-bottom-highlight-light"
          />
          <div className="flex-1 wh-100 pn-re ow-hn">
            <TabsInlineBody tabs={outputTabs} selectedTabKey={outputTab} />
          </div>
        </div>
      </SplitPane>
    </div>
  );
};
