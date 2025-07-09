// 'use client';
/*
import { UserBasicInterface } from 'types';
import {
  Button,
  ButtonLoader,
  Collapse,
  MdMathViewer,
  Modal,
  ProblemVerdictTag,
  T,
  UpIcon,
  UserCodeEditor,
  Tooltip,
  InfoIcon,
} from 'components';
import { JUDGE_API_V1, CODE_LANGUAGE } from 'config/constants';
import { authorizedRequest, cleanRequest, getHeight, getVerdictFromTestCase } from 'helpers';
import { useJukiRouter, useNotification, useStableState, useSWR, useState, useCallback } from 'hooks';
import { ReactNode } from 'react';
import {
  CodeEditorTestCaseType,
  ContentResponseType,
  HTTPMethod,
  CodeLanguage,
  QuizProblemSheetStatusProcessedType,
  QuizProblemSheetStatusType,
  QuizProblemSheetType,
  SheetType,
  SourceCodeType,
  Status,
  SubmissionRunStatus,
  UserCodeEditorProps,
} from 'types';

interface RunnerSheetSectionProps {
  sheet: QuizProblemSheetType,
  result?: QuizProblemSheetStatusProcessedType,
  userResult?: UserBasicInterface,
  isSolvable: boolean,
  showingResults: boolean,
  isSolving: boolean,
  isEditor: boolean,
  noteSheetKey: string,
}

export const QuizProblemSheetSectionView = ({
                                              sheet,
                                              result,
                                              userResult,
                                              isSolvable,
                                              isSolving,
                                              isEditor,
                                              showingResults,
                                              noteSheetKey,
                                            }: RunnerSheetSectionProps) => {
  
  const { routeParams } = useJukiRouter();
  const { mutate } = useSWR();
  const sheetId = routeParams.sheetId as string;
  const [ languageEditor, setLanguageEditor ] = useState(CodeLanguage.TEXT);
  const [ sourceCodes, setSourceCodes ] = useStableState<SourceCodeType>(result?.sourceCode ?? {} as SourceCodeType);
  const { notifyResponse } = useNotification();
  const onSourceChange = useCallback((sourceCode: string) => setSourceCodes(sourceCodes => ({
    ...sourceCodes,
    [languageEditor]: sourceCode,
  })), [ languageEditor, setSourceCodes ]);
  const [ modal, setModal ] = useState<ReactNode>(null);
  
  let middleButtons: UserCodeEditorProps<any>['middleButtons'] | undefined = undefined;
  if (isSolvable) {
    middleButtons = ({ testCases, isRunning }) => (
      <div>
        <ButtonLoader
          disabled={isRunning}
          size="tiny"
          type="secondary"
          onClick={async (setLoaderStatus) => {
            setLoaderStatus(Status.LOADING);
            const quizProblemSheetStatus: QuizProblemSheetStatusType = {
              id: sheet.id,
              type: SheetType.QUIZ_PROBLEM,
              sourceCode: sourceCodes,
              testCases,
            };
            const response = cleanRequest<ContentResponseType<{}>>(
              await authorizedRequest(
                JUDGE_API_V1.STATUS.SUBMIT_QUIZ_PROBLEM(isSolving ? undefined : userResult?.nickname),
                {
                  method: HTTPMethod.POST,
                  body: JSON.stringify({ worksheetId: sheetId, quizProblemSheetStatus }),
                },
              ),
            );
            void mutate(JUDGE_API_V1.STATUS.GET_RESULTS(noteSheetKey));
            notifyResponse(response, setLoaderStatus);
          }}
        >
          <div className="jk-row gap">
            <T>{isSolving ? 'submit' : 'rejudge'}</T>
            <Tooltip content={<T className="tt-se">first run the code</T>}>
              <div><InfoIcon /></div>
            </Tooltip>
          </div>
        </ButtonLoader>
      </div>
    );
  }
  
  const timeLimit = 1000;
  const memoryLimit = 512000;
  
  const sampleTestCases: CodeEditorTestCaseType[] = Object.values(result?.testCases ?? {}).filter(testCase => testCase.sample);
  
  
  const sheetTestCases = { ...sheet?.testCases };
  for (const key in sheetTestCases) {
    sheetTestCases[key] = {
      ...sheetTestCases[key],
      out: '',
      err: '',
      log: '',
      status: SubmissionRunStatus.NONE,
    };
  }
  const initialTestCases = result?.testCases || sheetTestCases;
  for (const key in initialTestCases) {
    initialTestCases[key] = {
      ...initialTestCases[key],
      in: sheetTestCases[key]?.in ?? initialTestCases[key].in ?? '',
    };
  }
  const languages = Object.keys(result?.sourceCode || {}) as CodeLanguage[];
  const points = <> / {sheet?.points} <T>{sheet?.points ? 'points' : 'point'}</T></>;
  
  return (
    <div className="jk-col stretch flex-1 gap" style={{ width: '100%' }}>
      {modal}
      {isSolvable && sheet.points && (
        result?.points ? (
          <div className="jk-tag bc-ss sheet-points">
            +{result?.points} <T>{result?.points ? 'points' : 'point'}</T>{points}
          </div>
        ) : (
          <div className="jk-tag bc-wg sheet-points">{0} <T>points</T>{points}</div>
        )
      )}
      <MdMathViewer source={sheet.title} />
      <div>
        <T className="tt-se fw-bd">description</T>:
        <MdMathViewer source={sheet.description} />
      </div>
      <div style={{ width: '100%' }}>
        <div><T className="tt-se fw-bd">code here</T>:</div>
        {showingResults && (
          <div className="jk-row gap left">
            {!result?.sourceCode?.[languageEditor] && (
              <div className="jk-tag bc-er tx-s"><T className="tt-se">no source code</T></div>
            )}
            {!result?.testCases && <div className="jk-tag bc-er tx-s"><T className="tt-se">no test cases</T></div>}
          </div>
        )}
        <div
          style={{ height: getHeight(sheet.height, sourceCodes[languageEditor]) }}
          className="jk-row"
        >
          <UserCodeEditor
            initialSource={sourceCodes}
            initialTestCases={result?.testCases || sheetTestCases}
            languages={sheet.languages.filter(language => showingResults ? languages.includes(language) : true).map(lang => ({
              value: lang,
              label: CODE_LANGUAGE[lang]?.label || lang,
            }))}
            onSourceChange={onSourceChange}
            onLanguageChange={setLanguageEditor}
            enableAddCustomSampleCases
            sourceStoreKey={isSolving ? sheet.id : undefined}
            middleButtons={middleButtons}
          />
        </div>
      </div>
      {isSolvable && (
        <div>
          <T className="tt-se fw-bd">results</T>:
          <div className="jk-br-ie" style={{ border: '1px solid var(--t-color-gray-5)' }}>
            <Collapse
              header={({ isOpen, toggle }) => {
                return (
                  <div className="jk-row extend nowrap space-between">
                    {!!result?.sampleTestCasesMerged ? (
                      <div className="jk-row left gap jk-pg-sm">
                        <div className="fw-bd"><T className="tt-se">total verdict</T></div>
                        <ProblemVerdictTag verdict={result?.sampleTestCasesMerged.verdict} />
                      </div>
                    ) : (
                      <div className="jk-row left gap jk-pg-sm">
                        <T className="tt-se">not resolved yet</T>
                      </div>
                    )}
                    <div className="jk-row collapse-toggle-button">
                      <UpIcon onClick={toggle} rotate={isOpen ? 0 : 180} className="link" />
                    </div>
                  </div>
                );
              }}
            >
              <div className="jk-col gap start stretch jk-pg-sm" style={{ padding: '--' }}>
                {sampleTestCases.map(testCase => {
                  const {
                    verdict,
                    timeUsed,
                    memoryUsed,
                  } = getVerdictFromTestCase(testCase, timeLimit, memoryLimit);
                  return (
                    <div
                      key={testCase.key}
                      className="jk-row left gap jk-br-ie"
                      style={{ border: '1px solid var(--t-color-gray-6)', padding: 'var(--pad-xt)' }}
                    >
                      <div className="fw-bd"><T className="tt-se">sample</T> {testCase.index + 1}</div>
                      <div>{timeUsed} s</div>
                      <div>{memoryUsed} KB</div>
                      <ProblemVerdictTag verdict={verdict} />
                      {isEditor && (
                        <Button
                          size="tiny"
                          type="light"
                          onClick={() => {
                            setModal(
                              <Modal onClose={() => setModal(null)} isOpen closeWhenClickOutside closeWhenKeyEscape>
                                <div className="jk-pg-md">
                                  <div className="jk-row-col">
                                    <div className="jk-col">
                                      <T>in</T>
                                      <span className="jk-text-stdout">{testCase.in}</span>
                                    </div>
                                    <div className="jk-col">
                                      <T>out</T>
                                      <span className="jk-text-stdout">{testCase.out}</span>
                                    </div>
                                    <div className="jk-col">
                                      <T>sample out</T>
                                      <span className="jk-text-stdout">{testCase.testOut}</span>
                                    </div>
                                  </div>
                                </div>
                              </Modal>,
                            );
                          }}
                        >
                          <T>show diff</T>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
};
*/
