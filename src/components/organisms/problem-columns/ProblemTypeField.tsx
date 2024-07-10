import { PROBLEM_TYPE, ProblemType } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { ProblemDataViewerType } from './types';

export const ProblemTypeField: DataViewerHeadersType<ProblemDataViewerType>['Field']
  = ({ record: { type }, isCard }) => (
  <TextField
    className="jk-row"
    text={<T className="tt-se">{PROBLEM_TYPE[type].label}</T>}
    label={<T className="tt-se">type</T>}
  />
);

export const getProblemTypeHeader = (): DataViewerHeadersType<ProblemDataViewerType> => ({
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
