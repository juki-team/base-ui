import {
  isSubmissionJudgingWebSocketResponseEventDto,
  isSubmissionsJudgingScope,
  type SubmissionsJudgingScope,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { useCallback, useEffect, useRef } from 'react';
import { JUKI_SERVICE_V2_URL } from '../../constants/settings';
import { useSubmissionsLiveStore } from '../../stores/submissionsLive/useSubmissionsLiveStore';
import { useMatchMutate } from './useMatchMutate';
import { useSubscribe } from './useSubscribe';

const REVALIDATE_DELAY = 500;

let revalidateTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * One shared, debounced revalidation of the submissions lists: several submissions finishing at the same time
 * (every cell of a table) produce one refetch instead of one per cell.
 */
export const useRevalidateSubmissions = () => {
  const mutate = useMatchMutate();
  const mutateRef = useRef(mutate);
  mutateRef.current = mutate;
  return useCallback(() => {
    clearTimeout(revalidateTimer);
    revalidateTimer = setTimeout(() => {
      void mutateRef.current(new RegExp(`${JUKI_SERVICE_V2_URL}/submission`));
    }, REVALIDATE_DELAY);
  }, []);
};

// the contest channels don't rewind: a judging started before the attach is recovered by refetching the list once
const CONTEST_ATTACH_DELAY = 3000;

/**
 * Listens to the judging start/end of the submissions of a table (one channel per table): the cells on screen attach
 * the case by case channel only while their submission is being judged, also when it is rejudged from another screen.
 * The scope is a problem, a contest or a user: the channel and who can use it are decided by commons and the API.
 */
export const useSubmissionsJudging = (scope: SubmissionsJudgingScope) => {
  const apply = useSubmissionsLiveStore((store) => store.apply);
  const revalidate = useRevalidateSubmissions();

  useSubscribe(
    { event: WebSocketSubscriptionEvent.SUBSCRIBE_SUBMISSIONS_JUDGING, ...scope },
    (data) => {
      if (isSubmissionJudgingWebSocketResponseEventDto(data)) {
        const { status, verdict, points, createdAt } = data;
        apply(data.submitId, { status, verdict, points, createdAt });
      }
    },
    () => isSubmissionsJudgingScope(scope),
  );

  const contestKey = 'contestKey' in scope ? scope.contestKey : '';
  useEffect(() => {
    if (!contestKey) {
      return;
    }
    const timer = setTimeout(revalidate, CONTEST_ATTACH_DELAY);
    return () => clearTimeout(timer);
  }, [contestKey, revalidate]);
};
