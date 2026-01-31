import {
  type ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  type WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import { useCallback, useMemo } from 'react';
import { jukiApiManager } from '../../../../settings';
import { usePageStore } from '../../../../stores/page/usePageStore';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { T } from '../../../atoms';
import { classNames } from '../../../helpers';
import { useFetcher } from '../../../hooks/useFetcher';
import { useKeyPress } from '../../../hooks/useKeyPress';
import { useStableRef } from '../../../hooks/useStableRef';
import { useStableState } from '../../../hooks/useStableState';
import type { UserResultsType } from '../../../types';
import { WorksheetContents } from '../WorksheetContents';
import { TableOfContents } from '../WorksheetEditor/sheets/TableOfContents';
import { WorksheetBodies } from '../WorksheetEditor/sheets/WorksheetBodies';
import { OnPageChange, WorksheetViewerProps } from './types';

export default function WorksheetViewer(props: WorksheetViewerProps) {
  
  const {
    worksheet: { content, quiz: { enable: quizEnable }, key: worksheetKey, user: { isManager } },
    resultsUserKey,
    page: initialPage,
    subPage: initialSubPage,
    onPageChangeRef: _onPageChangeRef,
    lastPageChildren,
    readOnly: initialReadOnly = false,
    withoutTableOfContents = false,
  } = props;
  
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const [ subPage, _setSubPage ] = useStableState(initialSubPage ?? 1);
  const onPageChangeRef = useStableRef(_onPageChangeRef);
  const onPageChange: OnPageChange = useCallback((page, subPage, entries) => {
    if (onPageChangeRef.current) {
      onPageChangeRef.current(page, subPage, entries);
    } else {
      _setPage(page);
      _setSubPage(subPage);
      setSearchParams(entries);
    }
  }, [ _setPage, _setSubPage, onPageChangeRef, setSearchParams ]);
  
  const {
    data: userResultsData,
    mutate: userResultsMutate,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
  } = useFetcher<ContentResponseType<WorksheetUserSubmissionsResponseDTO>>(worksheetKey && quizEnable && userIsLogged ? jukiApiManager.API_V2.worksheet.getSubmissionsUser({
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
  
  const readOnly = initialReadOnly || (userResults?.data ? userNickname !== userResults.data.user.nickname : false);
  const pages = sheetsInPages.length;
  
  useKeyPress(useCallback((event) => {
    if (event.code === 'ArrowRight') {
      onPageChange(Math.min(page + 1, pages), 1, []);
    } else if (event.code === 'ArrowLeft') {
      onPageChange(Math.max(page - 1, 1), 1, []);
    }
  }, [ onPageChange, page, pages ]));
  
  return (
    <div
      id="jk-worksheet-viewer-container"
      className={classNames('gap nowrap worksheet-viewer-container center top', {
        'jk-col': isSmallScreen,
        'jk-row': !isSmallScreen,
      })}
    >
      {!withoutTableOfContents && (
        isSmallScreen ? (
          (pages > 1) && (
            <div className="jk-row">
              <WorksheetContents
                page={page}
                subPage={subPage}
                onPageChange={onPageChange}
                sheetsInPages={sheetsInPages}
              />
            </div>
          )
        ) : (
          <div className="jk-col gap bc-we jk-pg-xsm jk-br-ie left worksheet-content sticky-top">
            <T className="tt-se fw-bd cr-tx-ht">table of content</T>
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
}
