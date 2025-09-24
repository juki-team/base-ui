import {
  cleanRequest,
  CodeLanguage,
  ContentResponseType,
  ProblemDataResponseDTO,
  QuizProblemSheetType,
  QuizProblemSubmissionDTO,
  Status,
  WorksheetType,
} from '@juki-team/commons';
import { authorizedRequest } from '../../../../../helpers';
import { useJukiNotification } from '../../../../../hooks/useJukiNotification';
import { jukiApiManager } from '../../../../../settings';
import { T } from '../../../../atoms';
import { ButtonLoader, FetcherLayer, FirstLoginWrapper } from '../../../../molecules';
import { ProblemView } from '../../../../templates/ProblemView/ProblemView';

interface RunnerSheetSectionProps {
  content: QuizProblemSheetType,
  worksheetKey: string,
}

export const QuizProblemSheetSectionView = ({ content, worksheetKey }: RunnerSheetSectionProps) => {
  
  const { notifyResponse } = useJukiNotification();
  
  const validHeight = !Number.isNaN(+content.height) && +content.height > 0;
  
  return (
    <div
      className="jk-col nowrap gap wh-100"
      style={{
        maxHeight: validHeight ? `calc(${+content.height}px + var(--gap))` : 'calc(var(--100VH) - 300px)',
        height: validHeight ? `calc(${+content.height}px + var(--gap))` : 'calc(var(--100VH) * 0.6)',
      }}
    >
      <div
        className="jk-col nowrap stretch flex-1 gap wh-100"
        style={{
          height: '100%',
          // maxHeight: validHeight ? `calc(${+content.height}px + var(--gap))` : 'calc(var(--100VH) - 300px)',
          // height: validHeight ? `calc(${+content.height}px + var(--gap))` : 'calc(var(--100VH) * 0.6)',
        }}
      >
        <FetcherLayer<ContentResponseType<ProblemDataResponseDTO>>
          url={content.problemKey ? jukiApiManager.API_V1.problem.getData({ params: { key: content.problemKey } }).url : null}
        >
          {({ data }) => {
            return (
              <ProblemView<CodeLanguage>
                problem={data.content}
                infoPlacement="name"
                codeEditorStoreKey={`${worksheetKey}/${content.id}`}
                codeEditorCenterButtons={({ files, currentFileName }) => {
                  
                  const { source = '', language = CodeLanguage.TEXT } = files[currentFileName] || {};
                  
                  return [
                    <FirstLoginWrapper key="submit">
                      <ButtonLoader
                        size="small"
                        onClick={async setLoaderStatus => {
                          setLoaderStatus(Status.LOADING);
                          const quizProblem: QuizProblemSubmissionDTO = {
                            id: content.id,
                            type: WorksheetType.QUIZ_PROBLEM,
                            language,
                            source,
                          };
                          const {
                            url,
                            ...options
                          } = jukiApiManager.API_V1.worksheet.submitQuizProblem({
                            params: { worksheetKey },
                            body: quizProblem,
                          });
                          const response = cleanRequest<ContentResponseType<any>>(await authorizedRequest(url, options));
                          
                          notifyResponse(response, setLoaderStatus);
                        }}
                      >
                        <T className="tt-se">submit</T>
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
