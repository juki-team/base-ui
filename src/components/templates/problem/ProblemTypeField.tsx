import { PROBLEM_TYPE } from '@juki-team/commons';
import { T } from '../../atoms';
import { TextField } from '../../organisms';
import { ProblemTypeFieldProps } from './types';

export const ProblemTypeField = ({ record: { settings: { type } } }: ProblemTypeFieldProps) => (
  <TextField
    className="jk-row"
    text={<T className="tt-se">{PROBLEM_TYPE[type].label}</T>}
    label={<T className="tt-se">type</T>}
  />
);
