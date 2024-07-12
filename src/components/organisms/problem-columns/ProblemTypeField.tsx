import { PROBLEM_TYPE, ProblemSummaryListResponseDTO, ProblemType } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';

export const ProblemTypeField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field']
  = ({ record: { settings: { type } }, isCard }) => (
  <TextField
    className="jk-row"
    text={<T className="tt-se">{PROBLEM_TYPE[type].label}</T>}
    label={<T className="tt-se">type</T>}
  />
);

export const getProblemTypeHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
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
});
