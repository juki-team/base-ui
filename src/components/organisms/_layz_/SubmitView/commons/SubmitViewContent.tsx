import {
  CODE_LANGUAGE,
  type ContentsResponseType,
  Judge,
  type JudgeDataResponseDTO,
  ProblemScoringMode,
  ProblemVerdict,
  type SubmissionDataResponseDTO,
  type TestCaseResultType,
} from '@juki-team/commons';
import { type ReactNode } from 'react';
import { ContestTab } from '../../../../../enums';
import { jukiApiManager, jukiAppRoutes } from '../../../../../settings';
import { useUIStore } from '../../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { Button, Collapse, DateLiteral, T } from '../../../../atoms';
import { getJudgeOrigin } from '../../../../helpers';
import { hasTimeHasMemory } from '../../../../helpers/submission';
import { useFetcher } from '../../../../hooks/useFetcher';
import { CodeViewer, SubmissionRejudgeButton, Timer } from '../../../../molecules';
import { OpenInNewIcon, UpIcon } from '../../../../server';
import { UserChip } from '../../../UserChip/UserChip';
import { SubmissionGroupInfo } from './SubmissionGroupInfo';
import { SubmissionListenerVerdict } from './SubmissionListenerVerdict';
import { SubmissionMemory } from './SubmissionMemory';
import { SubmissionTime } from './SubmissionTime';

const DisplayGridData = ({ data }: { data: { title: ReactNode, content: ReactNode }[] }) => {
  return (
    <div className="jk-table-grid wh-100">
      {data.map(({ title, content }, index) => (
        <div className="jk-col bc-we jk-pg-xsm jk-br-ie" key={index}>
          <div>
            {title}
          </div>
          <div>
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SubmitViewContent = ({ submit }: { submit: SubmissionDataResponseDTO }) => {
  
  const {
    runId,
    submitId,
    problem: {
      isManager,
      isAdministrator,
      scoringMode: problemScoringMode,
      key: problemKey,
    },
    user: {
      nickname,
      canViewSourceCode,
    },
    language,
    sourceCode,
    memoryUsed,
    timeUsed,
    verdict,
    timestamp,
    testCaseResults,
    verdictByGroups,
    compilationResult,
    judgmentTime,
    contest,
  } = submit;
  
  const isProblemEditor = isManager || isAdministrator;
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
  
  const { Link } = useUIStore(store => store.components);
  const userCompanyKey = useUserStore(state => state.company.key);
  const origin = getJudgeOrigin(submit.problem.company.key, userCompanyKey);
  
  const isLeetCode = submit.problem.judge.key === Judge.LEETCODE;
  const { data } = useFetcher<ContentsResponseType<JudgeDataResponseDTO>>(
    jukiApiManager.API_V2.judge.getSummaryList().url,
  );
  const getSubmissionUrl = data?.success ? data.contents.find(({ key }) => key === Judge.LEETCODE)?.getSubmissionUrl : '';
  const getSubmissionUrlFn = new Function('problemKey', 'submissionId', 'username', 'submissionRunId', getSubmissionUrl || 'return \'\'');
  const externalUrl = getSubmissionUrlFn(problemKey, submitId, nickname, runId) as string;
  
  return (
    <div className="jk-col stretch gap wh-100">
      <Collapse
        header={({ isOpen, toggle }) => (
          <DisplayGridData
            data={[
              {
                title: <T className="fw-bd tt-se">nickname</T>,
                content: (
                  <UserChip
                    imageUrl={submit.user.imageUrl}
                    nickname={submit.user.nickname}
                    companyKey={submit.user.company.key}
                  />
                ),
              },
              {
                title: <T className="fw-bd tt-se">problem</T>,
                content: contest ? (
                  <Link
                    href={jukiAppRoutes.JUDGE(origin).contests.view({
                      key: contest.key,
                      tab: ContestTab.PROBLEMS,
                      subTab: contest.problemIndex,
                    })}
                    target={origin ? '_blank' : undefined}
                    className="link"
                  >
                    <div>{submit.problem.key}</div>
                  </Link>
                ) : (
                  <Link
                    href={jukiAppRoutes.JUDGE(origin).problems.view({ key: submit.problem.key })}
                    target={origin ? '_blank' : undefined}
                    className="link"
                  >
                    <div>{submit.problem.key}</div>
                  </Link>
                ),
              },
              {
                title: <T className="fw-bd tt-se">language</T>,
                content: <div className="jk-row">{CODE_LANGUAGE[language]?.label || language}</div>,
              },
              {
                title: <T className="fw-bd tt-se">verdict</T>,
                content: (
                  <div className="jk-row gap center">
                    <SubmissionListenerVerdict submit={submit} />
                    {compilationFailed && <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />}
                  </div>
                ),
              },
              ...(hasTimeHasMemory(verdict) ? [
                {
                  title: <T className="fw-bd tt-se">time used</T>,
                  content: <SubmissionTime timeUsed={timeUsed} verdict={verdict} />,
                }, {
                  title: <T className="fw-bd tt-se">memory used</T>,
                  content: <SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />,
                },
              ] : []),
              {
                title: <T className="fw-bd tt-se">date</T>,
                content: <DateLiteral date={date} twoLines />,
              },
              ...(isProblemEditor ? [
                {
                  title: <T className="fw-bd tt-se">{judgmentTime > 0 ? 'judgment time' : 'judging'}</T>,
                  content: (
                    <div className="jk-row">
                      ~&nbsp;
                      {judgmentTime > 0
                        ? <Timer remaining={judgmentTime} interval={0} literal type="seconds" />
                        : <Timer remaining={Date.now() - -judgmentTime} interval={1000} literal type="seconds" />
                      }
                    </div>
                  ),
                },
                {
                  title: <T className="fw-bd tt-se">actions</T>,
                  content: <SubmissionRejudgeButton submissionId={submit.submitId} />,
                },
              ] : []),
            ]}
          />
        )}
        startsShowing={compilationFailed}
        className="wh-100"
      >
        {!!compilationResult?.err && (
          <div className="submission-stderr-content jk-text-stderr tx-t bc-er cr-we jk-pg-xsm">
            {compilationResult?.err}
          </div>
        )}
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
            <div className="jk-col jk-br-ie">
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
            <div className="jk-col jk-br-ie">
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
      {!!canViewSourceCode && !isLeetCode && (
        <div className="jk-col stretch wh-100">
          <div className="tx-l fw-bd cr-pd"><T className="tt-se">source code</T></div>
          <div className="submission-info-code-source">
            <CodeViewer code={sourceCode} language={language} lineNumbers />
          </div>
        </div>
      )}
      {isLeetCode && (
        <div className="jk-row wh-100">
          <Link href={externalUrl} target="_blank">
            <Button>
              <T className="tt-se">view submission on LeetCode</T><OpenInNewIcon />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
