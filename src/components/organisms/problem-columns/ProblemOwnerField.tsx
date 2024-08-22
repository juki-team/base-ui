import { ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { UserChip } from '../UserChip';

export const ProblemOwnerField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field']
  = ({ record: { owner: { imageUrl, nickname, company: { key: companyKey } } } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">owner</T>}
  />
);

export const ProblemCrawlerField: DataViewerHeadersType<ProblemSummaryListResponseDTO>['Field']
  = ({ record: { owner: { company: { key: companyKey }, imageUrl, nickname } } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
);

export const getProblemOwnerHeader = (isForeignProblem: boolean): DataViewerHeadersType<ProblemSummaryListResponseDTO> => ({
  head: isForeignProblem ? 'crawler' : 'owner',
  index: 'owner',
  Field: isForeignProblem ? ProblemCrawlerField : ProblemOwnerField,
  sort: true,
  cardPosition: 'bottom',
  minWidth: 200,
});
