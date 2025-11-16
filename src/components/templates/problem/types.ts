import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { IconProps } from '../../atoms/server/icons/types';
import { TableHeadFieldProps } from '../../organisms/_layz_/DataViewer/types';

type TableHeadFieldProblemSummaryListResponseDTOProps = TableHeadFieldProps<ProblemSummaryListResponseDTO>;

export type ProblemAdminActionsFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemCrawlerFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemKeyFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemModeFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemNameLinkFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemNameModalFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export type ProblemOwnerFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;

export interface ProblemStatusProps {
  solved: boolean,
  tried: boolean,
  size?: IconProps['size'],
}

export type TagsFieldProps = TableHeadFieldProps<{ tags: string[] }>;

export type ProblemTypeFieldProps = TableHeadFieldProblemSummaryListResponseDTOProps;
