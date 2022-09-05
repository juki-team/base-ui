export enum Period {
  FUTURE = 'FUTURE',
  LIVE_START = 'LIVE_START',
  LIVE_END = 'LIVE_END',
  PAST = 'PAST',
  CALC = 'CALC',
  TIME_OUT = 'TIME_OUT'
}

export interface TimerLabeledProps {
  startDate: Date,
  endDate: Date,
  currentDate?: Date,
  labels?: { [key in Period]: string },
  laps?: number,
}

export interface TimerProps {
  currentTimestamp: number,
  laps?: number,
  interval?: number,
  literal?: boolean,
  ignoreLeadingZeros?: boolean,
}
