import type { ProblemVerdict } from '@juki-team/commons/enums';
import { T } from '../../../atoms/T/T.server';
import { hasTimeHasMemory } from '../../../helpers/submission';

export const SubmissionTime = ({ verdict, timeUsed }: { verdict: ProblemVerdict; timeUsed: number }) => {
  return hasTimeHasMemory(verdict) ? (
    <>
      {(timeUsed / 1000).toFixed(3)}&nbsp;<T className="cr-tx-sc">s</T>
    </>
  ) : (
    <>-</>
  );
};
