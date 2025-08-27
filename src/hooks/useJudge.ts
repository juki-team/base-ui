import {
  CODE_LANGUAGE,
  CodeLanguage,
  ContentResponseType,
  JudgeDataResponseDTO,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
} from '@juki-team/commons';
import { useMemo } from 'react';
import { jukiApiManager } from '../settings';
import { useFetcher } from './useFetcher';

export const useJudge = <T, >({ key, isExternal }: { key: string, isExternal: boolean }) => {
  
  const { data: virtualJudgeData } = useFetcher<ContentResponseType<JudgeDataResponseDTO>>(
    isExternal
      ? jukiApiManager.API_V1.judge.getData({ params: { key } }).url
      : null,
  );
  
  const languages = useMemo(
    () => {
      let languages: { value: CodeLanguage | string, label: string }[];
      let judgeLanguages: { value: CodeLanguage | string, label: string }[];
      if (isExternal) {
        judgeLanguages = ((virtualJudgeData?.success && virtualJudgeData.content.languages) || [])
          .filter(lang => lang.enabled)
          .map(lang => ({
            value: lang.value,
            label: lang.label || lang.value,
          }));
      } else {
        judgeLanguages = RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES
          .map((language) => ({
            value: language,
            label: CODE_LANGUAGE[language]?.label || language,
          }));
      }
      languages = [ ...judgeLanguages ];
      if (!languages.length) {
        languages = [ {
          value: CodeLanguage.TEXT,
          label: CODE_LANGUAGE[CodeLanguage.TEXT]?.label,
        } ];
      }
      
      return {
        languages: languages as { value: T, label: string }[],
        judgeLanguages: judgeLanguages as { value: T, label: string }[],
      };
    },
    [ virtualJudgeData, isExternal ],
  );
  
  return {
    virtualJudgeData,
    ...languages,
  };
};
