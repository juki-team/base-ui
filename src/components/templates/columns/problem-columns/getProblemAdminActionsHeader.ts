import { type ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemAdminActionsField } from '../../problem/ProblemAdminActionsField';

export function getProblemAdminActionsHeader(): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: 'actions',
    index: 'actions',
    Field: ProblemAdminActionsField,
    cardPosition: 'bottom',
    minWidth: 100,
  };
}
