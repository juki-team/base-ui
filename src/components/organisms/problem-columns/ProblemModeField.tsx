import { PROBLEM_MODE, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ProblemModeField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = ({ record: { settings: { mode } } }) => (
  <Field className="jk-row">
    <T className="tt-se">{PROBLEM_MODE[mode].label}</T>
  </Field>
);
