import { getWorksheetsInPages } from '@juki-team/commons';
import React, { useEffect, useMemo, useRef } from 'react';
import { useHash, useJukiUI, useStableState, useUserStore } from '../../../hooks';
import { T } from '../../atoms';
import { TableOfContents } from './sheets/TableOfContents';
import { WorksheetViewerProps } from './types';
import { WorksheetBodies } from './WorksheetBodies';

export const WorksheetViewer = ({
                                  worksheet,
                                  results,
                                  resultsIsLoading,
                                  resultsIsValidating,
                                  mutateUserResults,
                                  page: initialPage,
                                  setPage: initialSetPage,
                                  lastPageChildren,
                                  readOnly = false,
                                }: WorksheetViewerProps) => {
  
  const locationHash = useHash();
  const scrolled = useRef(false);
  const { viewPortSize } = useJukiUI();
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
  }, [ locationHash, worksheet ]);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const setPage = initialSetPage ?? _setPage;
  
  const isEditor = worksheet.user?.isManager;
  const sheetsInPages = useMemo(() => getWorksheetsInPages(worksheet.content), [ worksheet.content ]);
  
  const withoutContentsNav = viewPortSize !== 'sm';
  
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
                  console.log({ doc: document.getElementById('jk-two-content-section-second-panel') });
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
        isSolvable={worksheet.isSolvable && userIsLogged}
        results={results}
        resultsIsLoading={resultsIsLoading}
        resultsIsValidating={resultsIsValidating}
        readOnly={readOnly}
        isEditor={isEditor}
        worksheetKey={worksheet.key}
        mutateUserResults={mutateUserResults}
        withoutContentsHeader={withoutContentsNav}
        page={page}
        setPage={setPage}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
