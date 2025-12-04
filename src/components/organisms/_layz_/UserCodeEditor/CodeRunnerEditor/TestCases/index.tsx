import {
  CodeEditorTestCasesType,
  CodeEditorTestCaseType,
  getDataOfTestCase,
  getVerdictFromTestCase,
  mex,
  ProblemVerdict,
  SUBMISSION_RUN_STATUS,
  SubmissionRunStatus,
} from '@juki-team/commons';
import { useEffect, useState } from 'react';
import { NotificationType } from '../../../../../../enums';
import { InputToggle, Popover, T, TextArea } from '../../../../../atoms';
import { classNames } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { SplitPane, TabsInline, TabsInlineBody } from '../../../../../molecules';
import { AddIcon, CheckIcon, DeleteIcon, DraftIcon, InfoIIcon, SpinIcon } from '../../../../../server';
import { TabsType } from '../../../../../types';
import { ProblemVerdictTag } from '../../../../ProblemVerdictTag/ProblemVerdictTag';
import type { CodeRunnerEditorOnChangeType, TestCasesProps } from '../types';
import { LogInfo } from './LogInfo';

const AddCaseButton = <T, >({ onChange, testCasesValues, sample = false }: {
  onChange: CodeRunnerEditorOnChangeType<T>,
  testCasesValues: CodeEditorTestCaseType[],
  testCases: CodeEditorTestCasesType,
  sample?: boolean,
}) => {
  
  const { addNotification } = useJukiNotification();
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={`add ${sample ? 'sample' : 'custom sample'} case`}
      data-tooltip-place="left"
      className="jk-button light tiny only-icon jk-br-ie"
    >
      <AddIcon
        onClick={() => {
          const customCases = testCasesValues.filter(testCaseValue => !testCaseValue.sample);
          const noCustomCases = testCasesValues.filter(testCaseValue => testCaseValue.sample);
          const cases = sample ? noCustomCases : customCases;
          if (cases.length < (sample ? 30 : 16)) {
            const key = globalThis.crypto.randomUUID();
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
    if (testCasesValues.length && testCasesValues[0]) {
      if (!testCasesValues.some(testCase => testCase.key === testCaseKey)) {
        setTestCaseKey(testCasesValues[0].key);
      }
    }
  }, [ testCaseKey, testCases ]);
  
  const [ outputTab, setOutputTab ] = useState('output');
  const [ inputTab, setInputTab ] = useState('input');
  const test = testCases[testCaseKey] as CodeEditorTestCaseType | undefined;
  const testWithError = !!test && (
    getDataOfTestCase(test, timeLimit, memoryLimit).failed
    || !!test?.err
    || [ SubmissionRunStatus.FAILED, SubmissionRunStatus.COMPILATION_ERROR, SubmissionRunStatus.FAILED_TEST_CASE ].includes(test.status)
  );
  useEffect(() => {
    setOutputTab(testWithError ? 'error' : 'output');
  }, [ testWithError ]);
  
  const isLoadingState = test?.status === SubmissionRunStatus.RECEIVED
    || test?.status === SubmissionRunStatus.COMPILING
    || test?.status === SubmissionRunStatus.RUNNING_TEST_CASES
    || test?.status === SubmissionRunStatus.RUNNING_TEST_CASE;
  
  const loader = isLoadingState && (
    <div
      className="jk-overlay jk-overlay-backdrop jk-row center pn-ae"
      style={{ background: 'transparent', position: 'absolute' }}
    >
      <div className="jk-row" style={{ alignItems: 'baseline' }}>
        <T className="tt-se">{SUBMISSION_RUN_STATUS[test?.status].label}</T>&nbsp;
        <div className="dot-flashing" />
      </div>
    </div>
  );
  
  const outputTabs: TabsType = {};
  
  if (test?.testOut) {
    outputTabs['test-output'] = {
      key: 'test-output',
      header: (
        <div className="jk-row gap left nowrap">
          <T className="tt-se">expected output</T>
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
          'tt-se',
          // { 'cr-er': !!test && getDataOfTestCase(test, timeLimit, memoryLimit).failed },
        )}
      >
        your output
      </T>
    ),
    body: (
      <div className="ht-100 jk-col stretch nowrap pn-re">
        {loader}
        <div className="jk-pg-xsm ow-ao flex-1">
          <span className="jk-text-stdout">{test?.out}</span>
        </div>
      </div>
    ),
  };
  
  if (testWithError) {
    outputTabs['error'] = {
      key: 'error',
      header: (
        <T
          className={classNames(
            'tt-se',
            // { 'bc-er cr-we': (!!test && getDataOfTestCase(test, timeLimit, memoryLimit).failed) || !!test?.err },
          )}
        >
          error
        </T>
      ),
      body: (
        <div className="ht-100 jk-col stretch nowrap pn-re">
          {loader}
          {test && !test?.err ? (
            <div className="jk-row">
              <LogInfo testCase={test} timeLimit={timeLimit} memoryLimit={memoryLimit} />
            </div>
          ) : (
            <div className="jk-pg-xsm ow-ao flex-1">
              <span className="jk-text-stderr tx-t bc-er cr-we jk-pg-xsm">{test?.err}</span>
            </div>
          )}
        </div>
      ),
    };
  }
  
  const inputTabs: TabsType = {
    'input': {
      key: 'input',
      header: <T className="tt-se">input</T>,
      body: (test?.sample ? enableAddSampleCases : enableAddCustomSampleCases) && onChange ?
        <TextArea
          style={{
            height: 'calc(100% - 4px)',
            overflow: 'auto',
            width: 'calc(100% - 4px)',
            margin: 2,
            position: 'absolute',
          }}
          wrap="off"
          className="tx-s flex-1"
          value={test?.in}
          disabled={!test}
          onChange={test ? value => onChange({
            onTestCasesChange: (testCases) => ({
              ...testCases,
              [test?.key]: { ...test, in: value },
            }),
          }) : undefined}
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
      header: <T className="tt-se">expected output</T>,
      body: onChange ?
        <TextArea
          style={{
            height: 'calc(100% - 4px)',
            overflow: 'auto',
            width: 'calc(100% - 4px)',
            margin: 2,
            position: 'absolute',
          }}
          wrap="off"
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
      header: <T className="tt-se">settings</T>,
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
          <T className="tt-se" style={{ width: 48, lineHeight: 1 }}>test cases</T>
        </div>
        {testCasesValues.map((testCase) => {
          
          const verdict = getVerdictFromTestCase(testCase, timeLimit, memoryLimit).verdict;
          
          return (
            <div
              key={testCase.key}
              data-tooltip-id="jk-tooltip"
              data-tooltip-content={`${testCase.sample ? 'sample' : 'custom sample'} case`}
              data-tooltip-place="left"
              onClick={() => setTestCaseKey(testCase.key)}
              className={classNames('jk-row hoverable jk-pg-xsm space-between', { 'bc-hl': testCase.key === testCaseKey })}
              style={{ minWidth: 80 }}
            >
              <div className="jk-row left">
                {testCase.key === '*' ? (
                  <DraftIcon size="small" />
                ) : (
                  <DraftIcon
                    letter={((testCase.index + 1) % 10) + ''}
                    letterSize={12}
                    size="small"
                    className={classNames({ 'cr-il': testCase.sample })}
                  />
                )}
                {(testCase.sample ? enableAddSampleCases : enableAddCustomSampleCases) && testCase.key !== '*' && (
                  <>
                    &nbsp;
                    <DeleteIcon
                      size="tiny"
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
              </div>
              {testCase.status !== SubmissionRunStatus.NONE && (
                (![ SubmissionRunStatus.EXECUTED_TEST_CASE, SubmissionRunStatus.FAILED_TEST_CASE, SubmissionRunStatus.COMPILATION_ERROR ].includes(testCase.status)) ? (
                  <>&nbsp;<SpinIcon size="tiny" /></>
                ) : (
                  (!!testCase.testOut || verdict === ProblemVerdict.CE || verdict === ProblemVerdict.MLE || verdict === ProblemVerdict.TLE || verdict === ProblemVerdict.RE) ? (
                    <>&nbsp;<ProblemVerdictTag verdict={verdict} small /></>
                  ) : (
                    <div
                      data-tooltip-id="jk-tooltip"
                      data-tooltip-content="success executed"
                      className="cr-il"
                      style={{ lineHeight: 1, padding: '2px 4px' }}
                    >
                      <CheckIcon size="tiny" filledCircle />
                    </div>
                  )
                )
              )}
            </div>
          );
        })}
        {/*TODO: add character inside de buttons to distinguish the buttons*/}
        {enableAddSampleCases && onChange && (
          <div className="jk-row jk-pg-xsm-tb border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} sample />
          </div>
        )}
        {enableAddCustomSampleCases && onChange && (
          <div className="jk-row jk-pg-xsm-tb border-top-highlight-light">
            <AddCaseButton onChange={onChange} testCasesValues={testCasesValues} testCases={testCases} />
          </div>
        )}
      </div>
      {!enableAddSampleCases && test?.hidden ? (
        <div className="jk-row center ht-100 flex-1">
          <T className="tt-se jk-tag bc-il">test input hidden</T>
        </div>
      ) : (
        <SplitPane direction={direction === 'row' ? 'column' : 'row'} className="flex-1 ow-hn">
          <div className="jk-col extend stretch nowrap">
            <TabsInline
              tabs={inputTabs}
              selectedTabKey={inputTab}
              onChange={setInputTab}
              className="border-bottom-highlight-light tx-t jk-pg-xsm"
              tickStyle="background"
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
              className="border-bottom-highlight-light tx-t jk-pg-xsm"
              tickStyle="background"
              extraNodesPlacement="left"
              extraNodes={[
                <div key="info">
                  <Popover
                    popoverClassName="bc-we jk-br-ie elevation-1 jk-pg-xsm"
                    content={
                      <div className="pn-re">
                        {isLoadingState && (
                          <div className="jk-row" style={{ alignItems: 'baseline' }}>
                            <T className="tt-se">{SUBMISSION_RUN_STATUS[test?.status].label}</T>&nbsp;
                            <div className="dot-flashing" />
                          </div>
                        )}
                        {(!!test && !isLoadingState && test.status !== SubmissionRunStatus.NONE)
                          ? <LogInfo testCase={test} timeLimit={timeLimit} memoryLimit={memoryLimit} />
                          : !!test && !isLoadingState &&
                          <T className="tt-se">{test.sample ? 'unexecuted sample case' : 'unexecuted test case'}</T>}
                      </div>
                    }
                  >
                    <div className={classNames('jk-row', { 'cr-el': testWithError, 'cr-il': !testWithError })}>
                      <InfoIIcon filledCircle size="small" />
                    </div>
                  </Popover>
                </div>,
              ]}
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
