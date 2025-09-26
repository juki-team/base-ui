import { CodeEditorSheetType, isCodeEditorSheetType, isStringJson, WorksheetType } from '@juki-team/commons';
import { useRef, useState } from 'react';

import { useStableState } from '../../../../../hooks/useStableState';
import { FloatToolbar } from '../../../../../molecules';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { SheetSection } from '../types';
import { useOnSaveSheetSection } from '../useOnSaveSheetSection';
import { CodeEditorSheetSectionEditor } from './CodeEditorSheetSectionEditor';
import { CodeEditorSheetSectionView } from './CodeEditorSheetSectionView';

interface RunnerSheetSectionProps extends SheetSection<CodeEditorSheetType> {
}

export const CodeEditorSheetSection = (props: RunnerSheetSectionProps) => {
  
  const {
    content: initialContent,
    setContent: saveContent,
    index,
    chunkId,
    sheetLength,
    setSheet,
    worksheetKey,
    isSolvable,
    userResults,
    readOnly,
  } = props;
  
  const [ edit, setEdit ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ content, _setContent ] = useStableState(initialContent);
  const sectionRef = useRef<HTMLDivElement>(null);
  const onSaveEdit = () => {
    setEdit(!edit);
    saveContent?.(content);
  };
  useOnSaveSheetSection(sectionRef, edit, onSaveEdit);
  
  const setContent = saveContent ? _setContent : undefined;
  
  return (
    <div
      ref={sectionRef}
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100"
      onDoubleClick={() => setEdit(true)}
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
      {setContent && edit ? (
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
            edit,
            setModal,
            index,
            sheetLength,
            setSheet,
            onSaveEdit,
            onCancel: () => {
              setEdit(false);
              _setContent(initialContent);
            },
          })}
          placement="out rightTop"
        />
      )}
    </div>
  );
};
