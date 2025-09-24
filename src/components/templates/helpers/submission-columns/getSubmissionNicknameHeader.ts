import { type SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import type { OptionType } from '../../../molecules/types';
import type { DataViewerHeadersType } from '../../../organisms/DataViewer/types';
import { SubmissionNicknameField } from '../../submission/SubmissionNicknameField';

export const getSubmissionNicknameHeader = (options: OptionType<string>[] | void): DataViewerHeadersType<SubmissionSummaryListResponseDTO> => ({
  head: 'nickname',
  index: 'nicknames',
  Field: SubmissionNicknameField,
  sort: true,
  filter: options ? { type: 'select', options } : { type: 'text' },
  cardPosition: 'top',
  minWidth: 250,
});
