import {
  cleanRequest,
  CodeEditorSheetType,
  CodeEditorSubmissionDTO,
  CodeEditorSubmissionResponseDTO,
  CodeEditorTestCasesType,
  ContentResponseType,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  Status,
  SubmissionRunStatus,
  WorksheetType,
} from '@juki-team/commons';
import React, { useEffect, useRef, useState } from 'react';
import { KeyedMutator } from 'swr';
import { authorizedRequest, classNames, getHeight } from '../../../../../helpers';
import { useJukiNotification, useRouterStore, useUserStore } from '../../../../../hooks';
import { jukiApiSocketManager } from '../../../../../settings';
import { QueryParamKey } from '../../../../../types';
import { T } from '../../../../atoms';
import { ArrowLeftIcon, ArrowRightIcon, SpinIcon } from '../../../../atoms/server';
import { ButtonLoader } from '../../../../molecules';
import { SetLoaderStatusOnClickType } from '../../../../molecules/ButtonLoader/types';
import { UserCodeEditor } from '../../../UserCodeEditor/UserCodeEditor';

interface RunnerSheetSectionProps {
  sheet: CodeEditorSheetType,
  worksheetKey: string,
  mutateUserResults?: KeyedMutator<any>,
  result: {
    nickname: string,
    submissions: CodeEditorSubmissionResponseDTO[],
    isLoading: boolean,
    isValidating: boolean,
  },
  readOnly: boolean,
}

export const CodeEditorSheetSectionView = (props: RunnerSheetSectionProps) => {
  
  const { sheet, worksheetKey, mutateUserResults, result } = props;
  
  const [ sourceCode, setSourceCode ] = useState('');
  const { notifyResponse } = useJukiNotification();
  const userNickname = useUserStore(state => state.user.nickname);
  const searchParams = useRouterStore(state => state.searchParams);
  const routeParams = useRouterStore(state => state.routeParams);
  const [ _submissionIndex, setSubmissionIndex ] = useState(0);
  useEffect(() => {
    setSubmissionIndex(0);
  }, [ result.nickname ]);
  
  const totalSubmissions = result.submissions.length;
  const submissionIndex = totalSubmissions - _submissionIndex - 1;
  const initialSource: { [key: string]: string } = {};
  for (const [ langKey, source ] of Object.entries(sheet.sourceCode)) {
    initialSource[langKey] = source;
  }
  if (result.submissions[submissionIndex]?.language && result.submissions[submissionIndex]?.sourceCode) {
    initialSource[result.submissions[submissionIndex]?.language] = result.submissions[submissionIndex]?.sourceCode;
  }
  
  const readOnly = userNickname !== result.nickname;
  const setLoaderStatusRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  const saveCode = async (sourceCode: string, language: ProgrammingLanguage, testCases: CodeEditorTestCasesType) => {
    setLoaderStatusRef.current?.(Status.LOADING);
    setSubmissionIndex(0);
    const codeEditorSubmissionDTO: CodeEditorSubmissionDTO = {
      type: WorksheetType.CODE_EDITOR,
      id: sheet.id,
      language,
      sourceCode,
      testCases,
    };
    let response;
    const classKey = routeParams.classKey as string;
    const cycleId = routeParams.cycleId as string;
    const sessionId = searchParams.get(QueryParamKey.SESSION);
    const assignmentId = searchParams.get(QueryParamKey.ASSIGNMENT);
    if (classKey && cycleId && sessionId && assignmentId) {
      const { url, ...options } = jukiApiSocketManager.API_V1.class.viewAssignmentMyWorksheetSubmitCodeEditor({
        params: { classKey, cycleId, sessionId, assignmentId },
        body: codeEditorSubmissionDTO,
      });
      response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
    } else {
      const { url, ...options } = jukiApiSocketManager.API_V1.worksheet.submitCodeEditor({
        params: { worksheetKey },
        body: codeEditorSubmissionDTO,
      });
      response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
    }
    await mutateUserResults?.();
    notifyResponse(response, setLoaderStatusRef.current);
  };
  
  return (
    <div className="jk-col stretch flex-1 gap">
      hola
      <div style={{ height: getHeight(sheet.height, sourceCode), minWidth: 200, width: '100%' }} className="jk-row">
        <UserCodeEditor<ProgrammingLanguage>
          withoutRunCodeButton={readOnly}
          initialLanguage={result.submissions[submissionIndex]?.language}
          readOnly={readOnly}
          initialSource={initialSource}
          onSourceChange={setSourceCode}
          initialTestCases={result.submissions[submissionIndex]?.testCases ?? sheet.testCases}
          languages={sheet.languages.map(lang => ({ value: lang, label: PROGRAMMING_LANGUAGE[lang]?.label || lang }))}
          storeKey={sheet.id + 'view'}
          enableAddCustomSampleCases
          onCodeRunStatusChange={(status, { sourceCode, language, testCases }) => {
            if (status === SubmissionRunStatus.COMPILED) {
              void saveCode(sourceCode, language, testCases);
            }
          }}
          centerButtons={({ sourceCode, language, testCases }) => {
            const buttons = [];
            if (!readOnly) {
              buttons.push(
                <ButtonLoader
                  key="save"
                  size="tiny"
                  type="secondary"
                  onClick={() => saveCode(sourceCode, language, testCases)}
                  setLoaderStatusRef={setLoaderStatus => setLoaderStatusRef.current = setLoaderStatus}
                >
                  <T>save</T>
                </ButtonLoader>,
              );
            }
            buttons.push(
              <div className="jk-row bc-hl jk-br-ie" key="buttons">
                <div
                  className={classNames('clickable br-50-pc jk-row', { 'cr-ht': totalSubmissions === 0 })}
                  onClick={totalSubmissions ? () => setSubmissionIndex(prevState => (prevState + 1) % totalSubmissions) : undefined}
                >
                  <ArrowLeftIcon />
                </div>
                {result.isLoading ? <SpinIcon /> : <>{submissionIndex + 1}&nbsp;/&nbsp;{totalSubmissions}<T>v.</T></>}
                {/*{result.isValidating && <SpinIcon />}*/}
                <div
                  className={classNames('clickable br-50-pc jk-row', { 'cr-ht': totalSubmissions === 0 })}
                  onClick={totalSubmissions ? () => setSubmissionIndex(prevState => (prevState - 1 + totalSubmissions) % totalSubmissions) : undefined}
                >
                  <ArrowRightIcon />
                </div>
              </div>,
            );
            return (
              <div className="jk-row gap">
                {buttons}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
