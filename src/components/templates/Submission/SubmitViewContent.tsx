import {
  ProblemScoringMode,
  ProblemVerdict,
  PROGRAMMING_LANGUAGE,
  SubmissionDataResponseDTO,
  TestCaseResultType,
} from '@juki-team/commons';
import React from 'react';
import { hasTimeHasMemory } from '../../../helpers/submission';
import { Collapse, DateLiteral, T, UpIcon } from '../../atoms';
import { CodeViewer, Timer } from '../../molecules';
import { SubmissionGroupInfo } from './SubmissionGroupInfo';
import { SubmissionListenerVerdict } from './SubmissionListenerVerdict';
import { SubmissionMemory } from './SubmissionMemory';
import { SubmissionTime } from './SubmissionTime';

export const SubmitViewContent = ({ submit }: { submit: SubmissionDataResponseDTO }) => {
  
  const {
    submitId,
    problem: {
      isEditor: isProblemEditor,
      scoringMode: problemScoringMode,
    },
    user: {
      canViewSourceCode,
    },
    language,
    sourceCode,
    memoryUsed,
    timeUsed,
    verdict,
    points,
    status,
    timestamp,
    testCaseResults,
    verdictByGroups,
    compilationResult,
    judgmentTime,
  } = submit;
  
  const date = new Date(timestamp);
  const testCasesByGroup: { [key: number]: TestCaseResultType[] } = {};
  (
    testCaseResults || []
  ).forEach((testCase) => {
    const group = testCase.group ? (
      problemScoringMode === ProblemScoringMode.SUBTASK ? testCase.group : 1
    ) : 0;
    if (testCasesByGroup[group]) {
      testCasesByGroup[group].push(testCase);
    } else {
      testCasesByGroup[group] = [ testCase ];
    }
  });
  
  const compilationFailed = verdict !== ProblemVerdict.NONE
    && verdict !== ProblemVerdict.PENDING
    && compilationResult?.success === false;
  
  console.log({ verdictByGroups, testCasesByGroup });
  return (
    <div>
      <Collapse
        header={({ isOpen, toggle }) => (
          <div className="jk-row-col gap">
            <div className="jk-col">
              <div style={{ height: 48 }} className="jk-row">{PROGRAMMING_LANGUAGE[language]?.label || language}</div>
              <T className="fw-bd tt-se">language</T>
            </div>
            <div className="jk-col">
              <div className="jk-row gap center" style={{ height: 48 }}>
                <SubmissionListenerVerdict verdict={verdict} points={points} status={status} submitId={submitId} />
                {compilationFailed && <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />}
              </div>
              <T className="fw-bd tt-se">verdict</T>
            </div>
            {hasTimeHasMemory(verdict) && (
              <div className="jk-col">
                <div className="jk-row" style={{ height: 48 }}><SubmissionTime timeUsed={timeUsed} verdict={verdict} />
                </div>
                <T className="fw-bd tt-se">time used</T>
              </div>
            )}
            {hasTimeHasMemory(verdict) && (
              <div className="jk-col">
                <div className="jk-row" style={{ height: 48 }}><SubmissionMemory
                  memoryUsed={memoryUsed}
                  verdict={verdict}
                /></div>
                <T className="fw-bd tt-se">memory used</T>
              </div>
            )}
            <div className="jk-col">
              <DateLiteral date={date} twoLines style={{ height: 48 }} />
              <T className="fw-bd tt-se">date</T>
            </div>
            {isProblemEditor && (
              <div className="jk-col">
                <div className="jk-row" style={{ height: 48 }}>
                  ~&nbsp;
                  {judgmentTime > 0
                    ? <Timer currentTimestamp={judgmentTime} interval={0} literal laps={1} />
                    : (
                      <>
                        <Timer currentTimestamp={Date.now() - -judgmentTime} interval={1000} literal laps={1} />
                      </>
                    )}
                </div>
                <T className="fw-bd tt-se">{judgmentTime > 0 ? 'judgment time' : 'judging'}</T>
              </div>
            )}
          </div>
        )}
        startsShowing={compilationFailed}
      >
        <div className="submission-stderr-content jk-text-stderr">
          {compilationResult?.err}
        </div>
      </Collapse>
      {(
        (verdictByGroups && !!Object.keys(verdictByGroups).length)
        || (testCasesByGroup && !!Object.keys(testCasesByGroup).length)
      ) && (
        <div>
          <div className="tx-l fw-bd cr-pd">
            <T className="tt-se">
              {problemScoringMode === ProblemScoringMode.SUBTASK
                ? 'information by subtasks'
                : problemScoringMode === ProblemScoringMode.PARTIAL
                  ? 'information by groups'
                  : 'sample and test case information'}
            </T>
          </div>
          <div className="jk-col gap">
            <div className="jk-row extend block gap jk-table-inline-header">
              <div className="jk-row"><T>{problemScoringMode === ProblemScoringMode.SUBTASK ? 'groups' : ''}</T></div>
              <div className="jk-row" style={{ flex: 3 }}><T>verdict</T></div>
              {(problemScoringMode === ProblemScoringMode.SUBTASK || problemScoringMode === ProblemScoringMode.PARTIAL) && (
                <div className="jk-row"><T>points</T></div>
              )}
              <div className="jk-row"><T>time</T></div>
              <div className="jk-row"><T>memory</T></div>
            </div>
          </div>
          {(
            verdictByGroups && !!Object.keys(verdictByGroups).length
          ) ? (
            <div className="jk-col jk-border-radius-inline">
              {Object.entries(verdictByGroups).map(([ groupKey, result ]) => (
                <SubmissionGroupInfo
                  key={groupKey}
                  groupKey={+groupKey}
                  isProblemEditor={isProblemEditor}
                  problemScoringMode={problemScoringMode}
                  memoryUsed={result.memoryUsed}
                  verdict={result.verdict}
                  timeUsed={result.timeUsed}
                  points={result.points}
                  testCases={testCasesByGroup[result.group] || []}
                  submitId={submitId}
                />
              ))}
            </div>
          ) : (
            <div className="jk-col jk-border-radius-inline">
              {Object.entries(testCasesByGroup).map(([ groupKey, result ]) => (
                <SubmissionGroupInfo
                  key={groupKey}
                  groupKey={+groupKey}
                  isProblemEditor={isProblemEditor}
                  problemScoringMode={problemScoringMode}
                  memoryUsed={0}
                  verdict={verdict}
                  timeUsed={0}
                  points={problemScoringMode === ProblemScoringMode.PARTIAL
                    ? +result.reduce((sum, testCase) => sum + testCase.points, 0).toFixed(3)
                    : 0}
                  testCases={result}
                  submitId={submitId}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {!!canViewSourceCode && (
        <div className="jk-col gap stretch">
          <div className="tx-l fw-bd cr-pd"><T className="tt-se">source code</T></div>
          <div className="submission-info-code-source">
            <CodeViewer code={sourceCode} language={language} lineNumbers withCopyButton withLanguageLabel />
          </div>
        </div>
      )}
    </div>
  );
};
