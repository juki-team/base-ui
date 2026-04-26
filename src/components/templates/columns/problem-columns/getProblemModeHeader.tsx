import { PROBLEM_MODE, PROBLEM_MODES } from '@juki-team/commons/constants';
import type { ProblemSummaryListResponseDTO } from '@juki-team/commons/dto';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemModeField } from '../../problem/ProblemModeField';

export function getProblemModeHeader(): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: 'mode',
    index: 'mode',
    Field: ProblemModeField,
    sort: true,
    filter: {
      type: 'select',
      options: PROBLEM_MODES.map((problemMode) => ({ value: problemMode, label: PROBLEM_MODE[problemMode].label })),
    },
    cardPosition: 'upperRight',
  };
}
