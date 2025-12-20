import { CODE_LANGUAGE } from '@juki-team/commons';
import { Field } from '../../organisms';
import { SubmissionInfo } from './commons/SubmissionInfo';
import type { SubmissionLanguageFieldProps } from './types';

export function SubmissionLanguageField({
                                          record: {
                                            submitId,
                                            user: { canViewSourceCode },
                                            language,
                                            problem: { judge: { key: judgeKey } },
                                            hiddenSubmission,
                                          },
                                          isCard,
                                          languagesByJudge,
                                        }: SubmissionLanguageFieldProps) {
  return (
    isCard
      ? null
      : <Field>
        {hiddenSubmission
          ? <div className="jk-col extend fr-4">
            {languagesByJudge[judgeKey]?.languages[language]?.label || CODE_LANGUAGE[language]?.label || language}
          </div>
          : <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
            <div className="jk-col extend link">
              {languagesByJudge[judgeKey]?.languages[language]?.label || CODE_LANGUAGE[language]?.label || language}
            </div>
          </SubmissionInfo>}
      </Field>
  );
}
