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
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { NotificationType } from '../../../../types';
import { InputToggle, T, TextArea } from '../../../atoms';
import { SplitPane, TabsInline, TabsInlineBody } from '../../../molecules';
import { TabsType } from '../../../molecules/types';
import { AddIcon, DeleteIcon, InfoIIcon } from '../../../server';
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
  const [ inputTab, setInputTab ] = useState('input');
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
  
  const outputTabs: TabsType = {};
  
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
              <InfoIIcon circle size="small" />
            </div>
          )}
        </div>
      ),
      body: (
        <div className="ht-100 jk-col stretch nowrap">
          {loaderAndInfo}
          <div className="jk-pg-xsm ow-ao flex-1">
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
      <div className="ht-100 jk-col stretch nowrap">
        {loaderAndInfo}
        <div className="jk-pg-xsm ow-ao flex-1">
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
      <div className="ht-100 jk-col stretch nowrap">
        {loaderAndInfo}
        <div className="jk-pg-xsm ow-ao flex-1">
          <span className="jk-text-stderr tx-t bc-er cr-we jk-pg-xsm">{test?.err}</span>
        </div>
      </div>
    ),
  };
  
  const inputTabs: TabsType = {
    'input': {
      key: 'input',
      header: <T className="tt-se tx-s">input</T>,
      body: (test?.sample ? enableAddSampleCases : enableAddCustomSampleCases) && onChange ?
        <TextArea
          style={{
            height: 'calc(100% - 4px)',
            overflow: 'auto',
            width: 'calc(100% - 4px)',
            margin: 2,
          }}
          className="tx-s flex-1"
          value={test?.in}
          onChange={value => onChange({
            onTestCasesChange: (testCases) => ({
              ...testCases,
              [test?.key]: { ...test, in: value },
            }),
          })}
        /> : (
          <div className={classNames('flex-1 ow-ao jk-pg-xsm')}>
            <span className="jk-text-stdout">{test?.in}</span>
          </div>
        ),
    },
  };
  
  if ((test?.sample && enableAddSampleCases)) {
    inputTabs['output'] = {
      key: 'output',
      header: <T className="tt-se tx-s">output</T>,
      body: onChange ?
        <TextArea
          style={{
            height: 'calc(100% - 4px)',
            overflow: 'auto',
            width: 'calc(100% - 4px)',
            margin: 2,
          }}
          className="tx-s flex-1"
          value={test?.testOut}
          onChange={value => onChange({
            onTestCasesChange: (testCases) => ({
              ...testCases,
              [test?.key]: { ...test, testOut: value },
            }),
          })}
        /> : (
          <div className="flex-1 ow-ao jk-pg-xsm">
              <span className="jk-text-stdout">
                {test?.testOut}
              </span>
          </div>
        ),
    };
    inputTabs['settings'] = {
      key: 'settings',
      header: <T className="tt-se tx-s">settings</T>,
      body: (
        <div className="jk-col gap jk-pg-sm">
          <InputToggle
            size="small"
            checked={test?.hidden}
            leftLabel={<T className="tt-se tx-s">no hidden</T>}
            rightLabel={<T className="tt-se tx-s">hidden</T>}
            onChange={onChange ? hidden => onChange({
              onTestCasesChange: (testCases) => ({
                ...testCases,
                [test?.key]: { ...test, hidden },
              }),
            }) : undefined}
          />
          <InputToggle
            size="small"
            checked={test?.withPE}
            leftLabel={<T className="tt-se tx-s">without PE</T>}
            rightLabel={<T className="tt-se tx-s">with PE</T>}
            onChange={onChange ? withPE => onChange({
              onTestCasesChange: (testCases) => ({
                ...testCases,
                [test?.key]: { ...test, withPE },
              }),
            }) : undefined}
          />
        </div>
      ),
    };
  }
  
  return (
    <div className="jk-code-mirror-editor-test-cases jk-row stretch nowrap">
      <div className="jk-col nowrap stretch top tx-t border-right-highlight-light test-cases-header ow-ao">
        <div className="jk-row ta-cr fw-bd jk-pg-xsm-tb border-bottom-highlight-light">
          <T className="tt-se" style={{ width: 48 }}>test cases</T>
        </div>
        {testCasesValues.map((testCase, idx) => (
          <div
            key={testCase.key}
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={`${testCase.sample ? 'sample' : 'custom sample'} case`}
            data-tooltip-place="top-start"
            onClick={() => setTestCaseKey(testCase.key)}
            className={classNames('jk-row center hoverable jk-pg-xsm', { 'bc-hl': testCase.key === testCaseKey })}
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
          <div className="jk-row jk-pg-xsm-t border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} sample />
          </div>
        )}
        {enableAddCustomSampleCases && onChange && (
          <div className="jk-row jk-pg-xsm-t border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} />
          </div>
        )}
      </div>
      {!enableAddSampleCases && test?.hidden ? (
        <div className="jk-row center ht-100 flex-1">
          <T className="tt-se jk-tag info-light">test input hidden</T>
        </div>
      ) : (
        <SplitPane direction={direction === 'row' ? 'column' : 'row'} className="flex-1 ow-hn">
          <div className="jk-col extend stretch nowrap">
            <TabsInline
              tabs={inputTabs}
              selectedTabKey={inputTab}
              onChange={setInputTab}
              className="border-bottom-highlight-light"
            />
            <div className="flex-1 wh-100 pn-re ow-hn">
              <TabsInlineBody tabs={inputTabs} selectedTabKey={inputTab} />
            </div>
          </div>
          <div className="jk-col stretch test-cases-output-stderr">
            <TabsInline
              tabs={outputTabs}
              selectedTabKey={outputTab}
              onChange={setOutputTab}
              className="border-bottom-highlight-light"
            />
            <div className="flex-1 wh-100 pn-re ow-hn">
              <TabsInlineBody tabs={outputTabs} selectedTabKey={outputTab} />
            </div>
          </div>
        </SplitPane>
      )}
    </div>
  );
};
