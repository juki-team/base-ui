import { PROBLEM_MODE } from '@juki-team/commons';
import React, { memo } from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewer } from './types';

export const ProblemModeField: DataViewerHeadersType<ProblemDataViewer>['Field'] = memo(({ record: { scoringMode } }) => (
  <Field className="jk-row">
    <T className="tt-se">{PROBLEM_MODE[scoringMode].label}</T>
  </Field>
));
