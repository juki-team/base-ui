import { GraphSheetType, WorksheetType } from '@juki-team/commons';
import React, { useState } from 'react';
import { useStableState } from '../../../../../hooks/useStableState';
import { FloatToolbar } from '../../../../molecules';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { SheetSection } from '../types';
import { GraphSheetSectionEditor } from './GraphSheetSectionEditor';
import { GraphSheetSectionView } from './GraphSheetSectionView';

interface GraphSheetSectionProps extends SheetSection<GraphSheetType> {
}

export const GraphSheetSection = (props: GraphSheetSectionProps) => {
  
  const {
    content: initialContent,
    setContent: saveContent,
    index,
    sheetLength,
    setSheet,
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
        <GraphSheetSectionEditor content={content} setContent={setContent} />
      ) : (
        <div className="jk-col stretch gap nowrap graph-sheet-section-view wh-100">
          <ChunkTitle content={content} />
          <GraphSheetSectionView content={content} />
        </div>
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.GRAPH,
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
