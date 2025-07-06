import {
  cleanRequest,
  CODE_LANGUAGE,
  CodeEditorSheetType,
  CodeEditorSubmissionDTO,
  CodeEditorTestCasesType,
  CodeLanguage,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
  WorksheetType,
} from '@juki-team/commons';
import React, { useEffect, useRef, useState } from 'react';
import { authorizedRequest, classNames, getHeight } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { jukiApiSocketManager } from '../../../../../settings';
import { useRouterStore } from '../../../../../stores/router/useRouterStore';
import { QueryParamKey, UserResultsType } from '../../../../../types';
import { T } from '../../../../atoms';
import { ArrowLeftIcon, ArrowRightIcon, SpinIcon } from '../../../../atoms/server';
import { ButtonLoader } from '../../../../molecules';
import { SetLoaderStatusOnClickType } from '../../../../molecules/ButtonLoader/types';
import { UserCodeEditor } from '../../../UserCodeEditor/UserCodeEditor';

interface RunnerSheetSectionProps {
  content: CodeEditorSheetType,
  worksheetKey: string,
  chunkId: string,
  userResults?: UserResultsType,
  readOnly: boolean,
  isSolvable: boolean,
}

export const CodeEditorSheetSectionView = (props: RunnerSheetSectionProps) => {
  
  const { content, worksheetKey, chunkId, userResults, readOnly, isSolvable } = props;
  
  const [ sourceCode, setSourceCode ] = useState('');
  const { notifyResponse } = useJukiNotification();
  const searchParams = useRouterStore(state => state.searchParams);
  const routeParams = useRouterStore(state => state.routeParams);
  const [ _submissionIndex, setSubmissionIndex ] = useState(0);
  const submissions = userResults?.data?.submissions[WorksheetType.CODE_EDITOR]?.[chunkId] ?? [];
  useEffect(() => {
    setSubmissionIndex(0);
  }, [ userResults?.data?.user.nickname ]);
  
  const totalSubmissions = submissions.length;
  const submissionIndex = totalSubmissions - _submissionIndex - 1;
  const initialSource: { [key: string]: string } = {};
  for (const [ langKey, source ] of Object.entries(content.sourceCode)) {
    initialSource[langKey] = source;
  }
  if (submissions[submissionIndex]?.language && submissions[submissionIndex]?.sourceCode) {
    initialSource[submissions[submissionIndex]?.language] = submissions[submissionIndex]?.sourceCode;
  }
  
  const setLoaderStatusRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  const saveCode = async (sourceCode: string, language: CodeLanguage, testCases: CodeEditorTestCasesType) => {
    setLoaderStatusRef.current?.(Status.LOADING);
    setSubmissionIndex(0);
    const codeEditorSubmissionDTO: CodeEditorSubmissionDTO = {
      type: WorksheetType.CODE_EDITOR,
      id: content.id,
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
    await userResults?.mutate?.();
    notifyResponse(response, setLoaderStatusRef.current);
  };
  
  return (
    <div className="jk-col stretch flex-1 gap">
      <div style={{ height: getHeight(content.height, sourceCode), minWidth: 200, width: '100%' }} className="jk-row">
        <UserCodeEditor<CodeLanguage>
          withoutRunCodeButton={readOnly}
          initialLanguage={submissions[submissionIndex]?.language}
          readOnly={readOnly}
          initialSource={initialSource}
          onSourceChange={setSourceCode}
          initialTestCases={submissions[submissionIndex]?.testCases ?? content.testCases}
          languages={content.languages.map(lang => ({ value: lang, label: CODE_LANGUAGE[lang]?.label || lang }))}
          storeKey={content.id + 'view'}
          enableAddCustomSampleCases
          onCodeRunStatusChange={(status, { sourceCode, language, testCases }) => {
            if (status === SubmissionRunStatus.COMPLETED && isSolvable) {
              void saveCode(sourceCode, language, testCases);
            }
          }}
          centerButtons={({ sourceCode, language, testCases }) => {
            const buttons = [];
            if (!readOnly && isSolvable) {
              buttons.push(
                <ButtonLoader
                  key="save"
                  size="tiny"
                  type="secondary"
                  onClick={() => saveCode(sourceCode, language, testCases)}
                  setLoaderStatusRef={setLoaderStatus => setLoaderStatusRef.current = setLoaderStatus}
                >
                  <T className="tt-se">save</T>
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
                {userResults?.isLoading ?
                  <SpinIcon /> : <>{submissionIndex + 1}&nbsp;/&nbsp;{totalSubmissions}<T>v.</T></>}
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
