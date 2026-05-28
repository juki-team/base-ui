import { CODE_LANGUAGE, JUKI_APP_ORGANIZATION_KEY, PROBLEM_MODE, PROBLEM_TYPE } from '@juki-team/commons/constants';
import { Language, ProblemScoringMode } from '@juki-team/commons/enums';
import type { ProblemSettings, ProblemStatement } from '@juki-team/commons/types';
import { isBrowser } from './commons';

type LangCode = Lowercase<keyof typeof Language>;
type Localized = Partial<Record<LangCode, string>>;

/**
 * Resolve a localized text field, falling back through preferred -> EN -> ES -> fallback.
 * @param {Localized | undefined} field The object keyed by language code
 * @param {Language} preferredLanguage The language to try first
 * @param {string} fallback Value returned when no language is present
 * @returns {string} The resolved text
 */
export const pickLanguage = (field: Localized | undefined, preferredLanguage: Language, fallback = ''): string => {
  return (
    field?.[preferredLanguage.toLowerCase() as LangCode] ||
    field?.[Language.EN.toLowerCase() as LangCode] ||
    field?.[Language.ES.toLowerCase() as LangCode] ||
    fallback
  );
};

export const getEditorSettingsStorageKey = (useNickname: string) => `jk-editor-settings-store/${useNickname}`;

export const getProblemsStoreKey = (useNickname: string) => `jk-problem-storage/${useNickname}`;

export const getSourcesStoreKey = (useNickname: string) => `jk-sources-storage/${useNickname}`;

export const getSettingsStoreKey = (useNickname: string) => `jk-code-editor-settings-storage/${useNickname}`;

export const getTestCasesStoreKey = (useNickname: string) => `jk-test-cases-storage/${useNickname}`;

export const getStatementData = (
  t: (key: string) => string,
  {
    statement,
    settings,
  }: {
    statement: ProblemStatement;
    settings: ProblemSettings;
  },
  preferredLanguage: Language,
  problemName: string,
) => {
  const statementDescription = pickLanguage(statement?.description, preferredLanguage).trim();
  const statementInput = pickLanguage(statement?.input, preferredLanguage).trim();
  const statementOutput = pickLanguage(statement?.output, preferredLanguage).trim();
  const statementNote = pickLanguage(statement?.note, preferredLanguage).trim();
  const statementSampleCases = statement?.sampleCases || [];
  const languages = Object.values(settings?.byProgrammingLanguage || {});

  const mdStatement = `
# \\textAlign=center ${problemName}

\\textAlign=center **${t('type')}:** ${PROBLEM_TYPE[settings?.type]?.label}, **${t('mode')}:** ${PROBLEM_MODE[settings?.scoringMode]?.label}

|${t('language')}|${t('time limit')}|${t('memory limit')}|
|--|--|--|
| ${t('general')} | ${(settings?.timeLimit / 1000).toFixed(1)} ${t('seconds')} | ${(settings?.memoryLimit / 1000).toFixed(
    1,
  )} ${t('MB')} |
${languages
  .map(
    (language) =>
      `| ${CODE_LANGUAGE[language.language]?.label} | ${(language?.timeLimit / 1000).toFixed(
        1,
      )} ${t('seconds')} | ${(language?.memoryLimit / 1000).toFixed(1)} ${t('MB')}|`,
  )
  .join('\n')}

# ${t('description')}

${statementDescription}

# ${t('input')}

${statementInput}

# ${t('output')}

${statementOutput}

# ${t('subtasks description')}

${
  settings.scoringMode === ProblemScoringMode.SUBTASK
    ? Object.values(settings.pointsByGroups)
        .map(
          (pointsByGroup) => `### ${t('group')} ${pointsByGroup.group} (${pointsByGroup.points} ${t('points')})

${pickLanguage(pointsByGroup.description, preferredLanguage)}
      `,
        )
        .join('\n')
    : ''
}

${statementSampleCases
  .map(
    (sample, index) => `### ${t('input sample')} ${index + 1}
\`\`\`
${sample.input}
\`\`\`
### ${t('output sample')} ${index + 1}
\`\`\`
${sample.output}
\`\`\`
`,
  )
  .join('')}

# ${t('note')}

${statementNote}
`;

  return {
    statementDescription,
    statementInput,
    statementOutput,
    statementNote,
    mdStatement,
    shouldViewPDF:
      statementDescription.trim() === '' &&
      statementInput.trim() === '' &&
      statementOutput.trim() === '' &&
      statementNote.trim() === '' &&
      !!pickLanguage(statement.pdfUrl, preferredLanguage),
  };
};

export const isJudgeWindowLocation = () => {
  return (
    isBrowser() &&
    (window.location.origin === 'https://judge.juki.app' ||
      window.location.origin.endsWith('.jukijudge.com') ||
      window.location.origin === 'http://localhost:3070')
  );
};

export const getJudgeOrigin = (organizationKey: string, userOrganizationKey?: string) => {
  if (isJudgeWindowLocation() || userOrganizationKey === organizationKey) {
    return '';
  }
  let origin = `https://${organizationKey}.jukijudge.com`;
  if (organizationKey === JUKI_APP_ORGANIZATION_KEY) {
    origin = 'https://judge.juki.app';
  }
  return origin;
};
