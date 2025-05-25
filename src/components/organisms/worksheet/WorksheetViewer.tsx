import {
  ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useFetcher, useJukiUI, useRouterStore, useStableState, useUserStore } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { QueryParamKey } from '../../../types';
import { T } from '../../atoms';
import { TableOfContents } from './sheets/TableOfContents';
import { UserResultsType, WorksheetViewerProps } from './types';
import { WorksheetBodies } from './WorksheetBodies';

export const WorksheetViewer = (props: WorksheetViewerProps) => {
  
  const {
    content,
    worksheetKey,
    isSolvable = false,
    isEditor = false,
    resultsUserKey,
    page: initialPage,
    subPage: initialSubPage,
    setPage: initialSetPage,
    setSubPage: initialSetSubPage,
    lastPageChildren,
    readOnly: initialReadOnly = false,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const [ subPage, _setSubPage ] = useStableState(initialSubPage ?? 1);
  const setPage = initialSetPage ?? _setPage;
  const setSubPage = initialSetSubPage ?? _setSubPage;
  
  const {
    data: userResultsData,
    mutate: userResultsMutate,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
  } = useFetcher<ContentResponseType<WorksheetUserSubmissionsResponseDTO>>(jukiApiSocketManager.API_V1.worksheet.getSubmissionsUser({
    params: {
      key: worksheetKey,
      userKey: resultsUserKey || getUserKey(userNickname, companyKey),
    },
  }).url);
  const userResults: UserResultsType = useMemo(() => ({
    data: userResultsData?.success ? userResultsData.content : undefined,
    isLoading: userResultsIsLoading,
    isValidating: userResultsIsValidating,
    mutate: userResultsMutate,
  }), [ userResultsData, userResultsIsLoading, userResultsIsValidating, userResultsMutate ]);
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  const withoutContentsNav = viewPortSize !== 'sm';
  
  const readOnly = initialReadOnly || userNickname !== userResults?.data?.user.nickname;
  
  return (
    <div
      id="jk-worksheet-viewer-container"
      className="jk-row gap nowrap worksheet-viewer-container center top"
    >
      {withoutContentsNav && (
        <div className="jk-col gap bc-we jk-pg-xsm jk-br-ie left worksheet-content sticky-top">
          <T className="tt-se fw-bd cr-py">table of content</T>
          <TableOfContents
            sheetsInPages={sheetsInPages}
            page={page}
            onClick={(index, subIndex) => {
              if (setPage) {
                setPage(index);
                setSearchParams({ name: QueryParamKey.PAGE_FOCUS, value: 'jk-worksheet-viewer-container' });
                if (setSubPage && subIndex) {
                  setSubPage(subIndex.index);
                  setSearchParams({ name: QueryParamKey.PAGE_FOCUS, value: subIndex.id });
                }
              }
            }}
          />
        </div>
      )}
      <WorksheetBodies
        sheetsInPages={sheetsInPages}
        isSolvable={isSolvable && userIsLogged}
        userResults={userResults}
        readOnly={readOnly}
        isEditor={isEditor}
        worksheetKey={worksheetKey}
        withoutContentsHeader={withoutContentsNav}
        page={page}
        setPage={setPage}
        subPage={subPage}
        setSubPage={setSubPage}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
