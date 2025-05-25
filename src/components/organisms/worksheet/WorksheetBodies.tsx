import { BodyWorksheetType, NewPageSheetType } from '@juki-team/commons';
import React, { useCallback, useRef } from 'react';
import { classNames } from '../../../helpers';
import { useStableState } from '../../../hooks';
import { NotUndefined } from '../../../types';
import { Button, Input, T } from '../../atoms';
import { DeleteIcon } from '../../atoms/server';
import { ContentsSectionHeader } from './ContentsSectionHeader';
import { WorksheetBodiesProps, WorksheetBodyProps } from './types';
import { WorksheetBody } from './WorksheetBody';

export const WorksheetBodies = (props: WorksheetBodiesProps) => {
  
  const {
    sheetsInPages,
    isEditor,
    setSheets,
    userResults,
    isSolvable,
    worksheetKey,
    withoutContentsHeader,
    page: initialPage,
    setPage: initialSetPage,
    lastPageChildren,
    readOnly,
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [ page, _setPage ] = useStableState(typeof initialPage === 'number' ? initialPage : 1);
  const setPage = (index: number) => {
    (initialSetPage ?? _setPage)(index);
    if (typeof document !== 'undefined') {
      document.getElementById('jk-two-content-section-second-panel')?.scrollTo({ top: 0, behavior: 'smooth' });
      document.getElementById('jk-worksheet-body')?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const setPageSheets = useCallback((newPageHeader: NewPageSheetType | null, newPageSheetContent: BodyWorksheetType[]) => {
    const newSheetsInPages = [ ...sheetsInPages ];
    newSheetsInPages[page - 1] = {
      header: newPageHeader ?? newSheetsInPages[page - 1].header,
      content: newPageSheetContent,
    };
    const newSheets = [];
    for (const { header, content } of newSheetsInPages) {
      newSheets.push(header, ...content);
    }
    setSheets?.(newSheets);
  }, [ page, setSheets, sheetsInPages ]);
  
  const setSheet: NotUndefined<WorksheetBodyProps['setSheet']> = useCallback((value) => {
    const newPageSheetContent = typeof value === 'function' ? value(sheetsInPages[page - 1].content) : value;
    setPageSheets(null, newPageSheetContent);
  }, [ page, setPageSheets, sheetsInPages ]);
  
  const pages = sheetsInPages.length;
  
  return (
    <div className={classNames('jk-col gap nowrap top stretch extend worksheet-bodies', { 'is-solvable': isSolvable })}>
      {(pages > 1 || setSheets) && !withoutContentsHeader && (
        <div className="jk-row">
          <ContentsSectionHeader page={page} setPage={setPage} sheetsInPages={sheetsInPages} />
        </div>
      )}
      {setSheets && (
        <div className="jk-row gap extend nowrap" key={`${page}`}>
          <Input
            label={<T className="tt-se">page title</T>}
            value={sheetsInPages[page - 1]?.header.title}
            onChange={(title) => {
              setPageSheets({ ...sheetsInPages[page - 1].header, title }, sheetsInPages[page - 1].content);
            }}
            expand
          />
          <Button
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="remove page divider"
            icon={<DeleteIcon />}
            onClick={() => {
              const newSheetsInPages = [ ...sheetsInPages ];
              const newSheets = [];
              if (page === pages) {
                let i = 0;
                for (const { header, content } of newSheetsInPages) {
                  if (i !== page - 1) {
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
                  if (i === page - 1) {
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
              if (page > 1 && page === pages) {
                setPage(Math.max(page, 1));
              }
            }}
            disabled={pages <= 1}
          />
        </div>
      )}
      <WorksheetBody
        sheet={sheetsInPages[page - 1]?.content}
        setSheet={setSheets ? setSheet : undefined}
        userResults={userResults}
        readOnly={!!readOnly}
        isSolvable={isSolvable}
        isEditor={isEditor}
        worksheetKey={worksheetKey}
        ref={containerRef}
      >
      </WorksheetBody>
      {page < pages ? (
        <Button
          className="next-button"
          type="light"
          onClick={() => setPage(page + 1)}
          expand
        >
          <T className="tt-se">next page</T>
        </Button>
      ) : lastPageChildren}
    </div>
  );
};
