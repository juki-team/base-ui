import type { JkmdSubmissionDTO } from '@juki-team/commons/dto';
import { Status, WorksheetType } from '@juki-team/commons/enums';
import { cleanRequest, isJkmdSheet, isStringJson } from '@juki-team/commons/helpers';
import type { ContentResponse, JkmdSheet } from '@juki-team/commons/types';
import { useRef, useState } from 'react';
import { jukiApiManager } from '../../../../../../settings';
import { InputCheckbox } from '../../../../../atoms/InputCheckbox/InputCheckbox';
import { T } from '../../../../../atoms/T/T';
import { authorizedRequest } from '../../../../../helpers/fetch';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { ButtonLoader } from '../../../../../molecules/ButtonLoader/ButtonLoader';
import { FloatToolbar } from '../../../../../molecules/FloatToolbar/FloatToolbar';
import { MdMathViewer } from '../../../../MdMathViewer/MdMathViewer';
import { ChunkTitle } from '../ChunkTitle';
import { EditSheetModal } from '../EditSheetModal';
import { getActionButtons } from '../getActionButtons';
import { ResultHeader } from '../ResultHeader';
import type { SheetSection } from '../types';
import { JkmdSheetSectionEditor } from './JkmdSheetSectionEditor';

export const JkmdSheetSection = (props: SheetSection<JkmdSheet>) => {
  const { content, setContent, index, chunkId, sheetLength, setSheet, worksheetKey, isSolvable, readOnly, userResults } = props;

  const { notifyResponse } = useJukiNotification();
  const edit = true;
  const [modal, setModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const submissions = userResults?.data?.submissions[WorksheetType.JK_MD]?.[chunkId] ?? [];
  const lastSubmission = submissions.at(-1);
  const text = content.content.trim();

  return (
    <div ref={sectionRef} className="jk-row top left nowrap stretch jk-br-ie pn-re wh-100 jk-md-sheet-section">
      {setContent && (
        <EditSheetModal
          isOpen={modal}
          onClose={() => setModal(false)}
          content={content}
          setContent={setContent}
          isValid={(value) => isStringJson(value) && isJkmdSheet(JSON.parse(value))}
        />
      )}
      {setContent && edit ? (
        <JkmdSheetSectionEditor content={content} setContent={setContent} isSolvable={!!isSolvable} />
      ) : (
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
                  type="secondary"
                  expand
                  size="small"
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={lastSubmission?.read ? 'mark as unread' : 'mark as read'}
                  onClick={async (setLoaderStatus) => {
                    setLoaderStatus(Status.LOADING);
                    const jkMdSubmissionDTO: JkmdSubmissionDTO = {
                      type: WorksheetType.JK_MD,
                      id: content.id,
                      read: !lastSubmission?.read,
                    };
                    const { url, ...options } = jukiApiManager.apiV2.worksheet.submitJkMd({
                      params: { worksheetKey },
                      body: jkMdSubmissionDTO,
                    });
                    const response = cleanRequest<ContentResponse<Record<string, never>>>(
                      await authorizedRequest(url, options),
                    );
                    await userResults?.mutate?.();
                    notifyResponse(response, setLoaderStatus);
                  }}
                  icon={<InputCheckbox checked={!!lastSubmission?.read} onChange={() => null} />}
                >
                  <T className="tt-se">{lastSubmission?.read ? '_read' : 'unread'}</T>
                </ButtonLoader>
              )}
            </ResultHeader>
          )}
          <div className="jk-pg-rl wh-100 bc-sf-md">
            <ChunkTitle content={content} />
            {!!text && <MdMathViewer source={text} />}
          </div>
        </div>
      )}
      {setSheet && (
        <FloatToolbar
          actionButtons={getActionButtons({
            type: WorksheetType.JK_MD,
            edit,
            setModal,
            index,
            sheetLength,
            setSheet,
          })}
          placement="right-end"
          outer
        />
      )}
    </div>
  );
};
