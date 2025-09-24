import { CODE_LANGUAGE } from '@juki-team/commons';
import { Field } from '../../organisms/DataViewer/Field';
import { TextField } from '../../organisms/DataViewer/TextField';
import { SubmissionInfo } from './commons/SubmissionInfo';
import { SubmissionMemory } from './commons/SubmissionMemory';
import { SubmissionTime } from './commons/SubmissionTime';
import { SubmissionTimeFieldProps } from './types';

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
          <TextField
            text={<div className="jk-col extend">{CODE_LANGUAGE[language]?.label || language}</div>}
            label="language"
          />
          <TextField
            text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />}
            label="time used"
          />
          <TextField
            text={<SubmissionMemory memoryUsed={memoryUsed} verdict={verdict} />}
            label="memory used"
          />
        </Field>
      </SubmissionInfo>
    ) :
    <TextField text={<SubmissionTime timeUsed={timeUsed} verdict={verdict} />} label="time used" />
);
