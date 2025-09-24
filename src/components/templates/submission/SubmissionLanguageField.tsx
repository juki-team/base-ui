import { Field } from '../../organisms/DataViewer/Field';
import { SubmissionInfo } from './commons/SubmissionInfo';
import { SubmissionLanguageFieldProps } from './types';

export const SubmissionLanguageField = ({
                                          record: {
                                            submitId,
                                            user: { canViewSourceCode },
                                            language,
                                            problem: { judge: { key: judgeKey } },
                                          },
                                          isCard,
                                          languagesByJudge,
                                        }: SubmissionLanguageFieldProps) => (
  isCard
    ? null
    : <Field>
      <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
        <div className="jk-col extend">{languagesByJudge[judgeKey]?.languages[language]?.label || language}</div>
      </SubmissionInfo>
    </Field>
);
