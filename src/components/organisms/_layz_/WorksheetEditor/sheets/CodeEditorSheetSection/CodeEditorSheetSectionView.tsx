import {
  cleanRequest,
  CODE_LANGUAGE,
  CodeEditorFiles,
  CodeEditorSheetType,
  CodeEditorSubmissionDTO,
  CodeEditorTestCasesType,
  CodeLanguage,
  ContentResponseType,
  Status,
  SubmissionRunStatus,
  WorksheetType,
} from '@juki-team/commons';
import { Children, useEffect, useRef, useState } from 'react';
import { QueryParamKey } from '../../../../../../enums';
import { authorizedRequest, classNames, getHeight } from '../../../../../../helpers';
import { jukiApiManager } from '../../../../../../settings';
import { useRouterStore } from '../../../../../../stores/router/useRouterStore';
import { T } from '../../../../../atoms';
import { ArrowLeftIcon, ArrowRightIcon, SpinIcon } from '../../../../../atoms/server';

import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { ButtonLoader } from '../../../../../molecules';
import { SetLoaderStatusOnClickType, UserResultsType } from '../../../../../types';
import { UserCodeEditor } from '../../../UserCodeEditor';

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
  
  const { notifyResponse } = useJukiNotification();
  const searchParams = useRouterStore(state => state.searchParams);
  const [ _submissionIndex, setSubmissionIndex ] = useState(0);
  const submissions = userResults?.data?.submissions[WorksheetType.CODE_EDITOR]?.[chunkId] ?? [];
  useEffect(() => {
    setSubmissionIndex(0);
  }, [ userResults?.data?.user.nickname ]);
  
  const totalSubmissions = submissions.length;
  const submissionIndex = totalSubmissions - _submissionIndex - 1;
  let initialFiles = submissions[submissionIndex]?.files ?? content.files;
  
  const setLoaderStatusRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  const saveCode = async (files: CodeEditorFiles<CodeLanguage>, testCases: CodeEditorTestCasesType) => {
    setLoaderStatusRef.current?.(Status.LOADING);
    setSubmissionIndex(0);
    const codeEditorSubmissionDTO: CodeEditorSubmissionDTO = {
      type: WorksheetType.CODE_EDITOR,
      id: content.id,
      files,
      testCases,
    };
    let response;
    const assignmentId = searchParams.get(QueryParamKey.ASSIGNMENT);
    const { url, ...options } = jukiApiManager.API_V1.worksheet.submitCodeEditor({
      params: { worksheetKey, secondaryKey: assignmentId ?? '' },
      body: codeEditorSubmissionDTO,
    });
    response = cleanRequest<ContentResponseType<{}>>(await authorizedRequest(url, options));
    await userResults?.mutate?.();
    notifyResponse(response, setLoaderStatusRef.current);
  };
  
  return (
    <div className="jk-col stretch flex-1 gap">
      <div
        style={{ height: getHeight(content.height, '' /*sourceCode*/), minWidth: 200, width: '100%' }}
        className="jk-row"
      >
        <UserCodeEditor<CodeLanguage>
          withoutRunCodeButton={readOnly}
          readOnly={readOnly}
          initialFiles={initialFiles}
          // onSourceChange={setSourceCode}
          initialTestCases={submissions[submissionIndex]?.testCases ?? content.testCases}
          languages={content.languages.map(lang => ({ value: lang, label: CODE_LANGUAGE[lang]?.label || lang }))}
          storeKey={content.id + '_view'}
          enableAddCustomSampleCases
          onCodeRunStatusChange={(status, { files, testCases }) => {
            if (status === SubmissionRunStatus.COMPLETED && isSolvable) {
              void saveCode(files, testCases);
            }
          }}
          centerButtons={({ testCases, files }) => {
            const buttons = [];
            if (!readOnly && isSolvable) {
              buttons.push(
                <ButtonLoader
                  key="save"
                  size="tiny"
                  type="secondary"
                  onClick={() => saveCode(files, testCases)}
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
                {Children.toArray(buttons)}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
