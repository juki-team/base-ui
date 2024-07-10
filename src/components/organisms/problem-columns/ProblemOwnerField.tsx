import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { UserChip } from '../UserChip';
import { ProblemDataViewerType } from './types';

export const ProblemOwnerField: DataViewerHeadersType<ProblemDataViewerType>['Field']
  = ({ record: { ownerCompanyKey, ownerImageUrl, ownerNickname } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={ownerNickname} imageUrl={ownerImageUrl} companyKey={ownerCompanyKey} />}
    label={<T className="tt-se">owner</T>}
  />
);

export const ProblemCrawlerField: DataViewerHeadersType<ProblemDataViewerType>['Field']
  = ({ record: { ownerCompanyKey, ownerImageUrl, ownerNickname } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={ownerNickname} imageUrl={ownerImageUrl} companyKey={ownerCompanyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
);

export const getProblemOwnerHeader = (isForeignProblem: boolean): DataViewerHeadersType<ProblemDataViewerType> => ({
  head: isForeignProblem ? 'crawler' : 'owner',
  index: 'owner',
  Field: isForeignProblem ? ProblemCrawlerField : ProblemOwnerField,
  sort: true,
  cardPosition: 'bottom',
  minWidth: 200,
});
