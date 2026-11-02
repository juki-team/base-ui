import {
  isSubmissionRunStatusMessageWebSocketResponseEventDto,
  ProblemVerdict,
  type SubmissionSummaryListResponseDto,
  type SubscribeSubmissionRunStatusWebSocketEventDto,
  WebSocketSubscriptionEvent,
} from '@juki-team/commons';
import { memo, useEffect } from 'react';
import { useSubmissionsLiveStore } from '../../../../stores/submissionsLive/useSubmissionsLiveStore';
import { useRevalidateSubmissions } from '../../../hooks/useSubmissionsJudging';
import { useStableRef } from '../../../hooks/useStableRef';
import { useSubscribe } from '../../../hooks/useSubscribe';
import { SubmissionVerdict } from './SubmissionVerdict';

/** Case by case progress of one submission: mounted (channel attached) only while it is needed. */
const SubmissionRunStatusListener = memo(({ submitId }: { submitId: string }) => {
  const apply = useSubmissionsLiveStore((store) => store.apply);
  const event: Omit<SubscribeSubmissionRunStatusWebSocketEventDto, 'clientId'> = {
    event: WebSocketSubscriptionEvent.SUBSCRIBE_SUBMISSION_RUN_STATUS,
    submitId,
  };
  useSubscribe(event, (data) => {
    if (isSubmissionRunStatusMessageWebSocketResponseEventDto(data)) {
      const { status, verdict, points, testInfo, createdAt } = data;
      apply(data.submitId, { status, verdict, points, testInfo, createdAt });
    }
  });
  return null;
});

SubmissionRunStatusListener.displayName = 'SubmissionRunStatusListener';

// no message for this long while judging: the list may have the result (a message can still be lost)
const SILENCE_CHECK_INTERVAL = 20_000;
// a judging entry this old, with the list already showing a result: its end was lost
const STALE_JUDGING = 60_000;

interface SubmissionListenerVerdictProps {
  submit: SubmissionSummaryListResponseDto;
  className?: string;
  /**
   * Keep the channel of the submission attached even if it is not being judged. Tables don't need it: they learn about
   * a rejudge from `useSubmissionsJudging`. For a view of one submission, without a table channel.
   */
  alwaysListen?: boolean;
}

export const SubmissionListenerVerdict = ({ submit, className, alwaysListen = false }: SubmissionListenerVerdictProps) => {
  const { points, status, verdict, submitId, processedCases } = submit;

  const live = useSubmissionsLiveStore((store) => store.entries[submitId]);
  const remove = useSubmissionsLiveStore((store) => store.remove);
  const revalidate = useRevalidateSubmissions();

  const listIsPending = verdict === ProblemVerdict.PENDING;
  const judging = live ? live.judging : listIsPending;

  // finished: the message already has the result, the list is refreshed for the rest of the row
  const finishedAt = live && !live.judging ? live.data.createdAt : 0;
  useEffect(() => {
    if (finishedAt) {
      revalidate();
    }
  }, [finishedAt, revalidate]);

  // Safety net: a result can be missed (more than 2 minutes disconnected, a lost message...), the list has the truth.
  const liveRef = useStableRef(live);
  const listIsPendingRef = useStableRef(listIsPending);
  useEffect(() => {
    if (!judging) {
      return;
    }
    const check = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }
      const current = liveRef.current;
      const silence = current ? Date.now() - current.receivedAt : Infinity;
      if (current && !listIsPendingRef.current && silence > STALE_JUDGING) {
        remove(submitId);
      }
      if (silence > SILENCE_CHECK_INTERVAL) {
        revalidate();
      }
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        revalidate();
      }
    };
    const interval = setInterval(check, SILENCE_CHECK_INTERVAL);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [judging, liveRef, listIsPendingRef, remove, revalidate, submitId]);

  return (
    <>
      {(alwaysListen || judging) && <SubmissionRunStatusListener submitId={submitId} />}
      <SubmissionVerdict
        verdict={verdict}
        points={points}
        status={status}
        submitId={submitId}
        submissionData={live?.data}
        processedCases={processedCases}
        className={className}
      />
    </>
  );
};
