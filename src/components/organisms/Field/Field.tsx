import { classNames } from '../../helpers';
import type { FieldProps } from '../_layz_/DataViewer/types';

export function Field({ onClick, className = '', children }: FieldProps) {
  return (
    <div className={classNames('field', className)} onClick={onClick}>
      {children}
    </div>
  );
};
