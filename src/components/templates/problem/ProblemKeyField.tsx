import { CopyToClipboard } from '../../atoms';
import { Field } from '../../organisms';
import type { ProblemKeyFieldProps } from './types';

export function ProblemKeyField({ record: { key } }: ProblemKeyFieldProps) {
  return (
    <Field className="jk-col center">
      <div className="jk-row">
        <div className="jk-row tx-s fw-bd">{key}</div>
        &nbsp;
        <CopyToClipboard text={key} size="tiny" />
      </div>
    </Field>
  );
}
