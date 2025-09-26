import { type ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemNameLinkField } from '../../problem/ProblemNameLinkField';
import { ProblemNameModalField } from '../../problem/ProblemNameModalField';

export function getProblemNameHeader(modal: boolean, props?: Partial<DataViewerHeadersType<ProblemSummaryListResponseDTO>>): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: 'problem name',
    headClassName: 'left',
    index: 'name',
    Field: modal ? ProblemNameModalField : ProblemNameLinkField,
    sort: true,
    filter: { type: 'text' },
    cardPosition: 'center',
    minWidth: 300,
    ...props,
  };
}
