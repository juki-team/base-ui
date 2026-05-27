import type {
  JudgeSummaryListResponseDTO,
  JudgeSystemSummaryListResponseDTO,
  ProblemSummaryListResponseDTO,
  SubmissionSummaryListResponseDTO,
} from '@juki-team/commons/dto';
import type { ContentsResponse } from '@juki-team/commons/types';
import { useMemo } from 'react';
import { jukiApiManager } from '../../../../../settings';
import { toFilterUrl, toSortUrl } from '../../../../helpers/router';
import { useFetcher } from '../../../../hooks/useFetcher';
import { getSubmissionContestHeader } from '../../../../templates/columns/submission-columns/getSubmissionContestHeader';
import { getSubmissionContestProblemHeader } from '../../../../templates/columns/submission-columns/getSubmissionContestProblemHeader';
import { getSubmissionDateHeader } from '../../../../templates/columns/submission-columns/getSubmissionDateHeader';
import { getSubmissionLanguageHeader, type LanguagesByJudge } from '../../../../templates/columns/submission-columns/getSubmissionLanguageHeader';
import { getSubmissionMemoryHeader } from '../../../../templates/columns/submission-columns/getSubmissionMemoryHeader';
import { getSubmissionNicknameHeader } from '../../../../templates/columns/submission-columns/getSubmissionNicknameHeader';
import { getSubmissionRejudgeHeader } from '../../../../templates/columns/submission-columns/getSubmissionRejudgeHeader';
import { getSubmissionTimeHeader } from '../../../../templates/columns/submission-columns/getSubmissionTimeHeader';
import { getSubmissionVerdictHeader } from '../../../../templates/columns/submission-columns/getSubmissionVerdictHeader';
import { PagedDataViewer } from '../../../PagedDataViewer/PagedDataViewer';
import type { DataViewerHeadersType, DataViewerProps } from '../types';

export const MockJkSubmissionTable = (_: Omit<DataViewerProps<ProblemSummaryListResponseDTO>, 'data' | 'headers'>) => {
  const { data: judgeSystemList } = useFetcher<ContentsResponse<JudgeSystemSummaryListResponseDTO>>(
    jukiApiManager.apiV2.judge.getSystemList().url,
  );
  const { data: judgePublicList } = useFetcher<ContentsResponse<JudgeSummaryListResponseDTO>>(
    jukiApiManager.apiV2.judge.getSummaryList().url,
  );
  const allJudges = useMemo(
    () => (judgeSystemList?.success ? judgeSystemList.contents : judgePublicList?.success ? judgePublicList.contents : []),
    [judgeSystemList, judgePublicList],
  );
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
  }, [allJudges]);
  const columns: DataViewerHeadersType<SubmissionSummaryListResponseDTO>[] = useMemo(
    () => [
      getSubmissionNicknameHeader([
        { value: 'OscarGauss', label: 'OscarGauss' },
        { value: 'test', label: 'test' },
        { value: 'mauri0-0', label: 'mauri0-0' },
      ]),
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
    ],
    [languages],
  );

  return (
    <div style={{ height: 'calc(var(--100VH) - 100px)', width: '90%', margin: '24px' }}>
      <PagedDataViewer<SubmissionSummaryListResponseDTO, SubmissionSummaryListResponseDTO>
        rows={{ height: 80 }}
        cards={{ expanded: true }}
        headers={columns}
        getUrl={({ pagination: { page, pageSize }, filter, sort }) =>
          jukiApiManager.apiV2.submission.getSystemList({
            params: {
              page,
              pageSize,
              filterUrl: toFilterUrl(filter),
              sortUrl: toSortUrl(sort),
            },
          }).url
        }
        name={'sub-table-test'}
        toRow={(submission) => submission}
        refreshInterval={60000}
      />
    </div>
  );
};
