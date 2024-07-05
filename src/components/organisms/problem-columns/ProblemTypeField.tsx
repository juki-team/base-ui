import { PROBLEM_TYPE, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ProblemTypeField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field']
  = ({ record: { settings: { type } }, isCard }) => (
  <Field className="jk-row">
    <T className="tt-se">{PROBLEM_TYPE[type].label}</T>
  </Field>
);
