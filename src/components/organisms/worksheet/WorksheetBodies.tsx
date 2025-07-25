import { BodyWorksheetType, NewPageSheetType } from '@juki-team/commons';
import React, { useCallback, useRef } from 'react';
import { classNames } from '../../../helpers';
import { NotUndefined, QueryParamKey } from '../../../types';
import { Button, Input, T } from '../../atoms';
import { DeleteIcon } from '../../atoms/server';
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
    page,
    onPageChange,
    lastPageChildren,
    readOnly,
  } = props;
  
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <div className={classNames('jk-col gap nowrap top stretch extend worksheet-bodies wh-100', { 'is-solvable': isSolvable })}>
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
                onPageChange(
                  Math.max(page, 1),
                  1,
                  { name: QueryParamKey.PAGE_FOCUS, value: 'jk-worksheet-viewer-container' },
                );
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
          onClick={() => onPageChange(
            page + 1,
            1,
            { name: QueryParamKey.PAGE_FOCUS, value: 'jk-worksheet-viewer-container' },
          )}
          expand
        >
          <T className="tt-se">next page</T>
        </Button>
      ) : lastPageChildren}
    </div>
  );
};
