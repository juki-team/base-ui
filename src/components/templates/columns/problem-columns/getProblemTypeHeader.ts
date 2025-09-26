import { PROBLEM_TYPE, type ProblemSummaryListResponseDTO, ProblemType } from '@juki-team/commons';
import type { DataViewerHeadersType } from '../../../organisms/types';
import { ProblemTypeField } from '../../problem/ProblemTypeField';

export function getProblemTypeHeader(): DataViewerHeadersType<ProblemSummaryListResponseDTO> {
  return {
    head: 'type',
    index: 'type',
    Field: ProblemTypeField,
    sort: true,
    filter: {
      type: 'select',
      options: [ ProblemType.STANDARD, ProblemType.DYNAMIC ].map((problemType) => ({
        value: problemType,
        label: PROBLEM_TYPE[problemType].label,
      })),
    },
    cardPosition: 'upperLeft',
    minWidth: 100,
  };
}
