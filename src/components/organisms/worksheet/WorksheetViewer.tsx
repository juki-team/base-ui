import {
  ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import { useMemo } from 'react';
import { classNames } from '../../../helpers';
import { jukiApiManager } from '../../../settings';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms';
import { useFetcher, useJukiUI, useStableState } from '../../hooks';
import { UserResultsType } from '../../types';
import { ContentsSectionHeader } from './ContentsSectionHeader';
import { TableOfContents } from './sheets/TableOfContents';
import { WorksheetBodies } from './sheets/WorksheetBodies';
import { OnPageChange, WorksheetViewerProps } from './types';

export const WorksheetViewer = (props: WorksheetViewerProps) => {
  
  const {
    worksheet: { content, quiz: { enable: quizEnable }, key: worksheetKey, user: { isManager } },
    resultsUserKey,
    page: initialPage,
    subPage: initialSubPage,
    onPageChange: initialOnPageChange,
    lastPageChildren,
    readOnly: initialReadOnly = false,
    withoutTableOfContents = false,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const [ subPage, _setSubPage ] = useStableState(initialSubPage ?? 1);
  const onPageChange: OnPageChange = initialOnPageChange ?? ((page, subPage, entries) => {
    _setPage(page);
    _setSubPage(subPage);
    setSearchParams(entries);
  });
  
  const {
    data: userResultsData,
    mutate: userResultsMutate,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
  } = useFetcher<ContentResponseType<WorksheetUserSubmissionsResponseDTO>>(worksheetKey && quizEnable && userIsLogged ? jukiApiManager.API_V1.worksheet.getSubmissionsUser({
    params: {
      key: worksheetKey,
      userKey: resultsUserKey || getUserKey(userNickname, companyKey),
    },
  }).url : null);
  const userResults: UserResultsType = useMemo(() => ({
    data: userResultsData?.success ? userResultsData.content : undefined,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
    mutate: userResultsMutate,
  }), [ userResultsData, userResultsIsLoading, userResultsIsValidating, userResultsMutate ]);
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  const isSmallPortSize = viewPortSize === 'sm';
  const readOnly = initialReadOnly || (userResults?.data ? userNickname !== userResults.data.user.nickname : false);
  const pages = sheetsInPages.length;
  
  return (
    <div
      id="jk-worksheet-viewer-container"
      className={classNames('gap nowrap worksheet-viewer-container center top', {
        'jk-col': isSmallPortSize,
        'jk-row': !isSmallPortSize,
      })}
    >
      {!withoutTableOfContents && (
        isSmallPortSize ? (
          (pages > 1) && (
            <div className="jk-row">
              <ContentsSectionHeader
                page={page}
                subPage={subPage}
                onPageChange={onPageChange}
                sheetsInPages={sheetsInPages}
              />
            </div>
          )
        ) : (
          <div className="jk-col gap bc-we jk-pg-xsm jk-br-ie left worksheet-content sticky-top">
            <T className="tt-se fw-bd cr-py">table of content</T>
            <TableOfContents
              sheetsInPages={sheetsInPages}
              page={page}
              subPage={subPage}
              onPageChange={onPageChange}
            />
          </div>
        )
      )}
      <WorksheetBodies
        sheetsInPages={sheetsInPages}
        isSolvable={quizEnable && userIsLogged}
        userResults={userResults}
        readOnly={readOnly}
        isEditor={isManager}
        worksheetKey={worksheetKey}
        page={page}
        onPageChange={onPageChange}
        subPage={subPage}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
