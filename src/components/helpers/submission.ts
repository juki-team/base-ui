import { ProblemVerdict } from '@juki-team/commons';

export const hasTimeHasMemory = (verdict: ProblemVerdict) => {
  return !(verdict === ProblemVerdict.CE
    || verdict === ProblemVerdict.HIDDEN
    || verdict === ProblemVerdict.NONE
    || verdict === ProblemVerdict.PENDING);
};
