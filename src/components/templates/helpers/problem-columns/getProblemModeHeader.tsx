import { PROBLEM_MODE, PROBLEM_MODES, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemModeField } from '../../problem/ProblemModeField';

export const getProblemModeHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'mode',
  index: 'mode',
  Field: ProblemModeField,
  sort: true,
  filter: {
    type: 'select',
    options: PROBLEM_MODES.map((problemMode) => ({ value: problemMode, label: PROBLEM_MODE[problemMode].label })),
  },
  cardPosition: 'upperRight',
});
