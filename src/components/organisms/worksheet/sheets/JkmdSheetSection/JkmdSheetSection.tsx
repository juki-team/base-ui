import {
  cleanRequest,
  ContentResponseType,
  JkmdSheetType,
  JkmdSubmissionDTO,
  Status,
  WorksheetType,
} from '@juki-team/commons';
import React, { useState } from 'react';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { useStableState } from '../../../../../hooks/useStableState';
import { jukiApiSocketManager } from '../../../../../settings';
import { InputCheckbox, T } from '../../../../atoms';
import { ButtonLoader, FloatToolbar } from '../../../../molecules';
import { MdMathViewer } from '../../../mdMath/MdMathViewer';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { ResultHeader } from '../ResultHeader';
import { SheetSection } from '../types';
import { JkmdSheetSectionEditor } from './JkmdSheetSectionEditor';

interface JkmdSheetSectionProps extends SheetSection<JkmdSheetType> {
}

export const JkmdSheetSection = (props: JkmdSheetSectionProps) => {
  
  const {
    content: initialContent,
    setContent: saveContent,
    index,
    chunkId,
    sheetLength,
    setSheet,
    worksheetKey,
    isSolvable,
    readOnly,
    userResults,
  } = props;
  
  const { notifyResponse } = useJukiNotification();
  const [ edit, setEdit ] = useState(false);
  const [ modal, setModal ] = useState(false);
  const [ content, _setContent ] = useStableState(initialContent);
  const setContent = saveContent ? _setContent : undefined;
  
  const submissions = userResults?.data?.submissions[WorksheetType.JK_MD]?.[chunkId] ?? [];
  const lastSubmission = submissions.at(-1);
  const reset = () => {
    _setContent(initialContent);
  };
  
  const text = content.content.trim();
  return (
    <div
      className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100 jk-md-sheet-section"
      onDoubleClick={() => setEdit(true)}
    >
      {setContent && (
        <EditSheetModal isOpen={modal} onClose={() => setModal(false)} content={content} setContent={setContent} />
      )}
      {setContent && edit
        ? <JkmdSheetSectionEditor content={content} setContent={setContent} isSolvable={!!isSolvable} />
        : (
          <div className="jk-col gap stretch jk-md-sheet-section-view wh-100 pn-re">
            {isSolvable && !setSheet && text && (
              <ResultHeader
                submitted={!!lastSubmission}
                points={content.points}
                userPoints={lastSubmission?.points ?? 0}
                isResolved={!!lastSubmission?.isCompleted}
              >
                {!readOnly && (
                  <ButtonLoader
                    type="light"
                    expand
                    size="small"
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content={!!lastSubmission?.read ? 'mark as unread' : 'mark as read'}
                    onClick={async (setLoaderStatus) => {
                      setLoaderStatus(Status.LOADING);
                      const jkMdSubmissionDTO: JkmdSubmissionDTO = {
                        type: WorksheetType.JK_MD,
                        id: content.id,
                        read: !lastSubmission?.read,
                      };
                      const { url, ...options } = jukiApiSocketManager.API_V1.worksheet.submitJkMd({
                        params: { worksheetKey },
                        body: jkMdSubmissionDTO,
                      });
                      const response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
                      await userResults?.mutate?.();
                      notifyResponse(response, setLoaderStatus);
                    }}
                    icon={<InputCheckbox checked={!!lastSubmission?.read} onChange={() => null} />}
                  >
                    <T className="tt-se">{!!lastSubmission?.read ? '_read' : 'unread'}</T>
                  </ButtonLoader>
                )}
              </ResultHeader>
            )}
            <ChunkTitle content={content} />
            {!!text && (
              <div className="bc-we jk-br-ie jk-pg wh-100"><MdMathViewer source={text} /></div>
            )}
          </div>
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
