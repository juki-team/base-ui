import {
  cleanRequest,
  ContentResponseType,
  ProblemDataResponseDTO,
  ProgrammingLanguage,
  QuizProblemSheetType,
  QuizProblemSubmissionDTO,
  QuizProblemSubmissionResponseDTO,
  Status,
  UserBasicInterface,
  WorksheetType,
} from '@juki-team/commons';
import React from 'react';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks';
import { jukiApiSocketManager } from '../../../../../settings';
import { T } from '../../../../atoms';
import { ButtonLoader, FetcherLayer, FirstLoginWrapper } from '../../../../molecules';
import { ProblemView } from '../../../../templates/ProblemView/ProblemView';

interface RunnerSheetSectionProps {
  sheet: QuizProblemSheetType,
  result?: QuizProblemSubmissionResponseDTO,
  userResult?: UserBasicInterface,
  isSolvable: boolean,
  showingResults: boolean,
  isSolving: boolean,
  isEditor: boolean,
  worksheetKey: string,
}

export const QuizProblemSheetSectionView = ({
                                              sheet,
                                              result,
                                              userResult,
                                              isSolvable,
                                              isSolving,
                                              isEditor,
                                              showingResults,
                                              worksheetKey,
                                            }: RunnerSheetSectionProps) => {
  
  const { notifyResponse } = useJukiNotification();
  
  return (
    <div className="jk-col stretch flex-1 gap" style={{ width: '100%' }}>
      <div style={{ maxHeight: sheet.height === 0 ? 'calc(var(--100VH) - 300px)' : sheet.height }}>
        <FetcherLayer<ContentResponseType<ProblemDataResponseDTO>>
          url={sheet.problemKey ? jukiApiSocketManager.API_V1.problem.getData({ params: { key: sheet.problemKey } }).url : null}
        >
          {({ data }) => {
            return (
              <ProblemView<ProgrammingLanguage>
                problem={data.content}
                infoPlacement="name"
                codeEditorStoreKey={`${worksheetKey}/${sheet.id}`}
                codeEditorCenterButtons={({ sourceCode, language }) => {
                  return [
                    <FirstLoginWrapper key="submit">
                      <ButtonLoader
                        onClick={async setLoaderStatus => {
                          setLoaderStatus(Status.LOADING);
                          const quizProblem: QuizProblemSubmissionDTO = {
                            id: sheet.id,
                            type: WorksheetType.QUIZ_PROBLEM,
                            language,
                            source: sourceCode,
                          };
                          const {
                            url,
                            ...options
                          } = jukiApiSocketManager.API_V1.worksheet.submitQuizProblem({
                            params: { worksheetKey },
                            body: quizProblem,
                          });
                          const response = cleanRequest<ContentResponseType<any>>(await authorizedRequest(url, options));
                          
                          notifyResponse(response, setLoaderStatus);
                        }}
                      >
                        <T>submit</T>
                      </ButtonLoader>
                    </FirstLoginWrapper>,
                  ];
                }}
              />
            );
          }}
        </FetcherLayer>
      </div>
    </div>
  );
};
