import { DAY_NAMES, MONTH_NAMES } from '@juki-team/commons/constants';
import { padStart } from '@juki-team/commons/helpers';
import { classNames, showOfDateDisplayType } from '../../helpers';
import { T } from '../T/T';
import type { DateLiteralProps } from './types';

export function DateLiteral(props: DateLiteralProps) {
  const { date, className, show = 'year-month-day-hours-minutes-seconds', twoLines, withDayName, style } = props;

  const { showYears, showMonths, showDays, showHours, showMinutes, showSeconds, showMilliseconds } =
    showOfDateDisplayType(show);

  return (
    <div
      className={classNames(
        'date-literal jk-br-ie',
        {
          'jk-row gap nowrap center': !twoLines,
          'jk-col nowrap center': !!twoLines,
        },
        className,
      )}
      style={style}
    >
      <div>
        {withDayName && (
          <>
            <T>{DAY_NAMES[date.getDay()] ?? date.getDay().toString()}</T>,&nbsp;
          </>
        )}
        {showDays && <>{date.getDate()}&nbsp;</>}
        {showMonths && (
          <>
            <T>{MONTH_NAMES[date.getMonth()] ?? date.getMonth().toString()}</T>&nbsp;
          </>
        )}
        {showYears && date.getFullYear()}
      </div>
      {showHours && (
        <div className="cr-tx-sc">
          {padStart(date.getHours(), 2)}
          {showMinutes && <>:{padStart(date.getMinutes(), 2)}</>}
          {showSeconds && <>:{padStart(date.getSeconds(), 2)}</>}
          {showMilliseconds && <>.{padStart(date.getMilliseconds(), 3)}</>}
        </div>
      )}
    </div>
  );
}
