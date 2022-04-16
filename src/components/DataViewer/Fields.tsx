import React, { ReactNode } from 'react';
import { DateFieldProps, FieldProps, TextFieldProps } from '../index';
import { classNames } from '../../helpers';
import { DateLiteral } from '../Input';

export const TextHeadCell = ({ text }: { text: string | ReactNode }) => {
  return <div className="text-head-field jk-row"><span>{text}</span></div>;
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
    <Field className="jk-col nowrap filled" onClick={onClick}>
      <div className={classNames('text-field jk-row', className)}>
        {text}
      </div>
      <div className="jk-row text-field-label color-gray-3 text-xs">
        {label}
      </div>
    </Field>
  );
};

export const DateField = ({ date, label, show, twoLines, className, onClick }: DateFieldProps) => {
  return (
    <Field className="jk-col nowrap filled" onClick={onClick}>
      <div className={classNames('date-field jk-row', className)}>
        <DateLiteral date={date} twoLines={twoLines} show={show} />
      </div>
      <div className="jk-row date-field-label color-gray-3 text-xs">
        {label}
      </div>
    </Field>
  );
};
