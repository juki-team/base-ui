import { QuizProblemSheetType, WorksheetType } from '@juki-team/commons';
import React, { useState } from 'react';
import { useStableState } from '../../../../../hooks';
import { T } from '../../../../atoms';
import { CheckIcon } from '../../../../atoms/server';
import { FloatToolbar } from '../../../../molecules';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { ResultHeader } from '../ResultHeader';
import { SheetSection } from '../types';
import { QuizProblemSheetSectionEditor } from './QuizProblemSheetSectionEditor';
import { QuizProblemSheetSectionView } from './QuizProblemSheetSectionView';

interface QuizProblemSheetSectionProps extends SheetSection<QuizProblemSheetType> {
}

export const QuizProblemSheetSection = (props: QuizProblemSheetSectionProps) => {
  
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
  } = props;
  
  const [ edit, setEdit ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ content, _setContent ] = useStableState(initialContent);
  const setContent = saveContent ? _setContent : undefined;
  const reset = () => {
    _setContent(initialContent);
  };
  
  const submissions = userResults?.data?.submissions[WorksheetType.QUIZ_PROBLEM]?.[chunkId] ?? [];
  const lastSubmission = submissions.at(-1);
  
  return (
    <div
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100"
      onDoubleClick={() => setEdit(true)}
    >
      {setContent && (
        <EditSheetModal isOpen={modal} onClose={() => setModal(false)} content={content} setContent={setContent} />
      )}
      {setContent && edit
        ? <QuizProblemSheetSectionEditor content={content} setContent={setContent} isSolvable={isSolvable} />
        : (
          <div className="jk-col gap stretch center quiz-problem-sheet-section-view wh-100 pn-re">
            {isSolvable && !setSheet && (
              <ResultHeader
                submitted={!!lastSubmission}
                points={content.points}
                userPoints={lastSubmission?.points ?? 0}
                isResolved={!!lastSubmission?.isCompleted}
              >
                {!!lastSubmission?.isCompleted && <><CheckIcon size="tiny" /> <T className="tt-se">resolved</T></>}
              </ResultHeader>
            )}
            <ChunkTitle content={content} />
            {content.problemKey ? (
              <QuizProblemSheetSectionView
                content={content}
                worksheetKey={worksheetKey}
              />
            ) : (
              <div className="jk-row center"><T className="tt-se cr-er">problem not selected</T></div>
            )}
          </div>
        )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.QUIZ_PROBLEM,
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
