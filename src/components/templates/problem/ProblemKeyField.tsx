import { CopyToClipboard } from '../../atoms';
import type { ProblemKeyFieldProps } from './types';

export function ProblemKeyField({ record: { key } }: ProblemKeyFieldProps) {
  return (
    <div className="jk-table-field jk-col center">
      <div className="jk-row">
        <div className="jk-row tx-s fw-bd">{key}</div>
        &nbsp;
        <CopyToClipboard text={key} iconSize="tiny" />
      </div>
    </div>
  );
}
