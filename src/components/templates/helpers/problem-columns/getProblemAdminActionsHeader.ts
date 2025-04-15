import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemAdminActionsField } from '../../problem/ProblemAdminActionsField';

export const getProblemAdminActionsHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'actions',
  index: 'actions',
  Field: ProblemAdminActionsField,
  cardPosition: 'bottom',
  minWidth: 100,
});
