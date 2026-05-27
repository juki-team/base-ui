import { PROBLEM_TYPE } from '@juki-team/commons/constants';
import { T } from '../../atoms/T/T';
import { FieldText } from '../../organisms/FieldText/FieldText';
import type { ProblemTypeFieldProps } from './types';

export function ProblemTypeField({
  record: {
    settings: { type },
  },
}: ProblemTypeFieldProps) {
  return (
    <FieldText
      className="jk-row"
      text={<T className="tt-se">{PROBLEM_TYPE[type].label}</T>}
      label={<T className="tt-se">type</T>}
    />
  );
}
