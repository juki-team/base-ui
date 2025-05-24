import { BodyWorksheetType, NewPageSheetType } from '@juki-team/commons';
import React, { useRef } from 'react';
import { useStableState } from '../../../hooks';
import { Button, Input, T } from '../../atoms';
import { DeleteIcon } from '../../atoms/server';
import { ContentsSectionHeader } from './ContentsSectionHeader';
import { WorksheetBodiesProps } from './types';
import { WorksheetBody } from './WorksheetBody';

export const WorksheetBodies = (props: WorksheetBodiesProps) => {
  
  const {
    sheetsInPages,
    isEditor,
    setSheets,
    results,
    resultsIsLoading,
    resultsIsValidating,
    isSolvable,
    worksheetKey,
    mutateUserResults,
    withoutContentsHeader,
    page: initialPage,
    setPage: initialSetPage,
    lastPageChildren,
    readOnly,
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [ page, _setPage ] = useStableState(typeof initialPage === 'number' ? initialPage - 1 : 1);
  const setPage = (index: number) => {
    (initialSetPage ?? _setPage)(index);
    console.log(typeof document);
    if (typeof document !== 'undefined') {
      console.log({ doc: document.getElementById('jk-two-content-section-second-panel') });
      document.getElementById('jk-two-content-section-second-panel')?.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('jk-worksheet-body')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const setPageSheets = setSheets ? (newPageHeader: NewPageSheetType, newPageSheetContent: BodyWorksheetType[]) => {
    const newSheetsInPages = [ ...sheetsInPages ];
    newSheetsInPages[page] = { header: newPageHeader, content: newPageSheetContent };
    const newSheets = [];
    for (const { header, content } of newSheetsInPages) {
      newSheets.push(header, ...content);
    }
    setSheets(newSheets);
  } : undefined;
  
  const pages = sheetsInPages.length;
  
  return (
    <div className="jk-col gap nowrap top stretch extend worksheet-bodies">
      {(pages > 1 || setSheets) && !withoutContentsHeader && (
        <div className="jk-row">
          <ContentsSectionHeader page={page} setPage={setPage} sheetsInPages={sheetsInPages} />
        </div>
      )}
      {setSheets && (
        <div className="jk-row gap extend nowrap" key={`${page}`}>
          <Input
            label={<T className="tt-se">page title</T>}
            value={sheetsInPages[page]?.header.title}
            onChange={(title) => {
              setPageSheets?.({ ...sheetsInPages[page].header, title }, sheetsInPages[page].content);
            }}
            extend
          />
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="remove page divider"
            icon={<DeleteIcon />}
            onClick={() => {
              const newSheetsInPages = [ ...sheetsInPages ];
              const newSheets = [];
              if (page === pages - 1) {
                let i = 0;
                for (const { header, content } of newSheetsInPages) {
                  if (i !== page) {
                    newSheets.push(header);
                  }
                  newSheets.push(...content);
                  i++;
                }
                setSheets(newSheets);
              } else {
                let i = 0;
                let contentDeleted = null;
                for (const { header, content } of newSheetsInPages) {
                  if (i === page) {
                    contentDeleted = content;
                  } else {
                    newSheets.push(header);
                    if (contentDeleted !== null) {
                      newSheets.push(...contentDeleted);
                      contentDeleted = null;
                    }
                    newSheets.push(...content);
                  }
                  i++;
                }
                setSheets(newSheets);
              }
              if (page > 0 && page === pages - 1) {
                setPage(Math.max(page, 0) + 1);
              }
            }}
            disabled={pages <= 1}
          />
        </div>
      )}
      <WorksheetBody
        sheets={sheetsInPages[page]?.content ?? []}
        setSheets={setPageSheets ? (sheets) => setPageSheets(sheetsInPages[page].header, sheets) : undefined}
        results={results}
        resultsIsLoading={resultsIsLoading}
        resultsIsValidating={resultsIsValidating}
        readOnly={!!readOnly}
        isSolvable={isSolvable}
        isEditor={isEditor}
        worksheetKey={worksheetKey}
        mutateUserResults={mutateUserResults}
        ref={containerRef}
      >
      </WorksheetBody>
      {page < pages - 1 ? (
        <Button
          className="next-button"
          type="light"
          onClick={() => setPage(page + 2)}
          expand
        >
          <T className="tt-se">next page</T>
        </Button>
      ) : lastPageChildren}
    </div>
  );
};
