import { ENTITY_STATE, EntityState } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { ProblemDataViewerType } from './types';

export const ProblemStateField: DataViewerHeadersType<ProblemDataViewerType>['Field'] = ({ record: { state } }) => (
  <TextField
    text={<T className="tt-se">{state ? ENTITY_STATE[state].label : '-'}</T>}
    label={<T className="tt-se">visibility</T>}
  />
);

export const getProblemStateHeader = (): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'state',
  index: 'state',
  Field: ProblemStateField,
  sort: true,
  filter: {
    type: 'select',
    options: ([
      EntityState.ARCHIVED,
      EntityState.RELEASED,
    ]).map(state => ({
      value: state,
      label: <T className="tt-se">{ENTITY_STATE[state].label}</T>,
    })),
  },
  cardPosition: 'bottom',
  minWidth: 180,
});
