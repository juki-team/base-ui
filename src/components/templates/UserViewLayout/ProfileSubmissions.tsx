import {
  type ContentsResponseType,
  type JudgeSummaryListResponseDTO,
  type SubmissionSummaryListResponseDTO,
} from '@juki-team/commons';
import { useMemo } from 'react';
import { QueryParamKey } from '../../../enums';
import { toFilterUrl, toSortUrl } from '../../../helpers';
import { jukiApiManager } from '../../../settings';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useFetcher } from '../../hooks/useFetcher';
import { usePreload } from '../../hooks/usePreload';
import { PagedDataViewer } from '../../organisms';
import type { DataViewerHeadersType } from '../../organisms/DataViewer/types';
import {
  getSubmissionDateHeader,
  getSubmissionLanguageHeader,
  getSubmissionMemoryHeader,
  getSubmissionProblemHeader,
  getSubmissionTimeHeader,
  getSubmissionVerdictHeader,
  LanguagesByJudge,
} from '../helpers';
import type { ProfileSubmissionsProps } from './types';

export function ProfileSubmissions(_: ProfileSubmissionsProps) {
  
  const nickname = useRouterStore(state => state.routeParams.nickname);
  const { data: judgePublicList } = useFetcher<ContentsResponseType<JudgeSummaryListResponseDTO>>(jukiApiManager.API_V1.judge.getSummaryList().url);
  const preload = usePreload();
  const languages = useMemo(() => {
    const result: LanguagesByJudge = {};
    const judges = judgePublicList?.success ? judgePublicList.contents : [];
    for (const { name, languages, key } of judges) {
      const languagesResult: LanguagesByJudge[string]['languages'] = {};
      for (const { value, label } of languages.filter(lang => lang.enabled)) {
        languagesResult[value] = { label, value };
      }
      result[key] = { key, languages: languagesResult, name };
    }
    return result;
  }, [ judgePublicList ]);
  
  const columns: DataViewerHeadersType<SubmissionSummaryListResponseDTO>[] = useMemo(() => [
    getSubmissionProblemHeader(),
    getSubmissionDateHeader(),
    getSubmissionVerdictHeader(),
    getSubmissionLanguageHeader(languages),
    getSubmissionTimeHeader(),
    getSubmissionMemoryHeader(),
  ], [ languages ]);
  
  return (
    <PagedDataViewer<SubmissionSummaryListResponseDTO, SubmissionSummaryListResponseDTO>
      rows={{ height: 80 }}
      cards={{ expanded: true }}
      headers={columns}
      getUrl={({ pagination: { page, pageSize }, filter, sort }) => (
        jukiApiManager.API_V1.submission.getSummaryList({
          params: {
            page,
            pageSize,
            filterUrl: toFilterUrl({ ...filter, nicknames: nickname as string }),
            sortUrl: toSortUrl(sort),
          },
        }).url
      )}
      name={QueryParamKey.PROFILE_SUBMISSIONS_TABLE}
      toRow={submission => submission}
      refreshInterval={60000}
      onRecordRender={({ data, index }) => {
        if (data[index]) {
          void preload(jukiApiManager.API_V1.submission.getData({ params: { id: data[index].submitId } }).url);
          if (data[index].contest) {
            void preload(jukiApiManager.API_V1.contest.getData({ params: { key: data[index].contest.key } }).url);
          } else {
            void preload(jukiApiManager.API_V1.problem.getData({ params: { key: data[index].problem.key } }).url);
          }
        }
      }}
    />
  );
}
