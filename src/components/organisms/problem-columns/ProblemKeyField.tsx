import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { ContentCopyIcon, CopyToClipboard } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';

export const ProblemKeyField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field'] = ({ record: { key } }) => (
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
  
  </Field>
);

export const getProblemKeyHeader = (): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: 'key',
  index: 'key',
  Field: ProblemKeyField,
  sort: true,
  filter: { type: 'text' },
  cardPosition: 'top',
  sticky: true,
  minWidth: 120,
});
