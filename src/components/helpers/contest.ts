import { type ContestTimeData } from '@juki-team/commons';

export const getContestState = (contest: ContestTimeData) => {
  if (contest.isGlobal) {
    return { order: 0, label: 'global', bc: 'bc-io' };
  }
  if (contest.isEndless) {
    return { order: 1, label: 'endless', bc: 'bc-io' };
  }
  if (contest.isPast) {
    return { order: 2, label: 'past', bc: 'bc-g5' };
  }
  if (contest.isLive) {
    return { order: 3, label: 'live', bc: 'bc-er' };
  }
  if (contest.isFuture) {
    return { order: 4, label: 'upcoming', bc: 'bc-ss' };
  }
  return { order: 5, label: '-', bc: 'bc-g5' };
};
