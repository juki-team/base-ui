import { CODE_LANGUAGE } from '@juki-team/commons';
import { Field } from '../../organisms/Field/Field';
import { FieldText } from '../../organisms/FieldText/FieldText';
import { SubmissionInfo } from './commons/SubmissionInfo';
import { SubmissionMemory } from './commons/SubmissionMemory';
import { SubmissionTime } from './commons/SubmissionTime';
import type { SubmissionTimeFieldProps } from './types';

export const SubmissionTimeField = ({
                                      record: {
                                        timeUsed,
                                        submitId,
                                        user: { canViewSourceCode },
                                        language,
                                        verdict,
                                        memoryUsed,
                                      }, isCard,
                                    }: SubmissionTimeFieldProps) => (
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
