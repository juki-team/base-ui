import { CODE_LANGUAGE } from '@juki-team/commons';
import { classNames } from '../../helpers';
import { Field, FieldText } from '../../organisms';
import { SubmissionMemory } from '../../organisms/SubmitView/commons/SubmissionMemory';
import { SubmissionTime } from '../../organisms/SubmitView/commons/SubmissionTime';
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
                                        hiddenVerdict,
                                        hiddenSubmission,
                                      }, isCard,
                                    }: SubmissionTimeFieldProps) {
  
  const hidden = hiddenVerdict || hiddenSubmission;
  
  const content = (
    <Field className={classNames('jk-row gap nowrap cr-g1', { 'fr-4': hidden })}>
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
  );
  
  return (
    isCard ? (
        hidden
          ? content
          : <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
            {content}
          </SubmissionInfo>
      ) :
      <FieldText
        text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />}
        label="time used"
        className={classNames({ 'fr-4': hidden })}
      />
  );
}
