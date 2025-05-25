import { CodeEditorSheetType, WorksheetType } from '@juki-team/commons';
import React, { useState } from 'react';
import { useStableState } from '../../../../../hooks';
import { FloatToolbar } from '../../../../molecules';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { SheetSection } from '../types';
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
    userResults,
    readOnly,
  } = props;
  
  const [ edit, setEdit ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ content, _setContent ] = useStableState(initialContent);
  const setContent = saveContent ? _setContent : undefined;
  const reset = () => {
    _setContent(initialContent);
  };
  
  return (
    <div
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100"
      onDoubleClick={() => setEdit(true)}
    >
      {setContent && (
        <EditSheetModal isOpen={modal} onClose={() => setModal(false)} content={content} setContent={setContent} />
      )}
      {setContent && edit ? (
        <CodeEditorSheetSectionEditor
          content={content}
          setContent={setContent}
        />
      ) : (
        <div className="jk-col stretch gap nowrap code-editor-sheet-section-view wh-100">
          {!!content.title && (
            <div className="jk-row left"><p className="tt-se cr-th tx-l fw-bd">{content.title}</p></div>
          )}
          <CodeEditorSheetSectionView
            content={content}
            worksheetKey={worksheetKey}
            chunkId={chunkId}
            userResults={userResults}
            readOnly={readOnly}
          />
        </div>
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.CODE_EDITOR,
            edit,
            setEdit,
            setModal,
            content,
            saveContent,
            index,
            sheetLength,
            setSheet,
            reset,
          })}
          placement="out rightTop"
        />
      )}
    </div>
  );
};
