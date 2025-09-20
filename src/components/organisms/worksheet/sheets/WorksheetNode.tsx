import {
  BodyWorksheetType,
  CodeEditorSheetType,
  GraphSheetType,
  JkmdSheetType,
  QuizOptionsSheetType,
  QuizProblemSheetType,
  WorksheetType,
} from '@juki-team/commons';
import React, { Fragment } from 'react';
// import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/black.css';
// import 'reveal.js/dist/theme/white.css';
import { classNames } from '../../../../helpers';
import { DetectRequestAnimationFrame } from '../../../atoms/DetectRequestAnimationFrame/DetectRequestAnimationFrame';
import { MdMathViewer } from '../../mdMath/MdMathViewer';
import { SetContentType, WorksheetNodeProps } from '../types';
import { AddNewChild } from './AddNewChild';
import { CodeEditorSheetSection } from './CodeEditorSheetSection';
import { GraphSheetSection } from './GraphSheetSection';
import { JkmdSheetSection } from './JkmdSheetSection';
import { QuizOptionsSheetSection } from './QuizOptionsSheetSection';
import { QuizProblemSheetSection } from './QuizProblemSheetSection';
import { SheetSection } from './types';

export const WorksheetNode = (props: WorksheetNodeProps) => {
  
  const {
    sheet,
    setSheet,
    userResults,
    readOnly,
    isSolvable,
    worksheetKey,
    asSlides,
    index,
    length,
  } = props;
  
  const chunk = sheet[index];
  
  if (!chunk) {
    return null;
  }
  
  const setContent: SetContentType<BodyWorksheetType> | undefined = setSheet ? (value) => {
    setSheet((sheet) => {
      const newSheet = [ ...sheet ];
      if (newSheet[index]) {
        const newContent = typeof value === 'function' ? value(newSheet[index]) : value;
        newSheet.splice(index, 1, structuredClone(newContent));
      }
      return newSheet;
    });
  } : undefined;
  
  const isNextJkmd = sheet[index + 1]?.type === WorksheetType.JK_MD;
  
  const sectionProps = {
    content: chunk,
    setContent: asSlides ? undefined : setContent,
    index,
    chunkId: chunk.id,
    sheetLength: sheet.length,
    setSheet: asSlides ? undefined : setSheet,
    worksheetKey,
    isSolvable,
    userResults,
    readOnly,
  };
  
  if (asSlides && chunk.type === WorksheetType.JK_MD) {
    return (
      <>
        <DetectRequestAnimationFrame name="WorksheetNode" />
        <MdMathViewer source={chunk.content.trim()} slideView />
      </>
    );
  }
  
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
          <JkmdSheetSection {...sectionProps as SheetSection<JkmdSheetType>} />
        )}
        {chunk.type === WorksheetType.CODE_EDITOR && (
          <CodeEditorSheetSection {...sectionProps as SheetSection<CodeEditorSheetType>} />
        )}
        {/*{chunk.type === WorksheetType.LIST && (*/}
        {/*  <ListSheetSection sheet={sheet} setSheet={setSheet} actionButtons={actionButtons} />*/}
        {/*)}*/}
        {chunk.type === WorksheetType.GRAPH && (
          <GraphSheetSection {...sectionProps as SheetSection<GraphSheetType>} />
        )}
        {chunk.type === WorksheetType.QUIZ_PROBLEM && (
          <QuizProblemSheetSection {...sectionProps as SheetSection<QuizProblemSheetType>} />
        )}
        {chunk.type === WorksheetType.QUIZ_OPTIONS && (
          <QuizOptionsSheetSection {...sectionProps as SheetSection<QuizOptionsSheetType>} />
        )}
      </div>
      {setSheet && !asSlides && (
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
            floatToolbarPlacement={index === length - 1 ? 'center top' : 'center'}
          />
        </div>
      )}
    </Fragment>
  );
};
