import { getDays, getHours, getMinutes, getMonths, getYears, ONE_DAY } from '@juki-team/commons';
import { useState } from 'react';
import { DateLiteral } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { TimePicker } from '../TimePicker/TimePicker';
import { InputDate } from './InputDate';

export default {
  component: InputDate,
};

const startsAt = new Date(Date.now() - ONE_DAY);
const endsAt = new Date();

export const DatePicker = () => {
  const [ date, setDate ] = useState(new Date());
  
  console.info({ startsAt, endsAt });
  
  return (
    <MockupJukiProvider>
      <div className="jk-col gap nowrap jk-pg-lg" style={{ height: '100%', overflow: 'auto' }}>
        <TimePicker
          date={new Date()}
          onChange={(...props) => console.info(props)}
          showMinutes={true}
          showSeconds={true}
          showMilliseconds={true}
          // isSelected={isSelected}
          // isDisabled={isDisabled}
        />
        <div className="jk-divider" />
        <InputDate
          type="year-month-day-hours-minutes-seconds-milliseconds"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          // isSelected={() => ({})}
          isSelected={(date) => ({
            year: getYears(date) >= getYears(startsAt) && getYears(date) <= getYears(endsAt),
            month: getMonths(date) >= getMonths(startsAt) && getMonths(date) <= getMonths(endsAt),
            day: getDays(date) >= getDays(startsAt) && getDays(date) <= getDays(endsAt),
            hours: getHours(date) >= getHours(startsAt) && getHours(date) <= getHours(endsAt),
            minutes: getMinutes(date) >= getMinutes(startsAt) && getMinutes(date) <= getMinutes(endsAt),
          })}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          extend
          onDateClean={() => null}
          todayButton
        />
        <div className="jk-divider" />
        <InputDate
          type="year-month-day-hours-minutes-seconds-milliseconds"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          extend
          todayButton
        />
        <div className="jk-divider" />
        <InputDate
          type="year-month-day-hours-minutes-seconds-milliseconds"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          extend
          todayButton
        />
        <div className="jk-divider" />
        <InputDate
          type="year-month-day-hours-minutes-seconds-milliseconds"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          inline
        />
        <div className="jk-divider">year-month-day-hours</div>
        <InputDate
          type="year-month-day-hours"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          inline
        />
        <div className="jk-divider">year-month-day</div>
        <InputDate
          type="year-month-day"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          inline
        />
        <div className="jk-divider">year-month</div>
        <InputDate
          type="year-month"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          inline
        />
        <div className="jk-divider">year</div>
        <InputDate
          type="year"
          date={date}
          // onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
          isDisabled={() => ({})}
          isSelected={() => ({})}
          baseDate={date}
          onDatePick={(date) => setDate(date)}
          twoLines
          inline
        />
        <div className="jk-divider" />
        <DateLiteral
          date={date}
          twoLines={false}
          show="year-month-day-hours-minutes-seconds-milliseconds"
          withDayName={true}
        />
      </div>
    </MockupJukiProvider>
  );
};
