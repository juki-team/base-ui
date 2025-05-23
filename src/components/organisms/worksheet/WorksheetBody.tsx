import { BodyWorksheetType, JkmdSheetType, WorksheetType } from '@juki-team/commons';
import React, { Children, Dispatch, forwardRef, Fragment, PropsWithChildren, SetStateAction } from 'react';
import { classNames } from '../../../helpers';
import { useUserStore } from '../../../stores/user/useUserStore';
import { AddNewChild } from './sheets/AddNewChild';
import { CodeEditorSheetSection } from './sheets/CodeEditorSheetSection';
import { GraphSheetSection } from './sheets/GraphSheetSection';
import { JkmdSheetSection } from './sheets/JkmdSheetSection';
import { ListSheetSection } from './sheets/ListSheetSection';
import { QuizOptionsSheetSection } from './sheets/QuizOptionsSheetSection/QuizOptionsSheetSection';
import { QuizProblemSheetSection } from './sheets/QuizProblemSheetSection';
import { upRemoveDownButtons } from './sheets/upRemoveDownActions';
import { WorksheetBodyProps } from './types';

export const WorksheetBody = forwardRef<HTMLDivElement, PropsWithChildren<WorksheetBodyProps>>(function Cmp(props, ref) {
  
  const {
    sheets,
    setSheets,
    results,
    resultsIsLoading,
    resultsIsValidating,
    readOnly,
    isSolvable,
    isEditor,
    worksheetKey,
    mutateUserResults,
    children,
  } = props;
  
  const userNickname = useUserStore(state => state.user.nickname);
  const userIsLogged = useUserStore(state => state.user.isLogged);
  
  const showingResults = !!results;
  const isSolving = userIsLogged && isSolvable && (showingResults ? (userNickname === results?.user?.nickname) : true);
  
  return (
    <div className="jk-col center note-sheet-page nowrap" id="jk-worksheet-body" ref={ref}>
      {Children.toArray(sheets.map((sheet, index, array) => {
        const setSheet: Dispatch<SetStateAction<BodyWorksheetType>> | undefined = setSheets ? (sheet) => {
          const newSheets = [ ...sheets ];
          const newSheet = typeof sheet === 'function' ? sheet(newSheets[index]) : sheet;
          newSheets.splice(index, 1, newSheet);
          setSheets(newSheets);
        } : undefined;
        
        const actionButtons = upRemoveDownButtons<BodyWorksheetType>({
          index,
          length: sheets.length,
          onChange: (callback) => setSheets?.(callback(sheets)),
        });
        
        const isNextJkmd = sheets[index + 1]?.type === WorksheetType.JK_MD;
        
        const resultJkmd = results?.submissions[WorksheetType.JK_MD]?.[sheet.id]?.at(-1);
        const resultsCodeEditor = results?.submissions[WorksheetType.CODE_EDITOR]?.[sheet.id] ?? [];
        const resultQuizProblem = results?.submissions[WorksheetType.QUIZ_PROBLEM]?.[sheet.id]?.at(-1);
        const resultQuizOptions = results?.submissions[WorksheetType.QUIZ_OPTIONS]?.[sheet.id]?.at(-1);
        
        const userResult = results?.user;
        
        return (
          <Fragment key={sheet.id}>
            <div
              className={classNames('jk-row nowrap stretch top gap pn-re jk-br-ie wh-100', `${sheet.type}-chunk`, {
                editing: !!setSheets,
                'next-jkmd': isNextJkmd,
                'bc-we': [ WorksheetType.JK_MD, WorksheetType.QUIZ_PROBLEM ].includes(sheet.type) && !setSheets,
              })}
            >
              {sheet.type === WorksheetType.JK_MD && (
                <JkmdSheetSection
                  sheet={sheet}
                  setSheet={setSheet as Dispatch<SetStateAction<JkmdSheetType>>}
                  isSolvable={isSolvable}
                  actionButtons={actionButtons}
                  result={resultJkmd}
                  worksheetKey={worksheetKey}
                  mutateUserResults={mutateUserResults}
                />
              )}
              {sheet.type === WorksheetType.CODE_EDITOR && (
                <CodeEditorSheetSection
                  sheet={sheet}
                  setSheet={setSheet}
                  actionButtons={actionButtons}
                  result={{
                    nickname: userResult?.nickname ?? '',
                    submissions: resultsCodeEditor,
                    isLoading: !!resultsIsLoading,
                    isValidating: !!resultsIsValidating,
                  }}
                  worksheetKey={worksheetKey}
                  mutateUserResults={mutateUserResults}
                  readOnly={readOnly}
                />
              )}
              {sheet.type === WorksheetType.LIST && (
                <ListSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />
              )}
              {sheet.type === WorksheetType.GRAPH && (
                <GraphSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />
              )}
              {sheet.type === WorksheetType.QUIZ_PROBLEM && (
                <QuizProblemSheetSection
                  sheet={sheet}
                  setSheet={setSheet}
                  result={resultQuizProblem}
                  userResult={userResult}
                  showingResults={showingResults}
                  actionButtons={actionButtons}
                  isSolvable={isSolvable}
                  isSolving={isSolving}
                  isEditor={isEditor}
                  worksheetKey={worksheetKey}
                  mutateUserResults={mutateUserResults}
                />
              )}
              {sheet.type === WorksheetType.QUIZ_OPTIONS && (
                <QuizOptionsSheetSection
                  sheet={sheet}
                  setSheet={setSheet}
                  result={resultQuizOptions}
                  userResult={userResult}
                  showingResults={showingResults}
                  actionButtons={actionButtons}
                  isSolvable={isSolvable}
                  isSolving={isSolving}
                  isEditor={isEditor}
                  noteSheetKey={worksheetKey}
                />
              )}
            </div>
            {setSheets && (
              <div className="jk-row gap extend nowrap center jk-divider tiny editing">
                <AddNewChild
                  index={index}
                  sheets={sheets}
                  setSheets={setSheets}
                  mdSheet
                  codeEditorSheet
                  graphSheet
                  quizProblemSheet
                  quizOptionsSheetType
                  pageDivider
                  compacted
                  floatToolbarPlacement={index < array.length - 1 ? 'bottom' : 'top'}
                />
              </div>
            )}
          </Fragment>
        );
      }))}
      {!sheets.length && setSheets && (
        <div className="jk-row gap extend nowrap center jk-divider tiny">
          <AddNewChild
            index={0}
            sheets={sheets}
            setSheets={setSheets}
            mdSheet
            codeEditorSheet
            graphSheet
            quizProblemSheet
            quizOptionsSheetType
            pageDivider
          />
        </div>
      )}
      {children}
    </div>
  );
});
