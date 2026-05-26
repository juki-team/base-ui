import { CODE_LANGUAGE } from '@juki-team/commons/constants';
import type { JudgeDataResponseDTO, SubmissionDataResponseDTO, TestCaseResult } from '@juki-team/commons/dto';
import { Judge, ProblemScoringMode, ProblemVerdict } from '@juki-team/commons/enums';
import type { ContentsResponse } from '@juki-team/commons/types';
import { type ReactNode, useMemo, useSyncExternalStore } from 'react';
import { ContestTab } from '../../../../enums';
import { jukiApiManager, jukiAppRoutes } from '../../../../settings';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import Collapse from '../../../atoms/_lazy_/Collapse/Collapse';
import { Button } from '../../../atoms/Button/Button';
import { DateLiteral } from '../../../atoms/server/DateLiteral/DateLiteral';
import { OpenInNewIcon } from '../../../atoms/server/icons/google/OpenInNewIcon';
import { UpIcon } from '../../../atoms/server/icons/signs/UpIcon';
import { T } from '../../../atoms/T/T';
import { classNames, getJudgeOrigin } from '../../../helpers';
import { hasTimeHasMemory } from '../../../helpers/submission';
import { useFetcher } from '../../../hooks/useFetcher';
import CodeViewer from '../../../molecules/_lazy_/CodeViewer/CodeViewer';
import { SubmissionRejudgeButton } from '../../../molecules/SubmissionRejudgeButton/SubmissionRejudgeButton';
import { TimerDisplay } from '../../../molecules/server/TimerDisplay/TimerDisplay';
import { Timer } from '../../../molecules/Timer/Timer';
import { SubmissionMemory } from '../../server/SubmissionMemory/SubmissionMemory';
import { SubmissionTime } from '../../server/SubmissionTime/SubmissionTime';
import { UserChip } from '../../UserChip/UserChip';
import { SubmissionGroupInfo } from './SubmissionGroupInfo';
import { SubmissionListenerVerdict } from './SubmissionListenerVerdict';

type DisplayGridDataItem = { key: string; title: ReactNode; content: ReactNode };

const DisplayGridData = ({ data }: { data: DisplayGridDataItem[] }) => {
  return (
    <div className="jk-table-grid wh-100">
      {data.map(({ key, title, content }) => (
        <div key={key} className="jk-col bc-sf-hi jk-pg-xsm jk-br-ie">
          <div>{title}</div>
          <div>{content}</div>
        </div>
      ))}
    </div>
  );
};

