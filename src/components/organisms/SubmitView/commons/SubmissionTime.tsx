import { ProblemVerdict } from '@juki-team/commons';
import { T } from '../../../atoms';
import { hasTimeHasMemory } from '../../../helpers/submission';

export const SubmissionTime = ({ verdict, timeUsed }: { verdict: ProblemVerdict, timeUsed: number }) => {
  return hasTimeHasMemory(verdict) ? <>{(timeUsed / 1000).toFixed(3)}&nbsp;<T className="cr-g3">s</T></> : <>-</>;
};
