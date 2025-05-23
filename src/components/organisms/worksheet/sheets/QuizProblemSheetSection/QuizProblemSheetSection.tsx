import { QuizProblemSheetType, QuizProblemSubmissionResponseDTO, UserBasicInterface } from '@juki-team/commons';
import React, { Dispatch, useState } from 'react';
import { KeyedMutator } from 'swr';
import { T } from '../../../../atoms';
import { CheckIcon, EditIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { ResultHeader } from '../ResultHeader';
import { QuizProblemSheetSectionEditor } from './QuizProblemSheetSectionEditor';
import { QuizProblemSheetSectionEditorModal } from './QuizProblemSheetSectionEditorModal';
import { QuizProblemSheetSectionView } from './QuizProblemSheetSectionView';

interface RunnerSheetSectionProps {
  sheet: QuizProblemSheetType,
  setSheet?: Dispatch<QuizProblemSheetType>,
  actionButtons?: ButtonActionProps['buttons'],
  result?: QuizProblemSubmissionResponseDTO,
  userResult?: UserBasicInterface,
  isSolvable?: boolean,
  showingResults?: boolean,
  isSolving?: boolean,
  isEditor?: boolean,
  worksheetKey: string,
  mutateUserResults?: KeyedMutator<any>,
}

export const QuizProblemSheetSection = ({
                                          sheet,
                                          setSheet,
                                          result,
                                          userResult,
                                          actionButtons = [],
                                          isSolvable = false,
                                          showingResults = false,
                                          isSolving = false,
                                          isEditor = false,
                                          worksheetKey,
                                          mutateUserResults,
                                        }: RunnerSheetSectionProps) => {
  
  const [ edit, setEdit ] = useState(false);
  
  const editActionButton = {
    icon: <EditIcon />,
    buttons: [ { icon: <EditIcon />, label: <T>edit</T>, onClick: () => setEdit(true) }, ...actionButtons ],
  };
  
  return (
    <div className="jk-row stretch flex-1 sheet-section jk-br-ie relative" style={{ width: '100%' }}>
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      {isSolvable && (
        <ResultHeader points={sheet.points} userPoints={result?.points ?? 0} isResolved={!!result?.isCompleted}>
          {!!result?.isCompleted && <><CheckIcon size="tiny" /> <T className="tt-se">resolved</T></>}
        </ResultHeader>
      )}
      {setSheet
        ? <QuizProblemSheetSectionEditor sheet={sheet} setSheet={setSheet} />
        : (
          <QuizProblemSheetSectionView
            sheet={sheet}
            result={result}
            userResult={userResult}
            showingResults={showingResults}
            isSolvable={isSolvable}
            isSolving={isSolving}
            isEditor={isEditor}
            worksheetKey={worksheetKey}
          />
        )}
      
      {setSheet && (
        <QuizProblemSheetSectionEditorModal
          sheet={sheet}
          setSheet={setSheet}
          isOpen={edit}
          onClose={() => setEdit(false)}
        />
      )}
    </div>
  );
};
