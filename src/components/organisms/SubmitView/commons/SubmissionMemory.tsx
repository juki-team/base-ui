import type { ProblemVerdict } from '@juki-team/commons';
import { T } from '../../../atoms';
import { hasTimeHasMemory } from '../../../helpers/submission';

export const SubmissionMemory = ({ verdict, memoryUsed }: { verdict: ProblemVerdict; memoryUsed: number }) => {
  return hasTimeHasMemory(verdict) ? (
    <>
      {memoryUsed}&nbsp;<T className="cr-tx-sc">KB</T>
    </>
  ) : (
    <>-</>
  );
};
