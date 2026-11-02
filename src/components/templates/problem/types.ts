import { ProblemSummaryListResponseDto } from '@juki-team/commons';
import { IconProps } from '../../atoms/server/icons/types';
import { TableHeadFieldProps } from '../../organisms/_layz_/DataViewer/types';

type TableHeadFieldProblemSummaryListResponseDtoProps = TableHeadFieldProps<ProblemSummaryListResponseDto>;

export type ProblemAdminActionsFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemCrawlerFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemKeyFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemModeFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemNameLinkFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemNameModalFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export type ProblemOwnerFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;

export interface ProblemStatusProps {
  solved: boolean,
  tried: boolean,
  size?: IconProps['size'],
}

export type TagsFieldProps = TableHeadFieldProps<{ tags: string[] }>;

export type ProblemTypeFieldProps = TableHeadFieldProblemSummaryListResponseDtoProps;
