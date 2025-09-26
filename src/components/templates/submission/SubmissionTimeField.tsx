import { CODE_LANGUAGE } from '@juki-team/commons';
import { Field, FieldText } from '../../organisms';
import { SubmissionMemory } from '../../organisms/_layz_/SubmissionModal/commons/SubmissionMemory';
import { SubmissionTime } from '../../organisms/_layz_/SubmissionModal/commons/SubmissionTime';
import { SubmissionInfo } from './commons/SubmissionInfo';
import type { SubmissionTimeFieldProps } from './types';

export function SubmissionTimeField({
                                      record: {
                                        timeUsed,
                                        submitId,
                                        user: { canViewSourceCode },
                                        language,
                                        verdict,
                                        memoryUsed,
                                      }, isCard,
                                    }: SubmissionTimeFieldProps) {
  return (
    isCard ? (
        <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
          <Field className="jk-row gap nowrap cr-g1">
            <FieldText
              text={<div className="jk-col extend">{CODE_LANGUAGE[language]?.label || language}</div>}
              label="language"
            />
            <FieldText
              text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />}
              label="time used"
            />
            <FieldText
              text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />}
              label="memory used"
            />
          </Field>
        </SubmissionInfo>
      ) :
      <FieldText text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />} label="time used" />
  );
}
