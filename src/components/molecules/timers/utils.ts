import { splitTime } from '@juki-team/commons';
import { showOfTimeDisplayType } from '../../../helpers';
import { TimeDisplayType } from '../../types';

export const cutTimeSplit = (remaining: number, type: TimeDisplayType, ignoreLeadingZeros: boolean, ignoreTrailingZeros: boolean) => {
  const timeSplit = splitTime(Math.max(remaining, 0));
  const { showWeeks, showDays, showHours, showMinutes, showSeconds, showMilliseconds } = showOfTimeDisplayType(type);
  if (!showWeeks) {
    timeSplit[1].remaining += (timeSplit[0].milliseconds * timeSplit[0].remaining) / timeSplit[1].milliseconds;
    timeSplit[1].label = timeSplit[1].remaining === 1 ? 'day' : 'days';
    timeSplit.shift();
    if (!showDays) {
      timeSplit[1].remaining += (timeSplit[0].milliseconds * timeSplit[0].remaining) / timeSplit[1].milliseconds;
      timeSplit[1].label = timeSplit[1].remaining === 1 ? 'hour' : 'hours';
      timeSplit.shift();
      if (!showHours) {
        timeSplit[1].remaining += (timeSplit[0].milliseconds * timeSplit[0].remaining) / timeSplit[1].milliseconds;
        timeSplit[1].label = timeSplit[1].remaining === 1 ? 'minute' : 'minutes';
        timeSplit.shift();
        if (!showMinutes) {
          timeSplit[1].remaining += (timeSplit[0].milliseconds * timeSplit[0].remaining) / timeSplit[1].milliseconds;
          timeSplit[1].label = timeSplit[1].remaining === 1 ? 'second' : 'seconds';
          timeSplit.shift();
          
          if (!showSeconds) {
            timeSplit[1].remaining += (timeSplit[0].milliseconds * timeSplit[0].remaining) / timeSplit[1].milliseconds;
            timeSplit[1].label = timeSplit[1].remaining === 1 ? 'millisecond' : 'milliseconds';
            timeSplit.shift();
          }
        }
      }
    }
  }
  if (!showMilliseconds) {
    timeSplit.pop();
    if (!showSeconds) {
      timeSplit.pop();
      if (!showMinutes) {
        timeSplit.pop();
        if (!showHours) {
          timeSplit.pop();
          if (!showDays) {
            timeSplit.pop();
          }
        }
      }
    }
  }
  
  while (ignoreLeadingZeros && timeSplit.length && timeSplit[0].remaining === 0) {
    timeSplit.shift();
  }
  while (ignoreTrailingZeros && timeSplit.length && timeSplit[timeSplit.length - 1]?.remaining === 0) {
    timeSplit.pop();
  }
  return timeSplit;
};
