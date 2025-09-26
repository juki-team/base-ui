import { Children, forwardRef, PropsWithChildren } from 'react';
import { WorksheetBodyProps } from '../types';
import { AddNewChild } from './AddNewChild';
import { WorksheetNode } from './WorksheetNode';

export const WorksheetBody = forwardRef<HTMLDivElement, PropsWithChildren<WorksheetBodyProps>>(function Cmp(props, ref) {
  
  const {
    sheet = [],
    setSheet,
    userResults,
    readOnly,
    isSolvable,
    worksheetKey,
    children,
    asSlides,
  } = props;
  
  return (
    <div className="jk-col gap center nowrap wh-100" id="jk-worksheet-body" ref={ref}>
      {Children.toArray(sheet.map((chunk, index) => (
        <WorksheetNode
          key={chunk.id}
          sheet={sheet}
          setSheet={setSheet}
          userResults={userResults}
          readOnly={readOnly}
          isSolvable={isSolvable}
          worksheetKey={worksheetKey}
          asSlides={asSlides}
          index={index}
          length={sheet.length}
        />
      )))}
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
