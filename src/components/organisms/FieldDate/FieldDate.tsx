import { T } from '../../atoms/T/T';
import { DateLiteral } from '../../atoms/server/DateLiteral/DateLiteral';
import { classNames } from '../../helpers/commons';
import type { DateFieldProps } from '../_layz_/DataViewer/types';
import { Field } from '../Field/Field';

export function FieldDate({ date, label, show, twoLines, withDayName, className, onClick }: DateFieldProps) {
  return (
    <Field className="jk-col nowrap" onClick={onClick}>
      <div className={classNames('date-field jk-row', className)}>
        <DateLiteral date={date} twoLines={twoLines} show={show} withDayName={withDayName} />
      </div>
      <div className="jk-row date-field-label cr-tx-sc tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </Field>
  );
}
