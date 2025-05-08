import { Judge, SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { TableHeadFieldProps } from '../../organisms/DataViewer/types';

export interface SubmitViewProps {
  submitId: string,
  triggerFetch?: number
}

type TableHeadFieldSubmissionSummaryListResponseDTOProps = TableHeadFieldProps<SubmissionSummaryListResponseDTO>;

export type SubmissionContestFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

export type SubmissionContestProblemFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

export type SubmissionDateFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

type LanguagesByJudge = {
  [key: string]: { key: string | Judge, name: string, languages: { [key: string]: { label: string, value: string } } },
};

export type SubmissionLanguageFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps & {
  languagesByJudge: LanguagesByJudge
};

export type SubmissionModalProps = {}

export type SubmissionNicknameFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

export type SubmissionProblemFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

export type SubmissionTimeFieldProps = TableHeadFieldSubmissionSummaryListResponseDTOProps;

export type SubmissionRejudgeButtonProps = { submissionId: string };
