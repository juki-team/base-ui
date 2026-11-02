import { Judge, type SubmissionSummaryListResponseDto } from '@juki-team/commons';
import type { TableHeadFieldProps } from '../../organisms/_layz_/DataViewer/types';

type TableHeadFieldSubmissionSummaryListResponseDtoProps = TableHeadFieldProps<SubmissionSummaryListResponseDto>;

export type SubmissionContestFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps;

export type SubmissionContestProblemFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps & {
  contest?: {
    key: string;
  }
};

export type SubmissionDateFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps;

type LanguagesByJudge = {
  [key: string]: { key: string | Judge, name: string, languages: { [key: string]: { label: string, value: string } } },
};

export type SubmissionLanguageFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps & {
  languagesByJudge: LanguagesByJudge
};

export type SubmissionModalProps = {}

export type SubmissionNicknameFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps;

export type SubmissionProblemFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps;

export type SubmissionTimeFieldProps = TableHeadFieldSubmissionSummaryListResponseDtoProps;

export interface SubmissionRetrieveButtonProps {
  submissionId: string;
}
