import { getWorksheetsInPages } from '@juki-team/commons';
import { useMemo } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useStableState } from '../../hooks/useStableState';
import { ContentsSectionHeader } from './ContentsSectionHeader';
import { WorksheetBodies } from './sheets/WorksheetBodies';
import { OnPageChange, WorksheetEditorProps } from './types';

export const WorksheetEditor = (props: WorksheetEditorProps) => {
  
  const {
    worksheet: { content, quiz: { enable: quizEnable }, key: worksheetKey, user: { isManager } },
    setContent,
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
  
  return (
    <div className="jk-col gap nowrap worksheet-editor-container center top">
      <div className="jk-row">
        <ContentsSectionHeader
          page={page}
          subPage={subPage}
          onPageChange={onPageChange}
          sheetsInPages={sheetsInPages}
        />
      </div>
      <WorksheetBodies
        sheetsInPages={sheetsInPages}
        setSheets={setContent}
        isSolvable={quizEnable}
        readOnly={readOnly}
        isEditor={isManager}
        worksheetKey={worksheetKey}
        page={page}
        subPage={subPage}
        onPageChange={onPageChange}
        lastPageChildren={lastPageChildren}
      />
    </div>
  );
};
