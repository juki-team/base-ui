import { classNames } from '../../helpers';
import type { FieldProps } from '../_layz_/DataViewer/types';

export function Field({ onClick, className = '', children, style }: FieldProps) {
  return (
    <div className={classNames('field', className)} style={style} onClick={onClick}>
      {children}
    </div>
  );
};
