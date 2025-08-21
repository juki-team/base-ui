import {
  CODE_LANGUAGE,
  JUKI_APP_COMPANY_KEY,
  Language,
  PROBLEM_MODE,
  PROBLEM_TYPE,
  ProblemScoringMode,
  ProblemSettingsType,
  ProblemStatementType,
} from '@juki-team/commons';
import { TFunction } from 'i18next';

export const getEditorSettingsStorageKey = (useNickname: string) => `jk-editor-settings-store/${useNickname}`;

export const getProblemsStoreKey = (useNickname: string) => `jk-problem-storage/${useNickname}`;

export const getSourcesStoreKey = (useNickname: string) => `jk-sources-storage/${useNickname}`;

export const getTestCasesStoreKey = (useNickname: string) => `jk-test-cases-storage/${useNickname}`;

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

\\textAlign=center **${t('type')}:** ${PROBLEM_TYPE[settings?.type]?.label}, **${t('mode')}:** ${PROBLEM_MODE[settings?.scoringMode]?.label}

|${t('language')}|${t('time limit')}|${t('memory limit')}|
|--|--|--|
| ${t('general')} | ${(settings?.timeLimit / 1000).toFixed(1)} ${t('seconds')} | ${(settings?.memoryLimit /
    1000).toFixed(1)} ${t('MB')} |
${languages.map((language) => (
    `| ${CODE_LANGUAGE[language.language]?.label} | ${(language?.timeLimit /
      1000).toFixed(1)} ${t('seconds')} | ${(language?.memoryLimit / 1000).toFixed(1)} ${t('MB')}|`
  )).join('\n')}

# ${t('description')}

${statementDescription}

# ${t('input')}

${statementInput}

# ${t('output')}

${statementOutput}

# ${t('subtasks description')}

${settings.scoringMode === ProblemScoringMode.SUBTASK
    ? Object.values(settings.pointsByGroups).map((pointsByGroup) => (
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
    shouldViewPDF: statementDescription.trim() === ''
      && statementInput.trim() === ''
      && statementOutput.trim() === ''
      && statementNote.trim() === '' && (!!statement.pdfUrl[Language.ES] || !!statement.pdfUrl[Language.EN]),
  };
};

export const isJudgeWindowLocation = () => {
  return typeof window !== 'undefined' && (
    window.location.origin === 'https://judge.juki.app'
    || window.location.origin.endsWith('.jukijudge.com')
    || window.location.origin === 'http://localhost:3070'
  );
};

export const getJudgeOrigin = (companyKey: string, userCompanyKey?: string) => {
  if (isJudgeWindowLocation() || userCompanyKey === companyKey) {
    return '';
  }
  let origin = `https://${companyKey}.jukijudge.com`;
  if (companyKey === JUKI_APP_COMPANY_KEY) {
    origin = 'https://judge.juki.app';
  }
  return origin;
};
