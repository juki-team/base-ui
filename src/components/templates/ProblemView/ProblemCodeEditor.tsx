import {
  CodeEditorTestCasesType,
  ContentResponseType,
  Judge,
  JudgeResponseDTO,
  ProblemResponseDTO,
  PROGRAMMING_LANGUAGE,
  ProgrammingLanguage,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { jukiSettings } from '../../../config';
import { useFetcher, useJukiUser } from '../../../hooks';
import { UserCodeEditor, UserCodeEditorProps } from '../../organisms/UserCodeEditor';

interface ProblemCodeEditorProps<T> {
  problem: ProblemResponseDTO,
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
  const { company: { key: companyKey } } = useJukiUser();
  const { data: virtualJudgeData } = useFetcher<ContentResponseType<JudgeResponseDTO>>(
    [ Judge.CODEFORCES, Judge.JV_UMSA, Judge.CODEFORCES_GYM ].includes(problem.judge) ? jukiSettings.API.judge.get({
      params: {
        judge: problem.judge,
        companyKey,
      },
    }).url : null,
  );
  const languages = useMemo(
    () => {
      let languages: { value: ProgrammingLanguage | string, label: string }[] = [];
      if ([ Judge.CODEFORCES, Judge.JV_UMSA, Judge.CODEFORCES, Judge.CODEFORCES_GYM ].includes(problem.judge)) {
        languages = ((virtualJudgeData?.success && virtualJudgeData.content.languages) || [])
          .filter(lang => lang.enabled)
          .map(lang => ({
            value: lang.value,
            label: lang.label || lang.value,
          }));
      } else if (problem.judge === Judge.CUSTOMER || problem.judge === Judge.JUKI_JUDGE) {
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
    [ virtualJudgeData, problem.judge ],
  );
  
  return (
    <UserCodeEditor<T>
      languages={languages}
      sourceStoreKey={codeEditorSourceStoreKey}
      centerButtons={codeEditorCenterButtons}
      rightButtons={codeEditorRightButtons}
      initialTestCases={(problem.judge === Judge.JUKI_JUDGE || problem.judge === Judge.CUSTOMER)
        ? initialTestCases
        : undefined}
      enableAddCustomSampleCases
    />
  );
};
