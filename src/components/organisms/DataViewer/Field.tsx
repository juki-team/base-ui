import { classNames } from '../../../helpers';
import type { FieldProps } from './types';

export const Field = ({ onClick, className = '', children }: FieldProps) => {
  return (
    <div className={classNames('field', className)} onClick={onClick}>
      {children}
    </div>
  );
};
