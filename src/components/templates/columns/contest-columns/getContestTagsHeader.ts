import { type ContestSummaryListResponseDTO } from '@juki-team/commons';
import type { OptionType } from '../../../molecules/types';
import type { DataViewerHeadersType, FilterSelectOnlineType } from '../../../organisms/types';
import { TagsField } from '../../problem/TagsField';

export function getContestTagsHeader(tags: OptionType<string>[]): DataViewerHeadersType<ContestSummaryListResponseDTO> {
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
