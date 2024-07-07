import { PROBLEM_TYPE } from '@juki-team/commons';
import React, { memo } from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewer } from './types';

export const ProblemTypeField: DataViewerHeadersType<ProblemDataViewer>['Field']
  = memo(({ record: { type }, isCard }) => (
  <Field className="jk-row">
    <T className="tt-se">{PROBLEM_TYPE[type].label}</T>
  </Field>
));
