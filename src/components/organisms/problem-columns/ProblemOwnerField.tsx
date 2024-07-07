import React, { memo } from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { UserChip } from '../UserChip';
import { ProblemDataViewer } from './types';

export const ProblemOwnerField: DataViewerHeadersType<ProblemDataViewer>['Field']
  = memo(({ record: { ownerCompanyKey, ownerImageUrl, ownerNickname } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={ownerNickname} imageUrl={ownerImageUrl} companyKey={ownerCompanyKey} />}
    label={<T className="tt-se">owner</T>}
  />
));

export const ProblemCrawlerField: DataViewerHeadersType<ProblemDataViewer>['Field']
  = memo(({ record: { ownerCompanyKey, ownerImageUrl, ownerNickname } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={ownerNickname} imageUrl={ownerImageUrl} companyKey={ownerCompanyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
));
