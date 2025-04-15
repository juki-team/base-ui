import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionProblemField } from '../../submission/SubmissionProblemField';

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  onlyProblem?: boolean,
}

export const getSubmissionProblemHeader = (props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'problem',
  index: 'problemKeys',
  Field: SubmissionProblemField,
  sort: true,
  filter: props?.header?.filter,
  cardPosition: 'top',
  minWidth: 280,
});
