import {
  BodyWorksheetType,
  CodeEditorSheetType,
  GraphSheetType,
  JkmdSheetType,
  QuizOptionsSheetType,
  QuizProblemSheetType,
  WorksheetType,
} from '@juki-team/commons';
import React, { Children, forwardRef, Fragment, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
// import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/black.css';
// import 'reveal.js/dist/theme/white.css';
import { classNames } from '../../../helpers';
import { Portal } from '../../atoms';
import { AddNewChild } from './sheets/AddNewChild';
import { CodeEditorSheetSection } from './sheets/CodeEditorSheetSection';
import { GraphSheetSection } from './sheets/GraphSheetSection';
import { JkmdSheetSection } from './sheets/JkmdSheetSection';
import { QuizOptionsSheetSection } from './sheets/QuizOptionsSheetSection';
import { QuizProblemSheetSection } from './sheets/QuizProblemSheetSection';
import { SheetSection } from './sheets/types';
import { SetContentType, WorksheetBodyProps } from './types';

const SlideDeck = ({ children, onClose }: { children: ReactNode[], onClose?: () => void }) => {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance
  
  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;
    
    deckRef.current = new Reveal(deckDivRef.current!, {
      transition: 'slide',
      // @ts-ignore
      keyboard: {
        27: function () {
          onClose?.();
        },
      },
      // other config options
    });
    
    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
    });
    
    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);
  
  return (
    <div className="reveal" ref={deckDivRef}>
      <div className="slides">
        {Children.toArray(children.map(child => (
          <section style={{}} className="ow-ao">{child}</section>
        )))}
      </div>
    </div>
  );
};

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
    asSlides,
    onSlidesExit,
  } = props;
  
  const nodes = sheet.map((chunk, index, array) => {
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
  });
  
  if (asSlides) {
    return (
      <Portal>
        <div className="jk-overlay bc-we">
          <SlideDeck children={nodes} onClose={onSlidesExit} />
        </div>
      </Portal>
    );
  }
  
  return (
    <div className="jk-col gap center nowrap wh-100" id="jk-worksheet-body" ref={ref}>
      {Children.toArray(nodes)}
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
