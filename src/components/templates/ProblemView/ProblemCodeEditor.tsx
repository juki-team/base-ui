import {
  CodeEditorTestCasesType,
  ContentResponseType,
  EXTERNAL_JUDGE_KEYS,
  JudgeResponseDataDTO,
  ProblemDataResponseDTO,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { jukiSettings } from '../../../config';
import { useFetcher } from '../../../hooks';
import { UserCodeEditor, UserCodeEditorProps } from '../../organisms/UserCodeEditor';

interface ProblemCodeEditorProps<T> {
  problem: ProblemDataResponseDTO,
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorRightButtons?: UserCodeEditorProps<T>['rightButtons'],
  codeEditorSourceStoreKey?: string,
}

export const ProblemCodeEditor = <T, >(props: ProblemCodeEditorProps<T>) => {
  
  const { problem, codeEditorCenterButtons, codeEditorRightButtons, codeEditorSourceStoreKey } = props;
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
    };
  });
  const { data: virtualJudgeData } = useFetcher<ContentResponseType<JudgeResponseDataDTO>>(
    EXTERNAL_JUDGE_KEYS.includes(problem.judgeKey) ? jukiSettings.API.judge.get({
      params: {
        key: problem.judgeKey,
      },
    }).url : null,
  );
  const languages = useMemo(
    () => {
      let languages: { value: ProgrammingLanguage | string, label: string }[] = [];
      if (EXTERNAL_JUDGE_KEYS.includes(problem.judgeKey)) {
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
    [ virtualJudgeData, problem.judgeKey ],
  );
  
  return (
    <UserCodeEditor<T>
      languages={languages}
      sourceStoreKey={codeEditorSourceStoreKey}
      centerButtons={codeEditorCenterButtons}
      rightButtons={codeEditorRightButtons}
      initialTestCases={!EXTERNAL_JUDGE_KEYS.includes(problem.judgeKey)
        ? initialTestCases
        : undefined}
      enableAddCustomSampleCases
    />
  );
};
