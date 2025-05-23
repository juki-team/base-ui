import { GraphSheetType } from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { T } from '../../../../atoms';
import { EditIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { GraphSheetSectionEditorModal } from './GraphSheetSectionEditorModal';
import { GraphSheetSectionView } from './GraphSheetSectionView';

interface GraphSheetSectionProps {
  sheet: GraphSheetType,
  setSheet?: Dispatch<GraphSheetType>,
  actionButtons?: ButtonActionProps['buttons'],
}

export const GraphSheetSection = ({ sheet, setSheet, actionButtons = [] }: GraphSheetSectionProps) => {
  
  const [ edit, setEdit ] = useState(false);
  
  const editActionButton = {
    icon: <EditIcon />,
    buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: () => setEdit(true) }, ...actionButtons ],
  };
  
  return (
    <div className="jk-row stretch flex-1 sheet-section jk-br-ie relative">
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      <GraphSheetSectionView sheet={sheet} />
      {setSheet && (
        <GraphSheetSectionEditorModal sheet={sheet} setSheet={setSheet} isOpen={edit} onClose={() => setEdit(false)} />
      )}
    </div>
  );
};