export const SubmitViewContent = ({
  submit,
  header,
  className,
}: {
  submit: SubmissionDataResponseDTO;
  header?: ReactNode;
  className?: string;
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
}) => {
  const {
    runId,
    submitId,
    problem: { isManager, isAdministrator, scoringMode: problemScoringMode, key: problemKey },
    user: { nickname, canViewSourceCode },
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
  // SSR-safe mount detection: false on server, true after client hydration.
  // Used to gate Date.now()-derived rendering and avoid hydration mismatch.
  const mounted = useSyncExternalStore(
    // No subscription needed: mount state never changes after first render
    () => () => undefined,
    () => true,
    () => false,
  );
  const testCasesByGroup: { [key: number]: TestCaseResult[] } = {};
  for (const testCase of testCaseResults || []) {
    const group = testCase.group ? (problemScoringMode === ProblemScoringMode.SUBTASK ? testCase.group : 1) : 0;
    if (testCasesByGroup[group]) {
      testCasesByGroup[group].push(testCase);
    } else {
      testCasesByGroup[group] = [testCase];
    }
  }

  const compilationFailed =
    verdict !== ProblemVerdict.NONE && verdict !== ProblemVerdict.PENDING && compilationResult?.success === false;

  const { Link } = useUIStore((store) => store.components);
  const userOrganizationKey = useUserStore((state) => state.organization.key);
  const origin = getJudgeOrigin(submit.problem.organization.key, userOrganizationKey);

  const isLeetCode = submit.problem.judge.key === Judge.LEETCODE;
  const { data } = useFetcher<ContentsResponse<JudgeDataResponseDTO>>(jukiApiManager.apiV2.judge.getSummaryList().url);
  const getSubmissionUrl = data?.success ? data.contents.find(({ key }) => key === Judge.LEETCODE)?.getSubmissionUrl : '';
  // The judge `getSubmissionUrl` is a per-judge JS template body owned by the Juki API.
  // Trust boundary: Juki backend. Wrapped in try/catch + gated on isLeetCode to contain
  // failures and avoid rebuilding the function on every render.
  const externalUrl = useMemo(() => {
    if (!(isLeetCode && getSubmissionUrl)) return '';
    try {
      const fn = new Function('problemKey', 'submissionId', 'username', 'submissionRunId', getSubmissionUrl);
      return fn(problemKey, submitId, nickname, runId) as string;
    } catch {
      return '';
    }
  }, [isLeetCode, getSubmissionUrl, problemKey, submitId, nickname, runId]);

  return (
    <div className={classNames('jk-col stretch gap wh-100', className)}>
      {header}
      <Collapse
        // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
        header={({ isOpen, toggle }) => (
          <DisplayGridData
            data={[
              {
                key: 'nickname',
                title: <T className="fw-bd tt-se">nickname</T>,
                content: (
                  <UserChip
                    imageUrl={submit.user.imageUrl}
                    nickname={submit.user.nickname}
                    organizationKey={submit.user.organization.key}
                  />
                ),
              },
              {
                key: 'problem',
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
                key: 'language',
                title: <T className="fw-bd tt-se">language</T>,
                content: <div className="jk-row">{CODE_LANGUAGE[language]?.label || language}</div>,
              },
              {
                key: 'verdict',
                title: <T className="fw-bd tt-se">verdict</T>,
                content: (
                  <div className="jk-row gap center">
                    <SubmissionListenerVerdict submit={submit} />
                    {compilationFailed && <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />}
                  </div>
                ),
              },
              ...(hasTimeHasMemory(verdict)
                ? [
                    {
                      key: 'time-used',
                      title: <T className="fw-bd tt-se">time used</T>,
                      content: <SubmissionTime timeUsed={timeUsed} verdict={verdict} />,
                    },
                    {
                      key: 'memory-used',
                      title: <T className="fw-bd tt-se">memory used</T>,
                      content: <SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />,
                    },
                  ]
                : []),
              {
                key: 'date',
                title: <T className="fw-bd tt-se">date</T>,
                content: <DateLiteral date={date} twoLines />,
              },
              ...(isProblemEditor
                ? [
                    {
                      key: 'judgment-time',
                      title: <T className="fw-bd tt-se">{judgmentTime > 0 ? 'judgment time' : 'judging'}</T>,
                      content: (
                        // suppressHydrationWarning: the Timer (Date.now()) is gated by `mounted`
                        // (false on SSR, true after hydration) so it only renders client-side.
                        <div className="jk-row" suppressHydrationWarning>
                          ~&nbsp;
                          {judgmentTime > 0 ? (
                            <TimerDisplay
                              counter={judgmentTime}
                              literal
                              type="minutes-seconds-milliseconds"
                              maxSplit={2}
                              abbreviated
                            />
                          ) : mounted ? (
                            // eslint-disable-next-line react-doctor/rendering-hydration-mismatch-time -- gated by `mounted` (client-only), see useSyncExternalStore above
                            <Timer remaining={Date.now() - -judgmentTime} interval={1000} literal type="seconds" />
                          ) : null}
                        </div>
                      ),
                    },
                    {
                      key: 'actions',
                      title: <T className="fw-bd tt-se">actions</T>,
                      content: <SubmissionRejudgeButton submissionId={submit.submitId} />,
                    },
                  ]
                : []),
            ]}
          />
        )}
        startsShowing={compilationFailed}
        className="wh-100"
      >
        {!!compilationResult?.err && (
          <div className="submission-stderr-content jk-text-stderr tx-t bc-er cr-we jk-pg-xsm">{compilationResult?.err}</div>
        )}
      </Collapse>
      {((verdictByGroups && !!Object.keys(verdictByGroups).length) ||
        (testCasesByGroup && !!Object.keys(testCasesByGroup).length)) && (
        <div className="wh-100">
          <div className="tx-l fw-bd cr-tx-ht-dk">
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
              <div className="jk-row" style={{ flex: 3 }}>
                <T className="tt-se">verdict</T>
              </div>
              {(problemScoringMode === ProblemScoringMode.SUBTASK || problemScoringMode === ProblemScoringMode.PARTIAL) && (
                <div className="jk-row">
                  <T className="tt-se">points</T>
                </div>
              )}
              <div className="jk-row">
                <T className="tt-se">time</T>
              </div>
              <div className="jk-row">
                <T className="tt-se">memory</T>
              </div>
            </div>
          </div>
          {verdictByGroups && Object.keys(verdictByGroups).length ? (
            <div className="jk-col jk-br-ie">
              {Object.entries(verdictByGroups).map(([groupKey, result]) => (
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
              {Object.entries(testCasesByGroup).map(([groupKey, result]) => (
                <SubmissionGroupInfo
                  key={groupKey}
                  groupKey={+groupKey}
                  isProblemEditor={isProblemEditor}
                  problemScoringMode={problemScoringMode}
                  memoryUsed={0}
                  verdict={verdict}
                  timeUsed={0}
                  points={
                    problemScoringMode === ProblemScoringMode.PARTIAL
                      ? +result.reduce((sum, testCase) => sum + testCase.points, 0).toFixed(3)
                      : 0
                  }
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
          <div className="tx-l fw-bd cr-tx-ht-dk">
            <T className="tt-se">source code</T>
          </div>
          <div className="submission-info-code-source">
            <CodeViewer code={sourceCode} language={language} lineNumbers />
          </div>
        </div>
      )}
      {isLeetCode && (
        <div className="jk-row wh-100">
          <Link href={externalUrl} target="_blank">
            <Button>
              <T className="tt-se">view submission on LeetCode</T>
              <OpenInNewIcon />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
