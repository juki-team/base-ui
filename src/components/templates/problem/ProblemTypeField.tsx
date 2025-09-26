import { PROBLEM_TYPE } from '@juki-team/commons';
import { T } from '../../atoms';
import { FieldText } from '../../organisms';
import type { ProblemTypeFieldProps } from './types';

export function ProblemTypeField({ record: { settings: { type } } }: ProblemTypeFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<T className="tt-se">{PROBLEM_TYPE[type].label}</T>}
      label={<T className="tt-se">type</T>}
    />
  );
}
