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
import React from 'react';
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
  
  const { verdict, points, submissionData, processedCases, shortLabel: _shortLabel } = props;
  const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  const addDark = userTheme === Theme.DARK ? 'CC' : '';
  
  const verdictLabel = (verdict: ProblemVerdict, shortLabel = _shortLabel) => {
    return (
      <>
        {verdict === ProblemVerdict.PENDING && <><LoadingIcon size="small" />&nbsp;</>}
        {PROBLEM_VERDICT[verdict]?.label
          ? (
            (verdict === ProblemVerdict.PENDING && processedCases && !!(processedCases.samples.total + processedCases.tests.total))
              ? <>
                <T className="tt-se ws-np">{PROBLEM_VERDICT[verdict]?.label}</T>
                &nbsp;{processedCases.samples.processed + processedCases.tests.processed}&nbsp;/&nbsp;{processedCases.samples.total + processedCases.tests.total}
              </>
              : <T className="tt-se ws-np">{shortLabel ? verdict : PROBLEM_VERDICT[verdict]?.label}</T>
          )
          : verdict}
        {verdict === ProblemVerdict.PA && points && (
          <>
            &nbsp;<span className="ws-np">({(+points || 0).toFixed(2)} <T>pts.</T>)</span>
          </>
        )}
      </>
    );
  };
  
  const submissionLabel = ({ verdict, status, testInfo, points }: SocketEventSubmissionResponseDTO) => {
    return (
      <div className="jk-row nowrap jk-tag tx-t" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
        {([
          SubmissionRunStatus.RECEIVED,
          SubmissionRunStatus.COMPILING,
          SubmissionRunStatus.COMPILED,
          SubmissionRunStatus.FETCHING_TEST_CASES,
          SubmissionRunStatus.JUDGING_TEST_CASE,
          SubmissionRunStatus.RUNNING_TEST_CASES,
          SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES,
          SubmissionRunStatus.RUNNING_TEST_CASE,
          SubmissionRunStatus.EXECUTED_TEST_CASE,
          SubmissionRunStatus.FAILED_TEST_CASE,
          SubmissionRunStatus.GRADING,
        ].includes(status) || verdict === ProblemVerdict.PENDING) && (
          <>
            <LoadingIcon size="small" />
            &nbsp;
          </>
        )}
        <div className="jk-row" style={{ lineHeight: 1, padding: '4px 0' }}>
          {status === SubmissionRunStatus.COMPLETED ? (
            <T className="tt-se">{PROBLEM_VERDICT[verdict]?.label || verdict}</T>
          ) : (
            <T className="tt-se">{SUBMISSION_RUN_STATUS?.[status].label || status}</T>
          )}
        </div>
        {!!testInfo && status === SubmissionRunStatus.EXECUTED_TEST_CASE && (
          <div className="jk-row nowrap" style={{ lineHeight: 1, padding: '4px 0' }}>
            {testInfo.sampleCase
              ? <T className="tt-se">running sample cases</T>
              : <T className="tt-se">running test cases</T>}
            &nbsp;
            <span className="ws-np">{testInfo.caseResultsExecuted} / {testInfo.caseResultsTotal}</span>
          </div>
        )}
        {status === SubmissionRunStatus.COMPLETED && verdict === ProblemVerdict.PA && (
          <div className="jk-row nowrap" style={{ lineHeight: 1, padding: '4px 0' }}>
            &nbsp;({(+points || 0).toFixed(2)}&nbsp;<T>pts.</T>)
          </div>
        )}
      </div>
    );
  };
  
  const content = (
    submissionData && verdict === ProblemVerdict.PENDING
      ? submissionLabel(submissionData)
      : (
        <div className="jk-row center jk-tag" style={{ backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark }}>
          {verdictLabel(verdict, true)}
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
          {verdictLabel(verdict)}
        </div>
      }
      placement="top"
      withPortal
    >
      {content}
    </Tooltip>
  );
};
