import React from 'react';
import { CopyIcon, CopyToClipboard } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewerType } from './types';

export const ProblemKeyIdField: DataViewerHeadersType<ProblemDataViewerType>['Field'] = ({ record: { key, id } }) => (
  <Field className="jk-col center">
    <div className="jk-row gap">
      <div className="jk-row tx-s fw-bd">{key}</div>
      <CopyToClipboard text={key}>
        <div className="jk-row hoverable jk-br-ie" style={{ padding: 2 }}>
          <CopyIcon size="tiny" />
        </div>
      </CopyToClipboard>
    </div>
    {id && (
      <div className="jk-row gap">
        <div className="jk-row tx-t fw-lr">{id}</div>
        <CopyToClipboard text={id}>
          <div className="jk-row hoverable jk-br-ie" style={{ padding: 2 }}>
            <CopyIcon size="tiny" />
          </div>
        </CopyToClipboard>
      </div>
    )}
  </Field>
);

export const getProblemKeyIdHeader = (): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'id',
  index: 'key',
  Field: ProblemKeyIdField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  sticky: true,
  minWidth: 240,
});
