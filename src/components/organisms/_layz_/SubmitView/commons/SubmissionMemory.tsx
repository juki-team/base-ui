import { ProblemVerdict } from '@juki-team/commons';
import { hasTimeHasMemory } from '../../../../../helpers/submission';
import { T } from '../../../../atoms';

export const SubmissionMemory = ({ verdict, memoryUsed }: { verdict: ProblemVerdict, memoryUsed: number }) => {
  return hasTimeHasMemory(verdict) ? <>{memoryUsed}&nbsp;<T className="cr-g3">KB</T></> : <>-</>;
};
