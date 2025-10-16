import type {
  ContentsResponseType,
  JudgeSummaryListResponseDTO,
  JudgeSystemSummaryListResponseDTO,
  ProblemSummaryListResponseDTO,
  SubmissionSummaryListResponseDTO,
} from '@juki-team/commons';
import { useMemo } from 'react';
import { jukiApiManager } from '../../../../../settings';
import { toFilterUrl, toSortUrl } from '../../../../helpers';
import { useFetcher } from '../../../../hooks/useFetcher';
import {
  getSubmissionContestHeader,
  getSubmissionContestProblemHeader,
  getSubmissionDateHeader,
  getSubmissionLanguageHeader,
  getSubmissionMemoryHeader,
  getSubmissionNicknameHeader,
  getSubmissionRejudgeHeader,
  getSubmissionTimeHeader,
  getSubmissionVerdictHeader,
  type LanguagesByJudge,
} from '../../../../templates';
import { PagedDataViewer } from '../../../PagedDataViewer/PagedDataViewer';
import type { DataViewerHeadersType, DataViewerProps } from '../types';

export const MockJkSubmissionTable = (_: Omit<DataViewerProps<ProblemSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const { data: judgeSystemList } = useFetcher<ContentsResponseType<JudgeSystemSummaryListResponseDTO>>(jukiApiManager.API_V1.judge.getSystemList().url);
  const { data: judgePublicList } = useFetcher<ContentsResponseType<JudgeSummaryListResponseDTO>>(jukiApiManager.API_V1.judge.getSummaryList().url);
  const allJudges = useMemo(() => judgeSystemList?.success ? judgeSystemList.contents : (judgePublicList?.success ? judgePublicList.contents : []), [ judgeSystemList, judgePublicList ]);
  const languages = useMemo(() => {
    const result: LanguagesByJudge = {};
    for (const { name, languages, key } of allJudges) {
      const languagesResult: LanguagesByJudge[string]['languages'] = {};
      for (const { value, label } of languages) {
        languagesResult[value] = { label, value };
      }
      result[key] = { key, languages: languagesResult, name };
    }
    return result;
  }, [ allJudges ]);
  const columns: DataViewerHeadersType<SubmissionSummaryListResponseDTO>[] = useMemo(() => [
    getSubmissionNicknameHeader([ { value: 'OscarGauss', label: 'OscarGauss' }, { value: 'test', label: 'test' } ]),
    // getSubmissionNicknameHeader(),
    getSubmissionContestHeader(),
    getSubmissionContestProblemHeader(),
    // getSubmissionProblemHeader(),
    getSubmissionDateHeader(),
    getSubmissionVerdictHeader(),
    getSubmissionRejudgeHeader(),
    getSubmissionLanguageHeader(languages),
    getSubmissionTimeHeader(),
    getSubmissionMemoryHeader(),
  ], [ languages ]);
  
  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <PagedDataViewer<SubmissionSummaryListResponseDTO, SubmissionSummaryListResponseDTO>
        rows={{ height: 80 }}
        cards={{ expanded: true }}
        headers={columns}
        getUrl={({ pagination: { page, pageSize }, filter, sort }) => (
          jukiApiManager.API_V1.submission.getSystemList({
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
