import { SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../../types';
import { SubmissionContestProblemField } from '../../submission/SubmissionContestProblemField';

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  onlyProblem?: boolean,
  // blankTarget?: boolean,
}

export const getSubmissionContestProblemHeader = (props?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'problem',
  index: 'problemKeys',
  Field: SubmissionContestProblemField,
  sort: true,
  filter: props?.header?.filter,
  cardPosition: 'top',
  minWidth: 280,
});
