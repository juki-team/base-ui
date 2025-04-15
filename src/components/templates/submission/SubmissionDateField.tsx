import React from 'react';
import { DateField } from '../../organisms/DataViewer/DateField';
import { SubmissionDateFieldProps } from './types';

export const SubmissionDateField = ({ record: { timestamp }, isCard }: SubmissionDateFieldProps) => (
  <DateField className="jk-row" date={new Date(timestamp)} label="date" twoLines={!isCard} />
);
