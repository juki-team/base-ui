import { type ContestSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ContestNameLinkField } from '../../ContestNameLinkField/ContestNameLinkField';

export function getContestNameHeader(): DataViewerHeadersType<ContestSummaryListResponseDTO> {
  return {
    head: 'contest name',
    headClassName: 'left',
    index: 'name',
    Field: ContestNameLinkField,
    sort: true,
    filter: { type: 'text' },
    cardPosition: 'top',
    minWidth: 320,
  };
}
