import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import type { TextFieldProps } from '../_layz_/DataViewer/types';
import { Field } from '../Field/Field';

export function FieldText({ text, label, onClick, className }: TextFieldProps) {
  return (
    <Field className="text-field-container jk-col nowrap" onClick={onClick}>
      <div className={classNames('text-field jk-row', className)}>
        {text}
      </div>
      <div className="jk-row text-field-label cr-g3 tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </Field>
  );
}
