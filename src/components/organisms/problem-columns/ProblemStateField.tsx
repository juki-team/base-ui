import { ENTITY_STATE } from '@juki-team/commons';
import React, { memo } from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { ProblemDataViewer } from './types';

export const ProblemStateField: DataViewerHeadersType<ProblemDataViewer>['Field'] = memo(({ record: { state } }) => (
  <TextField
    text={<T className="tt-se">{state ? ENTITY_STATE[state].label : '-'}</T>}
    label={<T className="tt-se">visibility</T>}
  />
));
