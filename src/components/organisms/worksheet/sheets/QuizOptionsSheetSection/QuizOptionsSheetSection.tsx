import {
  cleanRequest,
  ContentResponseType,
  QuizOptionsSheetType,
  QuizOptionsSubmissionDTO,
  Status,
  WorksheetType,
} from '@juki-team/commons';
import React, { useState } from 'react';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification, useStableState } from '../../../../../hooks';
import { jukiApiSocketManager } from '../../../../../settings';
import { T } from '../../../../atoms';
import { ButtonLoader, FloatToolbar } from '../../../../molecules';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { ResultHeader } from '../ResultHeader';
import { SheetSection } from '../types';
import { QuizOptionsSheetSectionEditor } from './QuizOptionsSheetSectionEditor';
import { QuizOptionsSheetSectionView } from './QuizOptionsSheetSectionView';

interface QuizOptionsSheetSectionProps extends SheetSection<QuizOptionsSheetType> {
}

export const QuizOptionsSheetSection = (props: QuizOptionsSheetSectionProps) => {
  
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
  
  const { notifyResponse } = useJukiNotification();
  const [ edit, setEdit ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ content, _setContent ] = useStableState(initialContent);
  const setContent = saveContent ? _setContent : undefined;
  const reset = () => {
    _setContent(initialContent);
  };
  
  const submissions = userResults?.data?.submissions[WorksheetType.QUIZ_OPTIONS]?.[chunkId] ?? [];
  const lastSubmission = submissions.at(-1);
  const [ checkedOptions, setCheckedOptions ] = useStableState<string[]>(lastSubmission?.checkedOptions ?? []);
  
  return (
    <div
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100"
      onDoubleClick={() => setEdit(true)}
    >
      {setContent && (
        <EditSheetModal isOpen={modal} onClose={() => setModal(false)} content={content} setContent={setContent} />
      )}
      {setContent && edit ? (
        <QuizOptionsSheetSectionEditor
          content={content}
          setContent={setContent}
          isSolvable={isSolvable}
        />
      ) : (
        <div className="jk-col stretch gap quiz-options-sheet-section-view wh-100 pn-re">
          {isSolvable && !setSheet && (
            <ResultHeader
              points={content.points}
              userPoints={lastSubmission?.points ?? 0}
              isResolved={!!lastSubmission?.isCompleted}
            >
              <ButtonLoader
                type="light"
                size="small"
                expand
                onClick={async (setLoaderStatus) => {
                  setLoaderStatus(Status.LOADING);
                  const jkMdSubmissionDTO: QuizOptionsSubmissionDTO = {
                    type: WorksheetType.QUIZ_OPTIONS,
                    id: content.id,
                    checkedOptions,
                  };
                  const { url, ...options } = jukiApiSocketManager.API_V1.worksheet.submitQuizOptions({
                    params: { worksheetKey },
                    body: jkMdSubmissionDTO,
                  });
                  const response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
                  await userResults?.mutate?.();
                  notifyResponse(response, setLoaderStatus);
                }}
              >
                <T className="tt-se">save</T>
              </ButtonLoader>
            </ResultHeader>
          )}
          {!!content.title && (
            <div className="jk-row left"><p className="tt-se cr-th tx-l fw-bd">{content.title}</p></div>
          )}
          <QuizOptionsSheetSectionView
            content={content}
            checkedOptions={checkedOptions}
            setCheckedOptions={setCheckedOptions}
            readOnly={readOnly}
          />
        </div>
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.QUIZ_OPTIONS,
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
