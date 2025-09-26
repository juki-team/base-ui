import { FieldDate } from '../../organisms/FieldDate/FieldDate';
import type { SubmissionDateFieldProps } from './types';

export const SubmissionDateField = ({ record: { timestamp }, isCard }: SubmissionDateFieldProps) => (
  <FieldDate className="jk-row" date={new Date(timestamp)} label="date" twoLines={!isCard} />
);
