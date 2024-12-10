import {
  ProblemScoringMode,
  ProblemVerdict,
  PROGRAMMING_LANGUAGE,
  SubmissionDataResponseDTO,
  TestCaseResultType,
} from '@juki-team/commons';
import React from 'react';
import { hasTimeHasMemory } from '../../../helpers/submission';
import { DateLiteral, T, UpIcon } from '../../atoms';
import { CodeViewer, Collapse, Timer } from '../../molecules';
import { SubmissionRejudgeButton, UserChip } from '../../organisms';
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
  
  return (
    <div className="jk-col stretch gap">
      <Collapse
        header={({ isOpen, toggle }) => (
          <div className="jk-row-col gap tx-s bottom">
            <div className="jk-col">
              <div className="jk-row">
                <UserChip imageUrl={submit.user.imageUrl} nickname={submit.user.nickname} />
              </div>
              <T className="fw-bd tt-se">nickname</T>
            </div>
            <div className="jk-col">
              <div className="jk-row">{PROGRAMMING_LANGUAGE[language]?.label || language}</div>
              <T className="fw-bd tt-se">language</T>
            </div>
            <div className="jk-col">
              <div className="jk-row gap center">
                <SubmissionListenerVerdict verdict={verdict} points={points} status={status} submitId={submitId} />
                {compilationFailed && <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />}
              </div>
              <T className="fw-bd tt-se">verdict</T>
            </div>
            {hasTimeHasMemory(verdict) && (
              <div className="jk-col">
                <div className="jk-row"><SubmissionTime timeUsed={timeUsed} verdict={verdict} />
                </div>
                <T className="fw-bd tt-se">time used</T>
              </div>
            )}
            {hasTimeHasMemory(verdict) && (
              <div className="jk-col">
                <div className="jk-row"><SubmissionMemory
                  memoryUsed={memoryUsed}
                  verdict={verdict}
                /></div>
                <T className="fw-bd tt-se">memory used</T>
              </div>
            )}
            <div className="jk-col">
              <DateLiteral date={date} twoLines />
              <T className="fw-bd tt-se">date</T>
            </div>
            {isProblemEditor && (
              <>
                <div className="jk-col">
                  <div className="jk-row">
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
                <div className="jk-col">
                  <div className="jk-row">
                    <SubmissionRejudgeButton submissionId={submit.submitId} />
                  </div>
                  <T className="fw-bd tt-se">actions</T>
                </div>
              </>
            )}
          </div>
        )}
        startsShowing={compilationFailed}
        className="wh-100"
      >
        <div className="submission-stderr-content jk-text-stderr">
          {compilationResult?.err}
        </div>
      </Collapse>
      {(
        (verdictByGroups && !!Object.keys(verdictByGroups).length)
        || (testCasesByGroup && !!Object.keys(testCasesByGroup).length)
      ) && (
        <div className="wh-100">
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
              <div className="jk-row">
                <T className="tt-se">{problemScoringMode === ProblemScoringMode.SUBTASK ? 'groups' : ''}</T>
              </div>
              <div className="jk-row" style={{ flex: 3 }}><T className="tt-se">verdict</T></div>
              {(problemScoringMode === ProblemScoringMode.SUBTASK || problemScoringMode === ProblemScoringMode.PARTIAL) && (
                <div className="jk-row"><T className="tt-se">points</T></div>
              )}
              <div className="jk-row"><T className="tt-se">time</T></div>
              <div className="jk-row"><T className="tt-se">memory</T></div>
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
        <div className="jk-col stretch wh-100">
          <div className="tx-l fw-bd cr-pd"><T className="tt-se">source code</T></div>
          <div className="submission-info-code-source">
            <CodeViewer code={sourceCode} language={language} lineNumbers withCopyButton withLanguageLabel />
          </div>
        </div>
      )}
    </div>
  );
};
