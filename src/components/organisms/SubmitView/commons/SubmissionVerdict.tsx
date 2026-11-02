import {
  PROBLEM_VERDICT,
  ProblemVerdict,
  ProfileSetting,
  SUBMISSION_RUN_STATUS,
  type SubmissionDataResponseDto,
  SubmissionRunStatus,
  Theme,
} from '@juki-team/commons';
import { memo } from 'react';
import type { LiveSubmissionData } from '../../../../stores/submissionsLive/useSubmissionsLiveStore';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { T } from '../../../atoms';
import { classNames } from '../../../helpers';
import { SpinIcon } from '../../../server';

export interface SubmissionVerdictProps {
  verdict: ProblemVerdict;
  points?: number;
  status?: SubmissionRunStatus;
  submitId: string;
  submissionData?: LiveSubmissionData;
  processedCases?: SubmissionDataResponseDto['processedCases'];
  shortLabel?: boolean;
  className?: string;
}

const IN_PROGRESS_STATUSES: SubmissionRunStatus[] = [
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
];

const SubmissionVerdictCmp = (props: SubmissionVerdictProps) => {
  const {
    verdict: initialVerdict,
    points: initialPoints,
    submissionData,
    processedCases,
    shortLabel: _shortLabel,
    className,
  } = props;

  const userPreferredTheme = useUserStore((state) => state.user.settings?.[ProfileSetting.THEME]);
  const t = useI18nStore((state) => state.i18n.t);
  const addDark = userPreferredTheme === Theme.DARK ? 'CC' : '';

  if (_shortLabel) {
    const verdictLabel = PROBLEM_VERDICT[initialVerdict]?.label ? t(PROBLEM_VERDICT[initialVerdict]?.label) : initialVerdict;
    const tooltipContent = [
      verdictLabel.charAt(0).toUpperCase() + verdictLabel.slice(1),
      initialVerdict === ProblemVerdict.PENDING &&
      processedCases &&
      !!(processedCases.samples.total + processedCases.tests.total)
        ? `(${processedCases.samples.processed + processedCases.tests.processed} / ${processedCases.samples.total + processedCases.tests.total})`
        : '',
      initialVerdict === ProblemVerdict.PA && initialPoints ? `(${(+initialPoints || 0).toFixed(2)} ${t('pts.')})` : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        className="jk-row center jk-tag"
        style={{ backgroundColor: PROBLEM_VERDICT[initialVerdict]?.color + addDark }}
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={tooltipContent}
        data-tooltip-t="false"
      >
        {initialVerdict === ProblemVerdict.PENDING && (
          <>
            <SpinIcon size="small" />
            &nbsp;
          </>
        )}
        <T className="tt-se ws-np">{initialVerdict}</T>
        {initialVerdict === ProblemVerdict.PENDING &&
          processedCases &&
          !!(processedCases.samples.total + processedCases.tests.total) && (
            <>
              &nbsp;{processedCases.samples.processed + processedCases.tests.processed}&nbsp;/&nbsp;
              {processedCases.samples.total + processedCases.tests.total}
            </>
          )}
        {initialVerdict === ProblemVerdict.PA && initialPoints && (
          <>
            &nbsp;
            <span className="ws-np">
              ({(+initialPoints || 0).toFixed(2)} <T>pts.</T>)
            </span>
          </>
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
      className={classNames('jk-row nowrap jk-tag tx-s', className)}
      style={{
        backgroundColor: PROBLEM_VERDICT[verdict]?.color + addDark,
        lineHeight: 1.2,
        padding: '6px 8px',
      }}
    >
      {(IN_PROGRESS_STATUSES.includes(status) || verdict === ProblemVerdict.PENDING) && (
        <>
          <SpinIcon size="small" />
          &nbsp;
        </>
      )}
      <div className="jk-col">
        {status === SubmissionRunStatus.EXECUTED_TEST_CASE ? (
          <>
            {testInfo?.sampleCase === true ? (
              <T className="tt-se">running sample cases</T>
            ) : testInfo?.sampleCase === false ? (
              <T className="tt-se">running test cases</T>
            ) : (
              <T className="tt-se">running cases</T>
            )}
            {testInfo && (
              <span className="ws-np">
                {testInfo.caseResultsExecuted} / {testInfo.caseResultsTotal}
              </span>
            )}
          </>
        ) : status === SubmissionRunStatus.COMPLETED ? (
          <T className="tt-se">{PROBLEM_VERDICT[verdict]?.label || verdict}</T>
        ) : (
          <T className="tt-se">{SUBMISSION_RUN_STATUS?.[status].label || status}</T>
        )}
        {status === SubmissionRunStatus.COMPLETED && verdict === ProblemVerdict.PA && (
          <div className="jk-row nowrap" style={{}}>
            ({(+points || 0).toFixed(2)}&nbsp;<T>pts.</T>)
          </div>
        )}
      </div>
    </div>
  );
};

export const SubmissionVerdict = memo(SubmissionVerdictCmp);
