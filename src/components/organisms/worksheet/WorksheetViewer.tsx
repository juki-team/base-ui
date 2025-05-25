import {
  ContentResponseType,
  getUserKey,
  getWorksheetsInPages,
  WorksheetUserSubmissionsResponseDTO,
} from '@juki-team/commons';
import React, { useEffect, useMemo, useRef } from 'react';
import { useFetcher, useHash, useJukiUI, useStableState, useUserStore } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
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
    setPage: initialSetPage,
    lastPageChildren,
    readOnly: initialReadOnly = false,
  } = props;
  
  const locationHash = useHash();
  const scrolled = useRef(false);
  const { viewPortSize } = useJukiUI();
  const userNickname = useUserStore(state => state.user.nickname);
  const companyKey = useUserStore(state => state.company.key);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  useEffect(() => {
    let render = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    const go = () => {
      render++;
      timeoutId = setTimeout(() => {
        const element = window?.document?.getElementById(encodeURI(locationHash));
        if (element) {
          element?.scrollIntoView({ behavior: 'smooth' });
          scrolled.current = true;
        } else {
          if (render < 50) {
            go();
          }
        }
      }, 400);
    };
    
    if (!scrolled.current) {
      go();
    }
    
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [ locationHash, content ]);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const setPage = initialSetPage ?? _setPage;
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
    <div className="jk-row gap nowrap worksheet-viewer-container center top">
      {withoutContentsNav && (
        <div className="jk-col gap bc-we jk-pg-xsm jk-br-ie left worksheet-content sticky-top">
          <T className="tt-se fw-bd cr-py">table of content</T>
          <TableOfContents
            sheetsInPages={sheetsInPages}
            page={page}
            onClick={(index) => {
              if (setPage) {
                setPage(index);
                if (typeof document !== 'undefined') {
                  document.getElementById('jk-two-content-section-second-panel')
                    ?.scrollTo({ top: 0, behavior: 'smooth' });
                  document.getElementById('jk-worksheet-body')
                    ?.scrollTo({ top: 0, behavior: 'smooth' });
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
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
