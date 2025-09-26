import { classNames } from '../../helpers';
import { T } from '../../atoms';
import type { TextHeadCellProps } from '../_layz_/DataViewer/types';

export function TextHeadCell({ text, className }: TextHeadCellProps) {
  return (
    <div className={classNames('text-head-field jk-row', className)}>
      {typeof text === 'string' ? <T className="tt-se">{text}</T> : text}
    </div>
  );
}
