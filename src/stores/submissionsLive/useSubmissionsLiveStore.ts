import { type ProblemVerdict, SubmissionRunStatus, type TestInfo } from '@juki-team/commons';
import { create } from 'zustand';

export interface LiveSubmissionData {
  status: SubmissionRunStatus;
  verdict: ProblemVerdict;
  points: number;
  testInfo?: TestInfo;
  createdAt: number;
}

export interface LiveSubmission {
  judging: boolean;
  data: LiveSubmissionData;
  /** when the last accepted message arrived (client clock) */
  receivedAt: number;
}

// the messages can arrive out of order: a later stage never goes back to an earlier one
const priority = (isSample: boolean): Record<SubmissionRunStatus, number> => ({
  [SubmissionRunStatus.RECEIVED]: 0,
  [SubmissionRunStatus.COMPILING]: 1,
  [SubmissionRunStatus.COMPILED]: 2,
  [SubmissionRunStatus.COMPILATION_ERROR]: 3,
  [SubmissionRunStatus.RUNNING_SAMPLE_TEST_CASES]: 4,
  [SubmissionRunStatus.RUNNING_TEST_CASES]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.RUNNING_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.EXECUTED_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.FAILED_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.JUDGING_TEST_CASE]: 5 + (isSample ? 0 : 2),
  [SubmissionRunStatus.FETCHING_TEST_CASES]: 6,
  [SubmissionRunStatus.GRADING]: 8,
  [SubmissionRunStatus.FAILED]: 9,
  [SubmissionRunStatus.COMPLETED]: 10,
  [SubmissionRunStatus.NONE]: 10,
});

const SAMPLE_PRIORITY = priority(true);
const TEST_PRIORITY = priority(false);

const getPriority = ({ status, testInfo }: LiveSubmissionData) =>
  (testInfo?.sampleCase ? SAMPLE_PRIORITY : TEST_PRIORITY)[status];

export const isTerminalStatus = (status: SubmissionRunStatus) =>
  status === SubmissionRunStatus.COMPLETED || status === SubmissionRunStatus.FAILED;

const shouldReplace = (current: LiveSubmissionData, next: LiveSubmissionData) => {
  if (next.status === SubmissionRunStatus.RECEIVED) {
    // a new judging (rejudge) starts over, unless it is an old message arriving late
    return next.createdAt > current.createdAt;
  }
  const nextPriority = getPriority(next);
  const currentPriority = getPriority(current);
  return nextPriority > currentPriority || (nextPriority === currentPriority && next.createdAt > current.createdAt);
};

// Once finished, the list (revalidated meanwhile) is the source of truth again: an old entry would hide later changes.
const FINISHED_TTL = 30_000;
const MAX_ENTRIES = 1000;

const removalTimers = new Map<string, ReturnType<typeof setTimeout>>();

interface SubmissionsLiveState {
  entries: Record<string, LiveSubmission>;
  apply: (submitId: string, data: LiveSubmissionData) => void;
  remove: (submitId: string) => void;
}

/**
 * Live state of the submissions by submitId, fed by the websocket messages. It lives outside the cells so it survives
 * their unmounts (virtualized rows while scrolling, changing tabs) and is shared by every cell of a submission.
 */
export const useSubmissionsLiveStore = create<SubmissionsLiveState>((set, get) => ({
  entries: {},
  apply: (submitId, data) => {
    const current = get().entries[submitId];
    if (current && !shouldReplace(current.data, data)) {
      return;
    }
    const judging = !isTerminalStatus(data.status);
    clearTimeout(removalTimers.get(submitId));
    removalTimers.delete(submitId);
    if (!judging) {
      removalTimers.set(
        submitId,
        setTimeout(() => get().remove(submitId), FINISHED_TTL),
      );
    }
    set((state) => {
      const entries = { ...state.entries, [submitId]: { judging, data, receivedAt: Date.now() } };
      const ids = Object.keys(entries);
      if (ids.length > MAX_ENTRIES) {
        // submissions whose end never arrived (the rows on screen recover by themselves, see SubmissionListenerVerdict)
        ids
          .sort((a, b) => entries[a]!.receivedAt - entries[b]!.receivedAt)
          .slice(0, ids.length - MAX_ENTRIES)
          .forEach((id) => delete entries[id]);
      }
      return { entries };
    });
  },
  remove: (submitId) => {
    clearTimeout(removalTimers.get(submitId));
    removalTimers.delete(submitId);
    set((state) => {
      if (!state.entries[submitId]) {
        return state;
      }
      const { [submitId]: _removed, ...entries } = state.entries; // eslint-disable-line @typescript-eslint/no-unused-vars
      return { entries };
    });
  },
}));
