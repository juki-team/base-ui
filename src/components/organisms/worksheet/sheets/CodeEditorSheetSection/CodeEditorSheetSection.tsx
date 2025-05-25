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
    <div className="jk-row stretch flex-1 jk-br-ie relative">
      {setContent && (
        <EditSheetModal isOpen={modal} onClose={() => setModal(false)} content={content} setContent={setContent} />
      )}
      {setContent && edit ? (
        <CodeEditorSheetSectionEditor
          content={content}
          setContent={setContent}
        />
      ) : (
        <CodeEditorSheetSectionView
          content={content}
          worksheetKey={worksheetKey}
          chunkId={chunkId}
          userResults={userResults}
          readOnly={readOnly}
        />
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.JK_MD,
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
