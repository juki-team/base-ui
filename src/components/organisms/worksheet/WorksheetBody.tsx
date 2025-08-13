import {
  BodyWorksheetType,
  CodeEditorSheetType,
  GraphSheetType,
  JkmdSheetType,
  QuizOptionsSheetType,
  QuizProblemSheetType,
  WorksheetType,
} from '@juki-team/commons';
import React, { Children, forwardRef, Fragment, PropsWithChildren } from 'react';
import { classNames } from '../../../helpers';
import { AddNewChild } from './sheets/AddNewChild';
import { CodeEditorSheetSection } from './sheets/CodeEditorSheetSection';
import { GraphSheetSection } from './sheets/GraphSheetSection';
import { JkmdSheetSection } from './sheets/JkmdSheetSection';
import { QuizOptionsSheetSection } from './sheets/QuizOptionsSheetSection';
import { QuizProblemSheetSection } from './sheets/QuizProblemSheetSection';
import { SheetSection } from './sheets/types';
import { SetContentType, WorksheetBodyProps } from './types';

export const WorksheetBody = forwardRef<HTMLDivElement, PropsWithChildren<WorksheetBodyProps>>(function Cmp(props, ref) {
  
  const {
    sheet = [],
    setSheet,
    userResults,
    readOnly,
    isSolvable,
    // isEditor,
    worksheetKey,
    children,
  } = props;
  
  return (
    <div className="jk-col gap center nowrap wh-100" id="jk-worksheet-body" ref={ref}>
      {Children.toArray(sheet.map((chunk, index, array) => {
        const setContent: SetContentType<BodyWorksheetType> | undefined = setSheet ? (value) => {
          setSheet((sheet) => {
            const newSheet = [ ...sheet ];
            const newContent = typeof value === 'function' ? value(newSheet[index]) : value;
            newSheet.splice(index, 1, structuredClone(newContent));
            return newSheet;
          });
        } : undefined;
        
        const isNextJkmd = sheet[index + 1]?.type === WorksheetType.JK_MD;
        
        const props = {
          content: chunk,
          setContent,
          index,
          chunkId: chunk.id,
          sheetLength: sheet.length,
          setSheet,
          worksheetKey,
          isSolvable,
          userResults,
          readOnly,
        };
        
        return (
          <Fragment key={chunk.id}>
            <div
              id={chunk.id}
              className={classNames('jk-row nowrap stretch top gap pn-re jk-br-ie wh-100', `${chunk.type}-chunk`, {
                editing: !!setSheet,
                'next-jkmd': isNextJkmd,
                // 'bc-we': [ WorksheetType.JK_MD, WorksheetType.QUIZ_PROBLEM ].includes(chunk.type) && !setSheet,
              })}
              // style={{ left: !!setSheets ? -64 : undefined }}
            >
              {chunk.type === WorksheetType.JK_MD && (
                <JkmdSheetSection {...props as SheetSection<JkmdSheetType>} />
              )}
              {chunk.type === WorksheetType.CODE_EDITOR && (
                <CodeEditorSheetSection {...props as SheetSection<CodeEditorSheetType>} />
              )}
              {/*{chunk.type === WorksheetType.LIST && (*/}
              {/*  <ListSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />*/}
              {/*)}*/}
              {chunk.type === WorksheetType.GRAPH && (
                <GraphSheetSection {...props as SheetSection<GraphSheetType>} />
              )}
              {chunk.type === WorksheetType.QUIZ_PROBLEM && (
                <QuizProblemSheetSection {...props as SheetSection<QuizProblemSheetType>} />
              )}
              {chunk.type === WorksheetType.QUIZ_OPTIONS && (
                <QuizOptionsSheetSection {...props as SheetSection<QuizOptionsSheetType>} />
              )}
            </div>
            {setSheet && (
              <div className="jk-row gap extend nowrap center jk-divider tiny editing">
                <AddNewChild
                  index={index}
                  setSheet={setSheet}
                  mdSheet
                  codeEditorSheet
                  graphSheet
                  quizProblemSheet
                  quizOptionsSheetType
                  pageDivider
                  compacted
                  floatToolbarPlacement={index === array.length - 1 ? 'center top' : 'center'}
                />
              </div>
            )}
          </Fragment>
        );
      }))}
      {!sheet.length && setSheet && (
        <div className="jk-row gap extend nowrap center jk-divider tiny">
          <AddNewChild
            index={0}
            setSheet={setSheet}
            mdSheet
            codeEditorSheet
            graphSheet
            quizProblemSheet
            quizOptionsSheetType
            pageDivider
            compacted
            floatToolbarPlacement="center bottom"
          />
        </div>
      )}
      {children}
    </div>
  );
});
