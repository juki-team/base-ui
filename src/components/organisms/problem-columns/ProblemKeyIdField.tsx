import React from 'react';
import { ContentCopyIcon, CopyToClipboard } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewerType } from './types';

export const ProblemKeyIdField: DataViewerHeadersType<ProblemDataViewerType>['Field'] = ({ record: { key, id } }) => (
  <Field className="jk-col center">
    <div className="jk-row">
      <div className="jk-row tx-s fw-bd">{key}</div>
      &nbsp;
      <CopyToClipboard text={key}>
        <div className="jk-button light only-icon tiny">
          <ContentCopyIcon />
        </div>
      </CopyToClipboard>
    </div>
    {id && (
      <div className="jk-row">
        <div className="jk-row tx-t fw-lr">{id}</div>
        &nbsp;
        <CopyToClipboard text={id}>
          <div className="jk-button light only-icon tiny">
            <ContentCopyIcon />
          </div>
        </CopyToClipboard>
      </div>
    )}
  </Field>
);

export const getProblemKeyIdHeader = (isManager: boolean): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: 'id',
  index: 'key',
  Field: ProblemKeyIdField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  sticky: true,
  minWidth: isManager ? 240 : 100,
});
