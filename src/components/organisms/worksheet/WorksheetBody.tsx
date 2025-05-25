import {
  BodyWorksheetType,
  CodeEditorSheetType,
  JkmdSheetType,
  QuizOptionsSheetType,
  WorksheetType,
} from '@juki-team/commons';
import React, { Children, forwardRef, Fragment, PropsWithChildren } from 'react';
import { classNames } from '../../../helpers';
import { AddNewChild } from './sheets/AddNewChild';
import { CodeEditorSheetSection } from './sheets/CodeEditorSheetSection';
import { JkmdSheetSection } from './sheets/JkmdSheetSection';
import { QuizOptionsSheetSection } from './sheets/QuizOptionsSheetSection';
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
  
  // const userNickname = useUserStore(state => state.user.nickname);
  // const userIsLogged = useUserStore(state => state.user.isLogged);
  
  // const showingResults = !!userResults;
  // const isSolving = !readOnly && userIsLogged && isSolvable && (showingResults ? (userNickname === userResults?.data?.user?.nickname) : true);
  
  return (
    <div className="jk-col gap center nowrap wh-100" id="jk-worksheet-body" ref={ref}>
      {Children.toArray(sheet.map((chunk, index, array) => {
        const setContent: SetContentType<BodyWorksheetType> | undefined = setSheet ? (value) => {
          setSheet((sheet) => {
            const newSheet = [ ...sheet ];
            const newContent = typeof value === 'function' ? value(newSheet[index]) : value;
            newSheet.splice(index, 1, newContent);
            return newSheet;
          });
        } : undefined;
        
        const isNextJkmd = sheet[index + 1]?.type === WorksheetType.JK_MD;
        
        return (
          <Fragment key={chunk.id}>
            <div
              className={classNames('jk-row nowrap stretch top gap pn-re jk-br-ie wh-100', `${chunk.type}-chunk`, {
                editing: !!setSheet,
                'next-jkmd': isNextJkmd,
                // 'bc-we': [ WorksheetType.JK_MD, WorksheetType.QUIZ_PROBLEM ].includes(chunk.type) && !setSheet,
              })}
              // style={{ left: !!setSheets ? -64 : undefined }}
            >
              {chunk.type === WorksheetType.JK_MD && (
                <JkmdSheetSection
                  content={chunk}
                  setContent={setContent as SetContentType<JkmdSheetType>}
                  index={index}
                  chunkId={chunk.id}
                  sheetLength={sheet.length}
                  setSheet={setSheet}
                  worksheetKey={worksheetKey}
                  isSolvable={isSolvable}
                  userResults={userResults}
                  readOnly={readOnly}
                />
              )}
              {chunk.type === WorksheetType.CODE_EDITOR && (
                <CodeEditorSheetSection
                  content={chunk}
                  setContent={setContent as SetContentType<CodeEditorSheetType>}
                  index={index}
                  chunkId={chunk.id}
                  sheetLength={sheet.length}
                  setSheet={setSheet}
                  worksheetKey={worksheetKey}
                  isSolvable={isSolvable}
                  userResults={userResults}
                  readOnly={readOnly}
                />
              )}
              {/*{chunk.type === WorksheetType.LIST && (*/}
              {/*  <ListSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />*/}
              {/*)}*/}
              {/*{chunk.type === WorksheetType.GRAPH && (*/}
              {/*  <GraphSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />*/}
              {/*)}*/}
              {/*{chunk.type === WorksheetType.QUIZ_PROBLEM && (*/}
              {/*  <QuizProblemSheetSection*/}
              {/*    sheet={sheet}*/}
              {/*    setSheet={setSheet}*/}
              {/*    result={resultQuizProblem}*/}
              {/*    userResult={userResult}*/}
              {/*    showingResults={showingResults}*/}
              {/*    actionButtons={actionButtons}*/}
              {/*    isSolvable={isSolvable}*/}
              {/*    isSolving={isSolving}*/}
              {/*    isEditor={isEditor}*/}
              {/*    worksheetKey={worksheetKey}*/}
              {/*    mutateUserResults={mutateUserResults}*/}
              {/*  />*/}
              {/*)}*/}
              {chunk.type === WorksheetType.QUIZ_OPTIONS && (
                <QuizOptionsSheetSection
                  content={chunk}
                  setContent={setContent as SetContentType<QuizOptionsSheetType>}
                  index={index}
                  chunkId={chunk.id}
                  sheetLength={sheet.length}
                  setSheet={setSheet}
                  worksheetKey={worksheetKey}
                  isSolvable={isSolvable}
                  userResults={userResults}
                  readOnly={readOnly}
                />
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
                  floatToolbarPlacement={index === 0 ? 'bottom' : index < array.length - 1 ? 'center' : 'top'}
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
            floatToolbarPlacement="top"
          />
        </div>
      )}
      {children}
    </div>
  );
});
