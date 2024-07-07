import React, { memo } from 'react';
import { CopyToClipboard, T, Tooltip } from '../../atoms';
import { DataViewerHeadersType, Field } from '../DataViewer';
import { ProblemDataViewer } from './types';

export const ProblemKeyIdField: DataViewerHeadersType<ProblemDataViewer>['Field'] = memo(({ record: { key, id } }) => (
  <Field className="jk-col center">
    <CopyToClipboard text={key}>
      <div>
        <Tooltip content={<T>copy key</T>} placement="top" withPortal>
          <div className="jk-row hoverable jk-br-ie tx-s fw-bd">{key}</div>
        </Tooltip>
      </div>
    </CopyToClipboard>
    {id && (
      <CopyToClipboard text={id}>
        <div>
          <Tooltip content={<T>copy id</T>} placement="top" withPortal>
            <div className="jk-row hoverable jk-br-ie tx-t fw-lr">{id}</div>
          </Tooltip>
        </div>
      </CopyToClipboard>
    )}
  </Field>
));
