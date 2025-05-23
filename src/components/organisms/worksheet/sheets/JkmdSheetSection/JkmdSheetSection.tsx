import {
  cleanRequest,
  ContentResponseType,
  JkmdSheetType,
  JkmdSubmissionDTO,
  JkmdSubmissionResponseDTO,
  Status,
  WorksheetType,
} from '@juki-team/commons';
import React, { Dispatch, SetStateAction } from 'react';
import { KeyedMutator } from 'swr';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks';
import { jukiApiSocketManager } from '../../../../../settings';
import { InputCheckbox, T } from '../../../../atoms';
import { EditIcon } from '../../../../atoms/server';
import { ButtonLoader, FloatToolbar } from '../../../../molecules';
import { ButtonActionProps } from '../../../../molecules/FloatToolbar/types';
import { MdMathViewer } from '../../../mdMath/MdMathViewer';
import { ResultHeader } from '../ResultHeader';
import { JkmdSheetSectionEditor } from './JkmdSheetSectionEditor';

interface JkmdSheetSectionProps {
  sheet: JkmdSheetType,
  setSheet?: Dispatch<SetStateAction<JkmdSheetType>>,
  actionButtons?: ButtonActionProps['buttons'],
  worksheetKey: string,
  isSolvable?: boolean,
  result?: JkmdSubmissionResponseDTO,
  mutateUserResults?: KeyedMutator<any>,
}

export const JkmdSheetSection = ({
                                   sheet,
                                   setSheet,
                                   worksheetKey,
                                   isSolvable,
                                   result,
                                   actionButtons = [],
                                   mutateUserResults,
                                 }: JkmdSheetSectionProps) => {
  
  const { notifyResponse } = useJukiNotification();
  const editActionButton = {
    icon: <EditIcon />,
    buttons: [ ...actionButtons ],
  };
  
  return (
    <div className="jk-row stretch sheet-section jk-br-ie relative wh-100">
      {isSolvable && (
        <ResultHeader points={sheet.points} userPoints={result?.points ?? 0} isResolved={!!result?.isCompleted}>
          <ButtonLoader
            type="void"
            onClick={async (setLoaderStatus) => {
              setLoaderStatus(Status.LOADING);
              const jkMdSubmissionDTO: JkmdSubmissionDTO = {
                type: WorksheetType.JK_MD,
                id: sheet.id,
                read: !result?.read,
              };
              const { url, ...options } = jukiApiSocketManager.API_V1.worksheet.submitJkMd({
                params: { worksheetKey },
                body: jkMdSubmissionDTO,
              });
              const response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
              await mutateUserResults?.();
              notifyResponse(response, setLoaderStatus);
            }}
          >
            <InputCheckbox
              label={<T className="tt-se">_read</T>}
              checked={!!result?.read}
              onChange={() => null}
            />
          </ButtonLoader>
        </ResultHeader>
      )}
      {setSheet
        ? <JkmdSheetSectionEditor sheet={sheet} setSheet={setSheet} isSolvable={!!isSolvable} />
        : <div className="jk-pg wh-100"><MdMathViewer source={sheet.content} /></div>}
      {setSheet && <FloatToolbar actionButtons={[ editActionButton ]} />}
      {/*{setSheet && (*/}
      {/*  <JkmdSheetSectionEditorModal isOpen={edit} onClose={() => setEdit(false)} setSheet={setSheet} sheet={sheet} />*/}
      {/*)}*/}
    </div>
  );
};
