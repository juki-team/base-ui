import { T } from '../../../atoms/T/T.server';
import { DateLiteral } from '../../../atoms/server/DateLiteral/DateLiteral';
import { TimerDisplay } from '../../../molecules/server/TimerDisplay/TimerDisplay';
import type { SubmissionDateFieldProps } from '../../submission/types';

export function SubmissionDateField({ record: { timestamp, contest }, isCard }: SubmissionDateFieldProps) {
  const label = 'date';
  const date = new Date(timestamp);
  const twoLines = !isCard;

  return (
    <div className="jk-table-field jk-col center nowrap">
      <div className="date-field jk-col center">
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
      <div className="jk-row date-field-label cr-tx-sc tx-t">
        {typeof label === 'string' ? <T className="tt-se">{label}</T> : label}
      </div>
    </div>
  );
}
