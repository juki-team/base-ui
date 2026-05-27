import { CODE_LANGUAGE } from '@juki-team/commons/constants';
import { classNames } from '../../helpers/commons';
import { FieldText } from '../../organisms/FieldText/FieldText';
import { SubmissionMemory } from '../../organisms/server/SubmissionMemory/SubmissionMemory';
import { SubmissionTime } from '../../organisms/server/SubmissionTime/SubmissionTime';
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
  },
  isCard,
}: SubmissionTimeFieldProps) {
  const hidden = hiddenVerdict || hiddenSubmission;

  const content = (
    <div className={classNames('jk-table-field jk-row gap nowrap', { 'fr-4': hidden })}>
      <FieldText text={<div className="jk-col extend">{CODE_LANGUAGE[language]?.label || language}</div>} label="language" />
      <FieldText text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />} label="time used" />
      <FieldText text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />} label="memory used" />
    </div>
  );

  return isCard ? (
    hidden ? (
      content
    ) : (
      <SubmissionInfo submitId={submitId} canViewSourceCode={canViewSourceCode}>
        {content}
      </SubmissionInfo>
    )
  ) : (
    <FieldText
      text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />}
      label="time used"
      className={classNames({ 'fr-4': hidden })}
    />
  );
}
