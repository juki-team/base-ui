import {
  PROBLEM_VERDICT,
  ProblemVerdict,
  ProfileSetting,
  SocketEventSubmissionResponseDTO,
  SUBMISSION_RUN_STATUS,
  SubmissionDataResponseDTO,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import React, { ReactNode } from 'react';
import { useJukiUser } from '../../../hooks';
import { LoadingIcon, T, Tooltip } from '../../atoms';

export interface SubmissionVerdictProps {
  verdict: ProblemVerdict,
  points?: number,
  status?: SubmissionRunStatus,
  submitId: string,
  submissionData?: SocketEventSubmissionResponseDTO,
  processedCases?: SubmissionDataResponseDTO['processedCases'],
  shortLabel?: boolean,
}

export const SubmissionVerdict = (props: SubmissionVerdictProps) => {
  
  const { verdict, points, status, submissionData, processedCases, shortLabel: _shortLabel } = props;
  const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  const addDark = userTheme === Theme.DARK ? 'CC' : '';
  
  const verdictLabel = (verdict: ProblemVerdict, shortLabel = _shortLabel) => PROBLEM_VERDICT[verdict]?.label
    ? (
      (verdict === ProblemVerdict.PENDING && processedCases && !!(processedCases.samples.total + processedCases.tests.total))
        ? <>
          <T className="tt-se ws-np">{PROBLEM_VERDICT[verdict]?.label}</T>
          &nbsp;{processedCases.samples.processed + processedCases.tests.processed}&nbsp;/&nbsp;{processedCases.samples.total + processedCases.tests.total}
        </>
        : <T className="tt-se ws-np">{shortLabel ? verdict : PROBLEM_VERDICT[verdict]?.label}</T>
    )
    : verdict;
  
  const SubmissionLabel: { [key in SubmissionRunStatus]: (props: SocketEventSubmissionResponseDTO) => ReactNode } = {
    [SubmissionRunStatus.NONE]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        {verdictLabel(verdict)}
      </div>
    ),
    [SubmissionRunStatus.FAILED]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        {verdictLabel(verdict)}
      </div>
    ),
    [SubmissionRunStatus.RECEIVED]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RECEIVED].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.COMPILING]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.COMPILING].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.COMPILED]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.COMPILED].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.COMPILATION_ERROR]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        {verdictLabel(verdict)}
      </div>
    ),
    [SubmissionRunStatus.FETCHING_TEST_CASES]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.FETCHING_TEST_CASES].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.EXECUTED_TEST_CASE]: ({ testInfo, verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        {!!testInfo && (
          <div className="jk-row tx-t nowrap" style={{ lineHeight: 1, padding: '4px 0' }}>
            {testInfo.sampleCase
              ? <T className="tt-se">running sample cases</T>
              : <T className="tt-se">running test cases</T>}&nbsp;
            <span className="ws-np">{testInfo.caseResultsExecuted}/{testInfo.caseResultsTotal}</span>
          </div>
        )}
      </div>
    ),
    [SubmissionRunStatus.FAILED_TEST_CASE]: ({ testInfo, verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        {!!testInfo && (
          <div className="jk-row tx-t nowrap" style={{ lineHeight: 1, padding: '4px 0' }}>
            {testInfo.sampleCase
              ? <T className="tt-se">failed sample case</T>
              : <T className="tt-se">failed test case</T>}
          </div>
        )}
      </div>
    ),
    [SubmissionRunStatus.RUNNING_TEST_CASE]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RUNNING_TEST_CASE].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.RUNNING_TEST_CASES]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.RUNNING_TEST_CASES].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.JUDGING_TEST_CASE]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.JUDGING_TEST_CASE].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.GRADING]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        <LoadingIcon size="small" />
        &nbsp;
        <div className="jk-row tx-t" style={{ lineHeight: 1, padding: '4px 0' }}>
          <T className="tt-se">{SUBMISSION_RUN_STATUS[SubmissionRunStatus.GRADING].label}</T>
        </div>
      </div>
    ),
    [SubmissionRunStatus.COMPLETED]: ({ verdict }) => (
      <div className="jk-row nowrap jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        {verdict === ProblemVerdict.PENDING ? <>
          <LoadingIcon size="small" />&nbsp;{verdictLabel(verdict)}</> : verdictLabel(verdict)}
        {verdict === ProblemVerdict.PA && points && <>&nbsp;({(+points || 0).toFixed(2)})</>}
      </div>
    ),
  };
  
  const content = (
    submissionData ?
      <>
        {SubmissionLabel[submissionData.status]?.(submissionData) || submissionData.status}
      </> : (
        <div className="jk-row center jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
          {verdict === ProblemVerdict.PENDING
            ? <><LoadingIcon size="small" />&nbsp;{verdictLabel(verdict, true)}</> : verdictLabel(verdict, true)}
          {verdict === ProblemVerdict.PA && points && (
            <>
              &nbsp;<span className="ws-np">({(+points || 0).toFixed(2)})</span>
            </>
          )}
        </div>
      )
  );
  
  if (_shortLabel) {
    return content;
  }
  
  return (
    <Tooltip
      content={
        <div className="tt-se ws-np">
          {verdict === ProblemVerdict.PENDING
            ? (
              (status && SUBMISSION_RUN_STATUS[status]?.label)
                ? <T className="ws-np">{SUBMISSION_RUN_STATUS[status]?.label}</T>
                : status || verdictLabel(verdict)
            ) : verdictLabel(verdict)}
          {verdict === ProblemVerdict.PA && points && (
            <>
              &nbsp;<span className="ws-np">({(+points || 0).toFixed(2)} <T>points</T>)</span>
            </>
          )}
        </div>
      }
      placement="top"
      withPortal
    >
      {content}
    </Tooltip>
  );
};
