import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemNameLinkField } from '../../problem/ProblemNameLinkField';
import { ProblemNameModalField } from '../../problem/ProblemNameModalField';

export const getProblemNameHeader = (modal: boolean, props?: Partial<DataViewerHeadersType<ProblemSummaryListResponseDTO>>): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'problem name',
  headClassName: 'left',
  index: 'name',
  Field: modal ? ProblemNameModalField : ProblemNameLinkField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'center',
  minWidth: 300,
  ...props,
});
