import { ProblemDataSystemResponseDTO, ProblemSummaryListResponseDTO } from '@juki-team/commons';
import React from 'react';
import { T } from '../../atoms';
import { DataViewerHeadersType, TextField } from '../DataViewer';
import { UserChip } from '../UserChip';

export const ProblemOwnerField: DataViewerHeadersType<(ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO) & {
  companyKey: string
}>['Field'] = ({ record: { owner: { nickname, imageUrl }, companyKey } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">owner</T>}
  />
);

export const ProblemCrawlerField: DataViewerHeadersType<(ProblemDataSystemResponseDTO | ProblemSummaryListResponseDTO) & {
  companyKey: string
}>['Field'] = ({ record: { owner: { nickname, imageUrl }, companyKey } }) => (
  <TextField
    className="jk-row"
    text={<UserChip nickname={nickname} imageUrl={imageUrl} companyKey={companyKey} />}
    label={<T className="tt-se">crawler</T>}
  />
);
