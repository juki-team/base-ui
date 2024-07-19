import { ProblemSummaryListResponseDTO, SubmissionSummaryListResponseDTO } from '@juki-team/commons';
import React, { useMemo } from 'react';
import { DataViewerHeadersType, DataViewerProps } from '../../../';
import { jukiSettings } from '../../../../config';
import { toFilterUrl, toSortUrl } from '../../../../helpers';
import {
  getSubmissionContestHeader,
  getSubmissionContestProblemHeader,
  getSubmissionDateHeader,
  getSubmissionLanguageHeader,
  getSubmissionMemoryHeader,
  getSubmissionNicknameHeader,
  getSubmissionProblemHeader,
  getSubmissionRejudgeHeader,
  getSubmissionTimeHeader,
  getSubmissionVerdictHeader,
} from '../../submission-columns';
import { PagedDataViewer } from '../PagedDataViewer';

export const MockJkSubmissionTable = (props: Omit<DataViewerProps<ProblemSummaryListResponseDTO>, 'data'>) => {
  
  const columns: DataViewerHeadersType<SubmissionSummaryListResponseDTO>[] = useMemo(() => [
    getSubmissionNicknameHeader(),
    getSubmissionContestHeader(),
    getSubmissionContestProblemHeader(),
    getSubmissionProblemHeader(),
    getSubmissionDateHeader(),
    getSubmissionVerdictHeader(),
    getSubmissionRejudgeHeader(),
    getSubmissionLanguageHeader(),
    getSubmissionTimeHeader(),
    getSubmissionMemoryHeader(),
  ], []);
  
  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <PagedDataViewer<SubmissionSummaryListResponseDTO, SubmissionSummaryListResponseDTO>
        rows={{ height: 80 }}
        cards={{ expanded: true }}
        headers={columns}
        getUrl={({ pagination: { page, pageSize }, filter, sort }) => (
          jukiSettings.API.submission.getSystemList({
            params: {
              page,
              pageSize,
              filterUrl: toFilterUrl(filter),
              sortUrl: toSortUrl(sort),
            },
          }).url
        )}
        name={'sub-table-test'}
        toRow={submission => submission}
        refreshInterval={60000}
      />
    </div>
  );
};
