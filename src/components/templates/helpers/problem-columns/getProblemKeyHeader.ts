import { type ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemKeyField } from '../../problem/ProblemKeyField';

export const getProblemKeyHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'key',
  index: 'key',
  Field: ProblemKeyField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  sticky: true,
  minWidth: 120,
});
