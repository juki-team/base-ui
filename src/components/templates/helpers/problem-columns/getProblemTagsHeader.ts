import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import { OptionType } from '../../../molecules/types';
import { DataViewerHeadersType, FilterSelectOnlineType } from '../../../organisms/types';
import { ProblemTagsField } from '../../problem/ProblemTagsField';

export const getProblemTagsHeader = (tags: OptionType<string>[]): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'tags',
  index: 'tags',
  Field: ProblemTagsField,
  filter: {
    type: 'select',
    options: tags,
  } as FilterSelectOnlineType,
  cardPosition: 'lower',
  minWidth: 250,
});
