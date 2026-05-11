import { Div } from '../../atoms';
import { classNames } from '../../helpers';
import type { FieldProps } from '../_layz_/DataViewer/types';

export function Field({ onClick, className = '', children, style }: FieldProps) {
  return (
    <Div className={classNames('jk-table-field', className)} style={style} onClick={onClick} onKeyDownClick={!!onClick}>
      {children}
    </Div>
  );
}
