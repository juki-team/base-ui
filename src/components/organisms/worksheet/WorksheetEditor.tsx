import { getWorksheetsInPages } from '@juki-team/commons';
import React, { useEffect, useMemo, useRef } from 'react';
import { useHash, useJukiUI, useStableState, useUserStore } from '../../../hooks';
import { WorksheetEditorProps } from './types';
import { WorksheetBodies } from './WorksheetBodies';

export const WorksheetEditor = (props: WorksheetEditorProps) => {
  
  const {
    content,
    setContent,
    worksheetKey,
    isSolvable = false,
    isEditor = false,
    page: initialPage,
    setPage: initialSetPage,
    lastPageChildren,
    readOnly = false,
  } = props;
  
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
  }, [ locationHash, content ]);
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const setPage = initialSetPage ?? _setPage;
  
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  const withoutContentsNav = viewPortSize !== 'sm' && !setContent;
  
  return (
    <div className="jk-row gap nowrap worksheet-editor-container center top">
      <WorksheetBodies
        sheetsInPages={sheetsInPages}
        setSheets={setContent}
        isSolvable={isSolvable && userIsLogged}
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
