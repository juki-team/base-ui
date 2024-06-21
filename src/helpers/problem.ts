import {
  Judge,
  Language,
  PROBLEM_MODE,
  PROBLEM_TYPE,
  ProblemScoringMode,
  ProblemSettingsType,
  ProblemStatementType,
  PROGRAMMING_LANGUAGE,
} from '@juki-team/commons';
import { TFunction } from 'i18next';

export const getProblemUrl = (judge: Judge, key: string) => {
  if (judge === Judge.JUKI_JUDGE) {
    return `/problem/view/${key}`;
  }
  return '#';
};

export const getEditorSettingsStorageKey = (useNickname: string) => `jk-editor-settings-store/${useNickname}`;

export const getProblemsStoreKey = (useNickname: string) => `jk-problem-storage/${useNickname}`;

export const getSourcesStoreKey = (useNickname: string) => `jk-sources-storage/${useNickname}`;

export const getStatementData = (t: TFunction,
                                 { statement, settings }: {
                                   statement: ProblemStatementType,
                                   settings: ProblemSettingsType
                                 }, preferredLanguage: Language, problemName: string) => {
  
  
  const statementDescription = (statement?.description?.[preferredLanguage] ||
    statement?.description?.[Language.EN] ||
    statement?.description?.[Language.ES] ||
    '').trim();
  const statementInput = (statement?.input[preferredLanguage] ||
    statement?.input[Language.EN] ||
    statement?.input[Language.ES] ||
    '').trim();
  const statementOutput = (statement?.output[preferredLanguage] ||
    statement?.output[Language.EN] ||
    statement?.output[Language.ES] ||
    '').trim();
  const statementNote = (statement?.note?.[preferredLanguage] ||
    statement?.note?.[Language.EN] ||
    statement?.note?.[Language.ES] ||
    '').trim();
  const statementSampleCases = statement?.sampleCases || [];
  const languages = Object.values(settings?.byProgrammingLanguage || {});
  
  const mdStatement = `
# \\textAlign=center ${problemName}

\\textAlign=center **${t('type')}:** ${PROBLEM_TYPE[settings?.type]?.label}, **${t('mode')}:** ${PROBLEM_MODE[settings?.mode]?.label}

|${t('language')}|${t('time limit')}|${t('memory limit')}|
|--|--|--|
| ${t('general')} | ${(settings?.timeLimit / 1000).toFixed(1)} ${t('seconds')} | ${(settings?.memoryLimit /
    1000).toFixed(1)} ${t('MB')} |
${languages.map((language) => (
    `| ${PROGRAMMING_LANGUAGE[language.language]?.label} | ${(language?.timeLimit /
      1000).toFixed(1)} ${t('seconds')} | ${(language?.memoryLimit / 1000).toFixed(1)} ${t('MB')}|`
  )).join('\n')}

# ${t('description')}

${statementDescription}

# ${t('input')}

${statementInput}

# ${t('output')}

${statementOutput}

# ${t('subtasks description')}

${settings.mode === ProblemScoringMode.SUBTASK
    ? Object.values(settings.pointsByGroups).map((pointsByGroup, index) => (
      `### ${t('group')} ${pointsByGroup.group} (${pointsByGroup.points} ${t('points')})

${pointsByGroup.description?.[preferredLanguage]}
      `
    )).join('\n') : ''}

${statementSampleCases.map((sample, index) => (
    `### ${t('input sample')} ${index + 1}
\`\`\`
${sample.input}
\`\`\`
### ${t('output sample')} ${index + 1}
\`\`\`
${sample.output}
\`\`\`
`)).join('')}

# ${t('note')}

${statementNote}
`;
  
  return {
    statementDescription,
    statementInput,
    statementOutput,
    statementNote,
    mdStatement,
  };
};
