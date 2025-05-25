import { getWorksheetsInPages } from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useJukiUI, useStableState, useUserStore } from '../../../hooks';
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
  
  const { viewPortSize } = useJukiUI();
  const userIsLogged = useUserStore(state => state.user.isLogged);
  
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
