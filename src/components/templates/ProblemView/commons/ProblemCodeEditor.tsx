import {
  CODE_LANGUAGE,
  CodeEditorTestCasesType,
  CodeLanguage,
  ContentResponseType,
  JudgeDataResponseDTO,
  ProblemDataResponseDTO,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SubmissionRunStatus,
} from '@juki-team/commons';
import React, { useMemo } from 'react';
import { useFetcher } from '../../../../hooks/useFetcher';
import { jukiApiManager } from '../../../../settings';
import { UserCodeEditor } from '../../../organisms';
import { CodeEditorExpandPositionType, UserCodeEditorProps } from '../../../organisms/types';

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
    problem.judge.isExternal ? jukiApiManager.API_V1.judge.getData({
      params: {
        key: problem.judge.key,
      },
    }).url : null,
  );
  const languages = useMemo(
    () => {
      let languages: { value: CodeLanguage | string, label: string }[];
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
            label: CODE_LANGUAGE[language]?.label || language,
          }));
      }
      if (!languages.length) {
        languages = [ {
          value: CodeLanguage.TEXT,
          label: CODE_LANGUAGE[CodeLanguage.TEXT]?.label,
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
