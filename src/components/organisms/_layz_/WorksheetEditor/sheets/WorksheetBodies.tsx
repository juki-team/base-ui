import {
  type BodyWorksheetType,
  isCodeEditorSheetType,
  isJkmdSheetType,
  isQuizOptionsSheetType,
  isQuizProblemSheetType,
  isStringJson,
  NEW_PAGE_SHEET,
  type NewPageSheetType,
} from '@juki-team/commons';
import { useCallback, useRef, useState } from 'react';
import { QueryParamKey } from '../../../../../enums';
import { Button, T } from '../../../../atoms';
import { DeleteIcon, SettingsIcon } from '../../../../atoms/server';
import { classNames } from '../../../../helpers';
import { NotUndefined } from '../../../../types';
import { MdMathEditor } from '../../MdMathEditor';
import type { WorksheetBodiesProps, WorksheetBodyProps } from '../types';
import { EditSheetModal } from './EditSheetModal';
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
  const [ modal, setModal ] = useState(false);
  const setPageSheets = useCallback((newPageHeader: NewPageSheetType | null, newPageSheetContent: BodyWorksheetType[]) => {
    const newSheetsInPages = [ ...sheetsInPages ];
    newSheetsInPages[page - 1] = {
      header: newPageHeader ?? newSheetsInPages[page - 1]?.header ?? NEW_PAGE_SHEET(),
      content: newPageSheetContent,
    };
    const newSheets = [];
    for (const { header, content } of newSheetsInPages) {
      newSheets.push(header, ...content);
    }
    setSheets?.(newSheets);
  }, [ page, setSheets, sheetsInPages ]);
  
  const setSheet: NotUndefined<WorksheetBodyProps['setSheet']> = useCallback((value) => {
    const newPageSheetContent = typeof value === 'function' ? value(sheetsInPages[page - 1]?.content ?? []) : value;
    setPageSheets(null, newPageSheetContent);
  }, [ page, setPageSheets, sheetsInPages ]);
  
  const pages = sheetsInPages.length;
  
  const sheetPage = sheetsInPages[page - 1];
  if (!sheetPage) {
    return null;
  }
  
  return (
    <div className={classNames('jk-col gap nowrap top stretch extend worksheet-bodies wh-100', { 'is-solvable': isSolvable })}>
      {setSheets && (
        <div className="jk-row gap extend nowrap" key={`${page}`}>
          <T className="tt-se">page title</T>
          <MdMathEditor
            value={sheetPage.header.title}
            onChange={(title) => {
              setPageSheets({ ...sheetPage.header, title }, sheetPage.content);
            }}
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
          <Button
            icon={<SettingsIcon size="small" />}
            onClick={() => setModal(true)}
          >
          
          </Button>
        </div>
      )}
      {setSheets && (
        <EditSheetModal<BodyWorksheetType[]>
          isOpen={modal}
          onClose={() => setModal(false)}
          content={sheetPage.content}
          setContent={setSheet}
          isValid={(value) => {
            if (isStringJson(value)) {
              const values = JSON.parse(value);
              if (Array.isArray(values)) {
                return values.every(value => isCodeEditorSheetType(value) || isJkmdSheetType(value) || isQuizOptionsSheetType(value) || isQuizProblemSheetType(value));
              }
            }
            return false;
          }}
        />
      )}
      <WorksheetBody
        sheetPage={sheetPage}
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
