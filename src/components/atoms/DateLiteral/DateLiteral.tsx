import { DAY_NAMES, MONTH_NAMES } from '@juki-team/commons';
import { classNames, showOfDateDisplayType } from '../../helpers';
import { T } from '../T/T';
import type { DateLiteralProps } from './types';

export function DateLiteral(props: DateLiteralProps) {
  
  const {
    date,
    className,
    show = 'year-month-day-hours-minutes-seconds',
    twoLines,
    withDayName,
    style,
  } = props;
  
  const {
    showYears,
    showMonths,
    showDays,
    showHours,
    showMinutes,
    showSeconds,
    showMilliseconds,
  } = showOfDateDisplayType(show);
  
  return (
    <div
      className={classNames('date-literal jk-br-ie', {
        'jk-row gap nowrap center': !twoLines,
        'jk-col nowrap center': !!twoLines,
      }, className)}
      style={style}
    >
      <div>
        {withDayName && <><T>{DAY_NAMES[date.getDay()] ?? date.getDay().toString()}</T>,&nbsp;</>}
        {showDays && <>{date.getDate()}&nbsp;</>}
        {showMonths && <><T>{MONTH_NAMES[date.getMonth()] ?? date.getMonth().toString()}</T>&nbsp;</>}
        {showYears && date.getFullYear()}
      </div>
      {showHours && (
        <div className="cr-g3">
          {date.getHours().padStart(2)}
          {showMinutes && <>:{date.getMinutes().padStart(2)}</>}
          {showSeconds && <>:{date.getSeconds().padStart(2)}</>}
          {showMilliseconds && <>.{date.getMilliseconds().padStart(3)}</>}
        </div>
      )}
    </div>
  );
}
