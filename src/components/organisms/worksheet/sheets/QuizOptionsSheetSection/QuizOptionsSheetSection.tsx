import {
  cleanRequest,
  ContentResponseType,
  isQuizOptionsSheetType,
  isStringJson,
  QuizOptionsSheetType,
  QuizOptionsSubmissionDTO,
  Status,
  WorksheetType,
} from '@juki-team/commons';
import { useRef, useState } from 'react';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification, useStableState } from '../../../../hooks';
import { jukiApiManager } from '../../../../../settings';
import { T } from '../../../../atoms';
import { ButtonLoader, FloatToolbar } from '../../../../molecules';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { ResultHeaders } from '../ResultHeader';
import { SheetSection } from '../types';
import { useOnSaveSheetSection } from '../useOnSaveSheetSection';
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const onSaveEdit = () => {
    setEdit(!edit);
    saveContent?.(content);
  };
  useOnSaveSheetSection(sectionRef, edit, onSaveEdit);
  
  const submissions = userResults?.data?.submissions[WorksheetType.QUIZ_OPTIONS]?.[chunkId] ?? [];
  const [ selectedIndex, setSelectedIndex ] = useStableState(submissions.length - 1);
  const lastSubmission = submissions.at(selectedIndex);
  const [ checkedOptions, setCheckedOptions ] = useStableState<string[]>(lastSubmission?.checkedOptions ?? []);
  
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
          isValid={(value) => isStringJson(value) && isQuizOptionsSheetType(JSON.parse(value))}
        />
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
            <ResultHeaders
              submissions={submissions}
              points={content.points}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            >
              {!readOnly && (
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
                    const { url, ...options } = jukiApiManager.API_V1.worksheet.submitQuizOptions({
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
              )}
            </ResultHeaders>
          )}
          <ChunkTitle content={content} />
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
