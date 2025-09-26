import { FieldDate } from '../../organisms';
import type { SubmissionDateFieldProps } from './types';

export function SubmissionDateField({ record: { timestamp }, isCard }: SubmissionDateFieldProps) {
  return (
    <FieldDate className="jk-row" date={new Date(timestamp)} label="date" twoLines={!isCard} />
  );
}
