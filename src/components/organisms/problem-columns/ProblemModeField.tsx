import { PROBLEM_MODE, PROBLEM_MODES, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const ProblemModeField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = ({ record: { settings: { scoringMode } } }) => (
  <TextField
    className="jk-row"
    text={<T className="tt-se">{PROBLEM_MODE[scoringMode]?.label}</T>}
    label={<T className="tt-se">mode</T>}
  />
);

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
