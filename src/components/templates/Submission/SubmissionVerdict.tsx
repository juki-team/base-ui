import {
  PROBLEM_VERDICT,
  ProblemVerdict,
  ProfileSetting,
  SocketEventSubmissionStatusResponseDTO,
  SUBMISSION_RUN_STATUS,
  SubmissionDataResponseDTO,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import React from 'react';
import { useJukiUser } from '../../../hooks';
import { jukiGlobalStore } from '../../../settings';
import { SpinIcon, T } from '../../atoms';

export interface SubmissionVerdictProps {
  verdict: ProblemVerdict,
  points?: number,
  status?: SubmissionRunStatus,
  submitId: string,
  submissionData?: SocketEventSubmissionStatusResponseDTO,
  processedCases?: SubmissionDataResponseDTO['processedCases'],
  shortLabel?: boolean,
}

export const SubmissionVerdict = (props: SubmissionVerdictProps) => {
  
  const {
    verdict: initialVerdict,
    points: initialPoints,
    submissionData,
    processedCases,
    shortLabel: _shortLabel,
  } = props;
  const { user: { settings: { [ProfileSetting.THEME]: userTheme } } } = useJukiUser();
  const { t } = jukiGlobalStore.getI18n();
  const addDark = userTheme === Theme.DARK ? 'CC' : '';
  
  if (_shortLabel) {
    return (
      <div
        className="jk-row center jk-tag"
        style={{ backgroundColor: PROBLEM_VERDICT[initialVerdict]?.color + addDark }}
        data-tooltip-id="jk-tooltip"
        data-tooltip-html={`
          <span class="tt-se ws-np">${PROBLEM_VERDICT[initialVerdict]?.label ? t(PROBLEM_VERDICT[initialVerdict]?.label) : initialVerdict}</span>
          ${(initialVerdict === ProblemVerdict.PENDING && processedCases && !!(processedCases.samples.total + processedCases.tests.total))
          ? `&nbsp;(${processedCases.samples.processed + processedCases.tests.processed}&nbsp;/&nbsp;${processedCases.samples.total + processedCases.tests.total})`
          : ''}
          ${initialVerdict === ProblemVerdict.PA && initialPoints
          ? `&nbsp;<span class="ws-np">(${(+initialPoints || 0).toFixed(2)} <span>${t('pts.')}</span>)</span>`
          : ''}
        `}
      >
        {initialVerdict === ProblemVerdict.PENDING && <><SpinIcon size="small" />&nbsp;</>}
        <T className="tt-se ws-np">{initialVerdict}</T>
        {(initialVerdict === ProblemVerdict.PENDING && processedCases && !!(processedCases.samples.total + processedCases.tests.total)) && (
          <>&nbsp;{processedCases.samples.processed + processedCases.tests.processed}&nbsp;/&nbsp;{processedCases.samples.total + processedCases.tests.total}</>
        )}
        {initialVerdict === ProblemVerdict.PA && initialPoints && (
          <>&nbsp;<span className="ws-np">({(+initialPoints || 0).toFixed(2)} <T>pts.</T>)</span></>
        )}
      </div>
    );
  }
  
  const verdict = submissionData?.verdict ?? initialVerdict;
  const status = submissionData?.status ?? SubmissionRunStatus.COMPLETED;
  const testInfo = submissionData?.testInfo;
  const points = submissionData?.points ?? initialPoints ?? 0;
  
  return (
    <div
      className="jk-row nowrap jk-tag tx-s"
      style={{
        backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark,
        lineHeight: 1.2,
        padding: '6px 8px',
      }}
    >
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
          <SpinIcon size="small" />
          &nbsp;
        </>
      )}
      <div className="jk-col">
        {status === SubmissionRunStatus.EXECUTED_TEST_CASE ? (
          <>
            {testInfo?.sampleCase === true
              ? <T className="tt-se">running sample cases</T>
              : testInfo?.sampleCase === false
                ? <T className="tt-se">running test cases</T>
                : <T className="tt-se">running cases</T>}
            {testInfo && <span className="ws-np">{testInfo.caseResultsExecuted} / {testInfo.caseResultsTotal}</span>}
          </>
        ) : (
          status === SubmissionRunStatus.COMPLETED
            ? <T className="tt-se">{PROBLEM_VERDICT[verdict]?.label || verdict}</T>
            : <T className="tt-se">{SUBMISSION_RUN_STATUS?.[status].label || status}</T>
        )}
        {status === SubmissionRunStatus.COMPLETED && verdict === ProblemVerdict.PA && (
          <div className="jk-row nowrap" style={{}}>
            ({points.toFixed(2)}&nbsp;<T>pts.</T>)
          </div>
        )}
      </div>
    </div>
  );
};
