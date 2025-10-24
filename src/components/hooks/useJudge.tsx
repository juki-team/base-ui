import {
  CODE_LANGUAGE,
  CodeLanguage,
  type ContentResponseType,
  type JudgeDataResponseDTO,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
} from '@juki-team/commons';
import { ReactNode, useMemo } from 'react';
import { jukiApiManager } from '../../settings';
import { useFetcher } from './useFetcher';

export const useJudge = <T, >({ key, isExternal }: { key: string, isExternal: boolean }, validLanguages: {
  value: T,
  label: ReactNode
}[]) => {
  
  const { data: virtualJudgeData } = useFetcher<ContentResponseType<JudgeDataResponseDTO>>(
    isExternal
      ? jukiApiManager.API_V1.judge.getData({ params: { key } }).url
      : null,
  );
  
  const languagesValuesString = JSON.stringify(validLanguages.map(({ value }) => value));
  
  const languages = useMemo(
    () => {
      const validLanguages = (JSON.parse(languagesValuesString) || []) as T[];
      let languages: { value: CodeLanguage | string, label: ReactNode }[];
      let judgeLanguages: { value: CodeLanguage | string, label: ReactNode }[];
      if (isExternal) {
        judgeLanguages = ((virtualJudgeData?.success && virtualJudgeData.content.languages) || [])
          .filter(lang => lang.enabled)
          .map(lang => ({
            value: lang.value,
            label: lang.label || lang.value,
          }));
      } else {
        judgeLanguages = RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES
          .map((language) => {
            const label = CODE_LANGUAGE[language]?.label || language;
            const [ first, ...restParts ] = label.split(' ');
            const rest = restParts.join(' ');
            return {
              value: language,
              label: <div className="jk-row left">{first}&nbsp;<span className="cr-g4 fw-lt">{rest}</span></div>,
            };
          });
      }
      languages = [ ...judgeLanguages ];
      if (!languages.length) {
        languages = [ {
          value: CodeLanguage.TEXT,
          label: CODE_LANGUAGE[CodeLanguage.TEXT]?.label,
        } ];
      }
      
      if (validLanguages?.length > 0) {
        languages = languages.filter(({ value }) => validLanguages.includes(value as T));
      }
      
      return {
        languages: languages as { value: T, label: ReactNode }[],
        judgeLanguages: judgeLanguages as { value: T, label: ReactNode }[],
      };
    },
    [ languagesValuesString, isExternal, virtualJudgeData ],
  );
  
  return {
    virtualJudgeData,
    ...languages,
  };
};
