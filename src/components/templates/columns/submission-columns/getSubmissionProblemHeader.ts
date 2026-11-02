import { type  SubmissionSummaryListResponseDto } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionProblemField } from '../../submission/SubmissionProblemField';

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDto>, 'filter'>,
  onlyProblem?: boolean,
}

export function getSubmissionProblemHeader(props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDto> {
  return {
    head: 'problem',
    index: 'problemKeys',
    Field: SubmissionProblemField,
    sort: true,
    filter: props?.header?.filter,
    cardPosition: 'top',
    minWidth: 280,
  };
}
