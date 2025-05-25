import { getWorksheetsInPages } from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useStableState } from '../../../hooks';
import { ContentsSectionHeader } from './ContentsSectionHeader';
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
  
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const setPage = initialSetPage ?? _setPage;
  
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  const pages = sheetsInPages.length;
  
  return (
    <div className="jk-col gap nowrap worksheet-editor-container center top">
      {(pages > 1) && (
        <div className="jk-row">
          <ContentsSectionHeader page={page} setPage={setPage} sheetsInPages={sheetsInPages} />
        </div>
      )}
      <WorksheetBodies
        sheetsInPages={sheetsInPages}
        setSheets={setContent}
        isSolvable={isSolvable}
        readOnly={readOnly}
        isEditor={isEditor}
        worksheetKey={worksheetKey}
        page={page}
        setPage={setPage}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
