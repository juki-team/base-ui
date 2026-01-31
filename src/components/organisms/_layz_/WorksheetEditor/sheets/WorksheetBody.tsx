import { WorksheetType } from '@juki-team/commons';
import { Children, forwardRef, PropsWithChildren } from 'react';
import { classNames } from '../../../../helpers';
import { WorksheetBodyProps } from '../types';
import { AddNewChild } from './AddNewChild';
import { WorksheetNode } from './WorksheetNode';

export const WorksheetBody = forwardRef<HTMLDivElement, PropsWithChildren<WorksheetBodyProps>>(function Cmp(props, ref) {
  
  const {
    sheetPage,
    setSheet,
    userResults,
    readOnly,
    isSolvable,
    worksheetKey,
    children,
    asSlides,
  } = props;
  
  return (
    <div
      className={classNames('jk-col center nowrap wh-100 jk-br-ie', { 'ow-hn': !setSheet })}
      id="jk-worksheet-body"
      ref={ref}
    >
      {!!sheetPage.header.title && !setSheet && (
        <WorksheetNode
          worksheetKey={worksheetKey}
          sheet={[ {
            type: WorksheetType.JK_MD,
            content: sheetPage.header.title,
            id: '',
            title: '',
            points: 0,
          } ]}
          index={0}
          length={1}
          readOnly
          isSolvable={false}
        />
      )}
      {Children.toArray(sheetPage.content.map((chunk, index) => (
        <WorksheetNode
          key={chunk.id}
          sheet={sheetPage.content}
          setSheet={setSheet}
          userResults={userResults}
          readOnly={readOnly}
          isSolvable={isSolvable}
          worksheetKey={worksheetKey}
          asSlides={asSlides}
          index={index}
          length={sheetPage.content.length}
        />
      )))}
      {!sheetPage.content.length && setSheet && (
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
            floatToolbarPlacement="bottom"
          />
        </div>
      )}
      {children}
    </div>
  );
});
