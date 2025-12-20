import { DateLiteral, T } from '../../atoms';
import { classNames } from '../../helpers';
import { TimerDisplay } from '../../molecules';
import { Field } from '../../organisms';
import type { SubmissionDateFieldProps } from './types';

export function SubmissionDateField({
                                      record: { timestamp, contest },
                                      isCard,
                                    }: SubmissionDateFieldProps) {
  const label = 'date';
  const date = new Date(timestamp);
  const twoLines = !isCard;
  
  return (
    <Field className="jk-col center nowrap">
      <div className={classNames('date-field jk-col center')}>
        <DateLiteral date={date} twoLines={twoLines} />
        {contest?.settingsStartTimestamp && (
          <div className="jk-row tx-t cr-hd" style={{ lineHeight: 1 }}>
            <T className="tt-se">sent at</T>&nbsp;
            <TimerDisplay
              counter={timestamp - contest.settingsStartTimestamp}
              maxSplit={2}
              ignoreLeadingZeros
              ignoreTrailingZeros
              literal
              abbreviated
            />
          </div>
        )}
      </div>
      <div className="jk-row date-field-label cr-g3 tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </Field>
  );
}
