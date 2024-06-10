import React, { ReactNode } from 'react';
import { classNames } from '../../../helpers';
import { DateLiteral, T } from '../../atoms';
import { DateFieldProps, FieldProps, TextFieldProps } from './types';

export const TextHeadCell = ({ text, className }: { text: string | ReactNode, className?: string }) => {
  return (
    <div className={classNames('text-head-field jk-row', className)}>
      {typeof text === 'string' ? <T className="tt-ue tx-s">{text}</T> : text}
    </div>
  );
};

export const Field = ({ onClick, className = '', children }: FieldProps) => {
  return (
    <div className={classNames('field', className)} onClick={onClick}>
      {children}
    </div>
  );
};

export const TextField = ({ text, label, onClick, className }: TextFieldProps) => {
  return (
    <Field className="jk-col nowrap" onClick={onClick}>
      <div className={classNames('text-field jk-row', className)}>
        {text}
      </div>
      <div className="jk-row text-field-label cr-g3 tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </Field>
  );
};

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
