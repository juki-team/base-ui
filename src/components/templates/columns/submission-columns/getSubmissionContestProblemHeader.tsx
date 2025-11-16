import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/_layz_/DataViewer/types';
import { SubmissionContestProblemField } from '../../submission/SubmissionContestProblemField';

type SubmissionProblemColumnProps = {
  header?: Pick<DataViewerHeadersType<SubmissionSummaryListResponseDTO>, 'filter'>,
  // onlyProblem?: boolean,
  contest?: { key: string },
  // blankTarget?: boolean,
}

export function getSubmissionContestProblemHeader(colProps?: SubmissionProblemColumnProps): DataViewerHeadersType<SubmissionSummaryListResponseDTO> {
  return {
    head: 'problem',
    index: 'problemKeys',
    Field: (props) => (
      <SubmissionContestProblemField {...props} contest={colProps?.contest} />
    ),
    sort: true,
    filter: colProps?.header?.filter,
    cardPosition: 'top',
    minWidth: 280,
  };
}
