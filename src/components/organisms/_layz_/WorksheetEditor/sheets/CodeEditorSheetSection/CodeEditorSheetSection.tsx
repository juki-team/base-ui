import { CodeEditorSheetType, isCodeEditorSheetType, isStringJson, WorksheetType } from '@juki-team/commons';
import { useRef, useState } from 'react';
import { FloatToolbar } from '../../../../../molecules';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { SheetSection } from '../types';
import { CodeEditorSheetSectionEditor } from './CodeEditorSheetSectionEditor';
import { CodeEditorSheetSectionView } from './CodeEditorSheetSectionView';

export const CodeEditorSheetSection = (props: SheetSection<CodeEditorSheetType>) => {
  
  const {
    content,
    setContent,
    index,
    chunkId,
    sheetLength,
    setSheet,
    worksheetKey,
    isSolvable,
    userResults,
    readOnly,
  } = props;
  
  const [ modal, setModal ] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={sectionRef}
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100"
    >
      {setContent && (
        <EditSheetModal
          isOpen={modal}
          onClose={() => setModal(false)}
          content={content}
          setContent={setContent}
          isValid={(value) => isStringJson(value) && isCodeEditorSheetType(JSON.parse(value))}
        />
      )}
      {setContent ? (
        <CodeEditorSheetSectionEditor
          content={content}
          setContent={setContent}
          isSolvable={isSolvable}
        />
      ) : (
        <div className="jk-col stretch gap nowrap code-editor-sheet-section-view wh-100">
          <ChunkTitle content={content} />
          <CodeEditorSheetSectionView
            content={content}
            worksheetKey={worksheetKey}
            chunkId={chunkId}
            userResults={userResults}
            readOnly={readOnly}
            isSolvable={isSolvable}
          />
        </div>
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.CODE_EDITOR,
            edit: true,
            setModal,
            index,
            sheetLength,
            setSheet,
          })}
          placement="right-end"
          outer
        />
      )}
    </div>
  );
};
