import { CodeEditorSheetType, CodeEditorSubmissionResponseDTO } from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { KeyedMutator } from 'swr';
import { T } from '../../../../atoms';
import { EditIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { CodeEditorSheetSectionEditorModal } from './CodeEditorSheetSectionEditorModal';
import { CodeEditorSheetSectionView } from './CodeEditorSheetSectionView';

interface RunnerSheetSectionProps {
  sheet: CodeEditorSheetType,
  setSheet?: Dispatch<CodeEditorSheetType>,
  worksheetKey: string,
  result: {
    nickname: string,
    submissions: CodeEditorSubmissionResponseDTO[],
    isLoading: boolean,
    isValidating: boolean,
  },
  actionButtons?: ButtonActionProps['buttons'],
  mutateUserResults?: KeyedMutator<any>,
  readOnly: boolean,
}

export const CodeEditorSheetSection = ({
                                         sheet,
                                         setSheet,
                                         actionButtons = [],
                                         result,
                                         worksheetKey,
                                         mutateUserResults,
                                         readOnly,
                                       }: RunnerSheetSectionProps) => {
  
  const [ edit, setEdit ] = useState(false);
  
  const editActionButton = {
    icon: <EditIcon />,
    buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: () => setEdit(true) }, ...actionButtons ],
  };
  
  return (
    <div className="jk-row stretch flex-1 sheet-section jk-br-ie relative">
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      <CodeEditorSheetSectionView
        sheet={sheet}
        worksheetKey={worksheetKey}
        mutateUserResults={mutateUserResults}
        result={result}
        readOnly={readOnly}
      />
      {setSheet && (
        <CodeEditorSheetSectionEditorModal
          isOpen={edit}
          sheet={sheet}
          setSheet={setSheet}
          onClose={() => setEdit(false)}
        />
      )}
    </div>
  );
};
