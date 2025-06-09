import { getWorksheetsInPages } from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useStableState } from '../../../hooks/useStableState';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { ContentsSectionHeader } from './ContentsSectionHeader';
import { OnPageChange, WorksheetEditorProps } from './types';
import { WorksheetBodies } from './WorksheetBodies';

export const WorksheetEditor = (props: WorksheetEditorProps) => {
  
  const {
    content,
    setContent,
    worksheetKey,
    isSolvable = false,
    isEditor = false,
    page: initialPage,
    subPage: initialSubPage,
    onPageChange: initialOnPageChange,
    lastPageChildren,
    readOnly = false,
  } = props;
  
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const [ page, _setPage ] = useStableState(initialPage ?? 1);
  const [ subPage, _setSubPage ] = useStableState(initialSubPage ?? 1);
  const onPageChange: OnPageChange = initialOnPageChange ?? ((page, subPage, entries) => {
    _setPage(page);
    _setSubPage(subPage);
    setSearchParams(entries);
  });
  
  const sheetsInPages = useMemo(() => getWorksheetsInPages(content), [ content ]);
  
  const pages = sheetsInPages.length;
  
  return (
    <div className="jk-col gap nowrap worksheet-editor-container center top">
      {(pages > 1) && (
        <div className="jk-row">
          <ContentsSectionHeader
            page={page}
            subPage={subPage}
            onPageChange={onPageChange}
            sheetsInPages={sheetsInPages}
          />
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
        subPage={subPage}
        onPageChange={onPageChange}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
