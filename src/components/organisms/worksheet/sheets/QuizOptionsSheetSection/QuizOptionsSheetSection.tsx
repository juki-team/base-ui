import { QuizOptionsSheetType, QuizOptionsSubmissionResponseDTO, UserBasicInterface } from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { T } from '../../../../atoms';
import { EditIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { QuizOptionsSheetSectionEditorModal } from './QuizOptionsSheetSectionEditorModal';
import { QuizOptionsSheetSectionView } from './QuizOptionsSheetSectionView';

interface RunnerSheetSectionProps {
  sheet: QuizOptionsSheetType,
  setSheet?: Dispatch<QuizOptionsSheetType>,
  actionButtons?: ButtonActionProps['buttons'],
  result?: QuizOptionsSubmissionResponseDTO,
  userResult?: UserBasicInterface,
  isSolvable?: boolean,
  showingResults?: boolean,
  isSolving?: boolean,
  isEditor?: boolean,
  noteSheetKey: string,
}

export const QuizOptionsSheetSection = ({
                                          sheet,
                                          setSheet,
                                          result,
                                          userResult,
                                          actionButtons = [],
                                          isSolvable = false,
                                          showingResults = false,
                                          isSolving = false,
                                          isEditor = false,
                                          noteSheetKey,
                                        }: RunnerSheetSectionProps) => {
  
  const [ edit, setEdit ] = useState(false);
  
  const editActionButton = {
    icon: <EditIcon />,
    buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: () => setEdit(true) }, ...actionButtons ],
  };
  
  return (
    <div className="jk-row stretch flex-1 sheet-section jk-br-ie relative bc-we" style={{ width: '100%' }}>
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      <QuizOptionsSheetSectionView
        sheet={sheet}
        result={result}
        userResult={userResult}
        showingResults={showingResults}
        isSolvable={isSolvable}
        isSolving={isSolving}
        isEditor={isEditor}
        noteSheetKey={noteSheetKey}
      />
      {setSheet && (
        <QuizOptionsSheetSectionEditorModal
          sheet={sheet}
          setSheet={setSheet}
          isOpen={edit}
          onClose={() => setEdit(false)}
        />
      )}
    </div>
  );
};
