import { splitTime } from '@juki-team/commons';

export const cutTimeSplit = (remaining: number, laps: number, ignoreLeadingZeros: boolean, ignoreTrailingZeros: boolean) => {
  let timeSplit = splitTime(Math.max(remaining, 0));
  while (timeSplit[0].remaining <= 0 && timeSplit.length > laps) {
    timeSplit.shift();
  }
  while (ignoreLeadingZeros && timeSplit.length && timeSplit[0].remaining === 0) {
    timeSplit.shift();
  }
  while (ignoreTrailingZeros && timeSplit.length && timeSplit[timeSplit.length - 1].remaining === 0) {
    timeSplit.pop();
  }
  return timeSplit.splice(0, laps);
};
