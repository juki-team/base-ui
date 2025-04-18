import React from 'react';
import { CopyToClipboard } from '../../atoms';
import { Field } from '../../organisms';
import { ProblemKeyFieldProps } from './types';

export const ProblemKeyField = ({ record: { key } }: ProblemKeyFieldProps) => (
  <Field className="jk-col center">
    <div className="jk-row">
      <div className="jk-row tx-s fw-bd">{key}</div>
      &nbsp;
      <CopyToClipboard text={key} size="tiny" />
    </div>
  </Field>
);
