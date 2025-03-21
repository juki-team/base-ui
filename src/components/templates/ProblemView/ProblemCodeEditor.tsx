import {
  CodeEditorTestCasesType,
  ContentResponseType,
  JudgeDataResponseDTO,
  ProblemDataResponseDTO,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useFetcher } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { CodeEditorExpandPositionType, UserCodeEditor, UserCodeEditorProps } from '../../organisms';

interface ProblemCodeEditorProps<T> {
  problem: ProblemDataResponseDTO,
  codeEditorLeftButtons?: UserCodeEditorProps<T>['leftButtons'],
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorRightButtons?: UserCodeEditorProps<T>['rightButtons'],
  codeEditorStoreKey: string,
  expandPosition?: CodeEditorExpandPositionType,
}

export const ProblemCodeEditor = <T, >(props: ProblemCodeEditorProps<T>) => {
  
  const {
    problem,
    codeEditorLeftButtons,
    codeEditorCenterButtons,
    codeEditorRightButtons,
    codeEditorStoreKey,
    expandPosition,
  } = props;
  
  const initialTestCases: CodeEditorTestCasesType = {};
  problem.statement.sampleCases?.forEach((sample, index) => {
    const key = 'sample-' + index;
    initialTestCases[key] = {
      key,
      log: '',
      sample: true,
      status: SubmissionRunStatus.NONE,
      err: '',
      out: '',
      index,
      in: sample.input,
      withPE: problem.settings.withPE,
      testOut: sample.output,
      hidden: false,
      messageTimestamp: 0,
    };
  });
  const { data: virtualJudgeData } = useFetcher<ContentResponseType<JudgeDataResponseDTO>>(
    problem.judge.isExternal ? jukiApiSocketManager.API_V1.judge.getData({
      params: {
        key: problem.judge.key,
      },
    }).url : null,
  );
  const languages = useMemo(
    () => {
      let languages: { value: ProgrammingLanguage | string, label: string }[] = [];
      if (problem.judge.isExternal) {
        languages = ((virtualJudgeData?.success && virtualJudgeData.content.languages) || [])
          .filter(lang => lang.enabled)
          .map(lang => ({
            value: lang.value,
            label: lang.label || lang.value,
          }));
      } else {
        languages = RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES
          .map((language) => ({
            value: language,
            label: PROGRAMMING_LANGUAGE[language]?.label || language,
          }));
      }
      if (!languages.length) {
        languages = [ {
          value: ProgrammingLanguage.TEXT,
          label: PROGRAMMING_LANGUAGE[ProgrammingLanguage.TEXT]?.label,
        } ];
      }
      return languages as { value: T, label: string }[];
    },
    [ virtualJudgeData, problem.judge.isExternal ],
  );
  
  return (
    <UserCodeEditor<T>
      languages={languages}
      storeKey={codeEditorStoreKey}
      leftButtons={codeEditorLeftButtons}
      centerButtons={codeEditorCenterButtons}
      rightButtons={codeEditorRightButtons}
      initialTestCases={!problem.judge.isExternal
        ? initialTestCases
        : undefined}
      enableAddCustomSampleCases={!problem.judge.isExternal}
      expandPosition={expandPosition}
      withoutRunCodeButton={problem.judge.isExternal}
      onlyCodeEditor={problem.judge.isExternal}
    />
  );
};
