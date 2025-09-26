import {
  type CodeEditorSheetType,
  type   GraphSheetType,
  type   JkmdSheetType,
  type   ListSheetType,
  type   QuizOptionsSheetType,
  type  QuizProblemSheetType,
  type  QuizTextSheetType,
} from '@juki-team/commons';
import { Children, type  Dispatch } from 'react';
import { EMPTY_LIST_SHEET } from '../../../../../constants';
import { Button, Collapse, T } from '../../../../atoms';
import { UpIcon } from '../../../../atoms/server';
import { MdMathEditor } from '../../../_layz_/MdMathEditor';
import { MdMathViewer } from '../../../MdMathViewer/MdMathViewer';
import { AddNewChild } from '../AddNewChild';
import { UpRemoveDownButtons } from '../UpRemoveDownButtons';

export interface ListSheetRecursiveSectionProps {
  sheet: ListSheetType,
  setSheet?: Dispatch<ListSheetType>,
  forceExpanded?: boolean,
  onlyText?: boolean,
}

export const ListSheetRecursiveSection = (props: ListSheetRecursiveSectionProps) => {
  
  const { sheet, setSheet, forceExpanded } = props;
  
  const { header, content, children } = sheet;
  
  const renderHeader = !!setSheet ? (
    <MdMathEditor
      value={header}
      onChange={(header) => setSheet({ ...sheet, header })}
      informationButton
    />
  ) : <div className="jk-pg-rl"><MdMathViewer source={header} /></div>;
  
  const renderAddSection = !!setSheet && (
    <Button
      onClick={() => (
        setSheet({
          ...sheet,
          children: [ ...sheet.children, EMPTY_LIST_SHEET() ],
        })
      )}
    >
      <T>add sub list</T>
    </Button>
  );
  
  const renderContent = content.map((itemContent) => {
    
    // const setSheetCb: SetContentType<JkmdSheetType | CodeEditorSheetType | GraphSheetType | QuizProblemSheetType | QuizTextSheetType | QuizOptionsSheetType> | undefined = setSheet ? (content) => {
    //   const newContent = [ ...sheet.content ];
    //   newContent.splice(index, 1, content);
    //   setSheet({ ...sheet, content: newContent });
    // } : undefined;
    //
    // const actionButtons = upRemoveDownButtons<JkmdSheetType | CodeEditorSheetType | GraphSheetType | QuizProblemSheetType | QuizTextSheetType | QuizOptionsSheetType>({
    //   index,
    //   length: content.length,
    //   onChange: (callback) => setSheet?.({ ...sheet, content: callback(content) }),
    // });
    //
    return (
      <div key={itemContent.id} className="jk-row nowrap gap">
        {/*{itemContent.type === SheetType.JK_MD && (*/}
        {/*  <JkmdSheetSection sheet={itemContent} setSheet={setSheetCb} actionButtons={actionButtons} />*/}
        {/*)}*/}
        {/*{itemContent.type === WorksheetType.CODE_EDITOR && !onlyText && (*/}
        {/*  // TODO: review*/}
        {/*  <CodeEditorSheetSection*/}
        {/*    content={itemContent}*/}
        {/*    setContent={setSheetCb as SetContentType<CodeEditorSheetType>}*/}
        {/*    // actionButtons={actionButtons}*/}
        {/*    // mutateUserResults={async () => {*/}
        {/*    // }}*/}
        {/*    readOnly*/}
        {/*    // result={{ nickname: '', submissions: [], isLoading: false, isValidating: false }}*/}
        {/*    worksheetKey=""*/}
        {/*  />*/}
        {/*)}*/}
        {/*{itemContent.type === WorksheetType.GRAPH && !onlyText && (*/}
        {/*  <GraphSheetSection sheet={itemContent} setSheet={setSheetCb} actionButtons={actionButtons} />*/}
        {/*)}*/}
      </div>
    );
  });
  
  const renderChildren = children.map((content, index) => (
    <div className="jk-row nowrap gap">
      <ListSheetRecursiveSection
        sheet={content}
        setSheet={setSheet ? (newSubSection) => {
          const newSheet = { ...sheet };
          newSheet.children = [ ...newSheet.children ];
          newSheet.children[index] = newSubSection;
          setSheet(newSheet);
        } : undefined}
      />
      {setSheet && (
        <UpRemoveDownButtons<ListSheetType>
          index={index}
          length={children.length}
          onChange={(callback) => setSheet({ ...sheet, children: callback(children) })}
        />
      )}
    </div>
  ));
  
  const renderBody = (
    <div className="jk-col gap extend stretch jk-pg-sm bc-we">
      {Children.toArray(renderContent)}
      {setSheet && (
        <AddNewChild<JkmdSheetType | CodeEditorSheetType | GraphSheetType | QuizProblemSheetType | QuizTextSheetType | QuizOptionsSheetType>
          index={sheet.content.length - 1}
          setSheet={(value) => {
            const newContents = typeof value === 'function' ? value(sheet.content) : value;
            setSheet?.({
              ...sheet,
              content: newContents,
            });
          }}
          mdSheet
          codeEditorSheet
          graphSheet
          quizProblemSheet
        />
      )}
      {Children.toArray(renderChildren)}
      {renderAddSection}
    </div>
  );
  
  return (
    <div className="jk-row extend">
      <Collapse
        className="jk-row extend"
        header={({ toggle, isOpen }) => (
          <div className="jk-row extend nowrap space-between jk-br bc-we">
            <div className="jk-row extend left">
              {renderHeader}
            </div>
            <div className="jk-row collapse-toggle-button">
              <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />
            </div>
          </div>
        )}
        startsShowing={forceExpanded}
      >
        {renderBody}
      </Collapse>
    </div>
  );
};
