import React from 'react';
import { classNames } from '../../../helpers';
import { DateLiteral, T } from '../../atoms';
import { Field } from './Field';
import type { DateFieldProps } from './types';

export const DateField = ({ date, label, show, twoLines, withDayName, className, onClick }: DateFieldProps) => {
  return (
    <Field className="jk-col nowrap" onClick={onClick}>
      <div className={classNames('date-field jk-row', className)}>
        <DateLiteral date={date} twoLines={twoLines} show={show} withDayName={withDayName} />
      </div>
      <div className="jk-row date-field-label cr-g3 tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </Field>
  );
};
