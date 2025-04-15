import { PROBLEM_MODE } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { TextField } from '../../organisms';
import { ProblemModeFieldProps } from './types';

export const ProblemModeField = ({ record: { settings: { scoringMode } } }: ProblemModeFieldProps) => (
  <TextField
    className="jk-row"
    text={<T className="tt-se">{PROBLEM_MODE[scoringMode]?.label}</T>}
    label={<T className="tt-se">mode</T>}
  />
);
