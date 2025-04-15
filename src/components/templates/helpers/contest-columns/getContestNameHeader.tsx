import { ContestSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ContestNameLinkField } from '../../contest/ContestNameLinkField';

export const getContestNameHeader = (): DataViewerHeadersType<ContestSummaryListResponseDTO> => ({
  head: 'contest name',
  headClassName: 'left',
  index: 'name',
  Field: ContestNameLinkField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  minWidth: 320,
});
