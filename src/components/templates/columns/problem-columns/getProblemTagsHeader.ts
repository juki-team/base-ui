import type { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { OptionType } from '../../../molecules/types';
import type { DataViewerHeadersType, FilterSelectOnlineType } from '../../../organisms/types';
import { TagsField } from '../../problem/TagsField';

export function getProblemTagsHeader(tags: OptionType<string>[]): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: 'tags',
    index: 'tags',
    Field: TagsField,
    filter: {
      type: 'select',
      options: tags,
    } as FilterSelectOnlineType,
    cardPosition: 'lower',
    minWidth: 250,
  };
}
