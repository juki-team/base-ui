export enum Period {
  FUTURE = 'future',
  LIVE = 'live',
  PAST = 'past',
  CALC = 'calc',
}

export interface TimerClockProps {
  startDate: Date,
  endDate: Date,
  currentDate?: Date,
  onFinish?: () => void,
  labels?: { [key in Period]: string },
  laps?: number,
}
