import { BodyWorksheetType, NewPageSheetType } from '@juki-team/commons';
import React, { useRef } from 'react';
import { Button, Input, T } from '../../atoms';
import { DeleteIcon } from '../../atoms/server';
import { ContentsSectionHeader } from './sheets/ContentsSectionHeader';
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
    page: _page,
    setPage,
    lastPageChildren,
    readOnly,
  } = props;
  
  const page = _page - 1;
  const containerRef = useRef<HTMLDivElement>(null);
  
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
  console.log({ page, pages });
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
                setPage(Math.max(_page - 1, 1));
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
      {_page < pages ? (
        <Button
          className="next-button"
          type="light"
          onClick={() => {
            setPage(_page + 1);
            document.getElementById('jk-worksheet-body')?.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          expand
        >
          <T className="tt-se">next page</T>
        </Button>
      ) : lastPageChildren}
    </div>
  );
};
