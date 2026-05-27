import { CODE_LANGUAGE } from '@juki-team/commons/constants';
import type { CodeEditorSubmissionDTO } from '@juki-team/commons/dto';
import { type CodeLanguage, Status, SubmissionRunStatus, WorksheetType } from '@juki-team/commons/enums';
import { cleanRequest } from '@juki-team/commons/helpers';
import type { CodeEditorFiles, CodeEditorSheet, CodeEditorTestCases, ContentResponse } from '@juki-team/commons/types';
import { Children, useEffect, useRef, useState } from 'react';
import { QueryParamKey } from '../../../../../../enums';
import { jukiApiManager } from '../../../../../../settings';
import { useRouterStore } from '../../../../../../stores/router/useRouterStore';
import { Div } from '../../../../../atoms/Div/Div';
import { T } from '../../../../../atoms/T/T';
import { SpinIcon } from '../../../../../atoms/server/icons/SpinIcon';
import { ArrowLeftIcon } from '../../../../../atoms/server/icons/google/ArrowLeftIcon';
import { ArrowRightIcon } from '../../../../../atoms/server/icons/google/ArrowRightIcon';
import { classNames } from '../../../../../helpers/commons';
import { authorizedRequest } from '../../../../../helpers/fetch';
import { getHeight } from '../../../../../helpers/worksheet';

import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { ButtonLoader } from '../../../../../molecules/ButtonLoader/ButtonLoader';
import type { SetLoaderStatusOnClickType, UserResultsType } from '../../../../../types';
import { UserCodeEditor } from '../../../UserCodeEditor';

interface RunnerSheetSectionProps {
  content: CodeEditorSheet;
  worksheetKey: string;
  chunkId: string;
  userResults?: UserResultsType;
  readOnly: boolean;
  isSolvable: boolean;
}

export const CodeEditorSheetSectionView = (props: RunnerSheetSectionProps) => {
  const { content, worksheetKey, chunkId, userResults, readOnly, isSolvable } = props;

  const { notifyResponse } = useJukiNotification();
  const searchParams = useRouterStore((state) => state.searchParams);
  const [_submissionIndex, setSubmissionIndex] = useState(0);
  const submissions = userResults?.data?.submissions[WorksheetType.CODE_EDITOR]?.[chunkId] ?? [];
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger to reset index when user changes
  useEffect(() => {
    setSubmissionIndex(0);
  }, [userResults?.data?.user.nickname]);

  const totalSubmissions = submissions.length;
  const submissionIndex = totalSubmissions - _submissionIndex - 1;
  const initialFiles = submissions[submissionIndex]?.files ?? content.files;

  const setLoaderStatusRef = useRef<SetLoaderStatusOnClickType>(undefined);

  const saveCode = async (files: CodeEditorFiles<CodeLanguage>, testCases: CodeEditorTestCases) => {
    setLoaderStatusRef.current?.(Status.LOADING);
    setSubmissionIndex(0);
    const codeEditorSubmissionDTO: CodeEditorSubmissionDTO = {
      type: WorksheetType.CODE_EDITOR,
      id: content.id,
      files,
      testCases,
    };
    const assignmentId = searchParams.get(QueryParamKey.ASSIGNMENT);
    const { url, ...options } = jukiApiManager.apiV2.worksheet.submitCodeEditor({
      params: { worksheetKey, secondaryKey: assignmentId ?? '' },
      body: codeEditorSubmissionDTO,
    });
    const response = cleanRequest<ContentResponse<void>>(await authorizedRequest(url, options));
    await userResults?.mutate?.();
    notifyResponse(response, setLoaderStatusRef.current);
  };

  return (
    <div className="jk-col stretch flex-1 gap">
      <div style={{ height: getHeight(content.height, '' /*sourceCode*/), minWidth: 200, width: '100%' }} className="jk-row">
        <UserCodeEditor<CodeLanguage>
          withoutRunCodeButton={readOnly}
          readOnly={readOnly}
          initialFiles={initialFiles}
          // onSourceChange={setSourceCode}
          initialTestCases={submissions[submissionIndex]?.testCases ?? content.testCases}
          languages={content.languages.map((lang) => ({ value: lang, label: CODE_LANGUAGE[lang]?.label || lang }))}
          storeKey={`${content.id}_view`}
          enableAddCustomSampleCases
          onCodeRunStatusChange={(status, { files, testCases }) => {
            if (status === SubmissionRunStatus.COMPLETED && isSolvable) {
              void saveCode(files, testCases);
            }
          }}
          centerButtons={({ runner: { testCases } = { testCases: {} }, files }) => {
            const buttons = [];
            if (!readOnly && isSolvable) {
              buttons.push(
                <ButtonLoader
                  key="save"
                  size="tiny"
                  onClick={() => saveCode(files, testCases)}
                  setLoaderStatusRef={(setLoaderStatus) => (setLoaderStatusRef.current = setLoaderStatus)}
                >
                  <T className="tt-se">save</T>
                </ButtonLoader>,
              );
            }
            buttons.push(
              <div className="jk-row bc-ht-lt jk-br-ie" key="buttons">
                <Div
                  className={classNames('clickable br-50-pc jk-row', { 'cr-ht': totalSubmissions === 0 })}
                  onClick={
                    totalSubmissions ? () => setSubmissionIndex((prevState) => (prevState + 1) % totalSubmissions) : undefined
                  }
                  onKeyDownClick
                >
                  <ArrowLeftIcon />
                </Div>
                {userResults?.isLoading ? (
                  <SpinIcon />
                ) : (
                  <>
                    {submissionIndex + 1}&nbsp;/&nbsp;{totalSubmissions}
                    <T>v.</T>
                  </>
                )}
                {/*{result.isValidating && <SpinIcon />}*/}
                <Div
                  className={classNames('clickable br-50-pc jk-row', { 'cr-ht': totalSubmissions === 0 })}
                  onClick={
                    totalSubmissions
                      ? () => setSubmissionIndex((prevState) => (prevState - 1 + totalSubmissions) % totalSubmissions)
                      : undefined
                  }
                  onKeyDownClick
                >
                  <ArrowRightIcon />
                </Div>
              </div>,
            );
            return <div className="jk-row gap">{Children.toArray(buttons)}</div>;
          }}
        />
      </div>
    </div>
  );
};
