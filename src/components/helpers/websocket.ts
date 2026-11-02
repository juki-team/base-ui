import {
  getWebSocketResponseEventKey,
  isSubscribeCodeRunStatusWebSocketEventDto,
  isSubscribeContestChangesWebSocketEventDto,
  isSubscribeGetDataWebSocketEventDto,
  isSubscribeProblemCrawledWebSocketEventDto,
  isSubscribeSubmissionRunStatusWebSocketEventDto,
  isSubscribeSubmissionsCrawlWebSocketEventDto,
  isSubscribeSubmissionsJudgingWebSocketEventDto,
  isSubscribeUserNotificationWebSocketEventDto,
  isUnsubscribeCodeRunStatusWebSocketEventDto,
  isUnsubscribeContestChangesWebSocketEventDto,
  isUnsubscribeGetDataWebSocketEventDto,
  isUnsubscribeProblemCrawledWebSocketEventDto,
  isUnsubscribeSubmissionRunStatusWebSocketEventDto,
  isUnsubscribeSubmissionsCrawlWebSocketEventDto,
  isUnsubscribeSubmissionsJudgingWebSocketEventDto,
  isUnsubscribeUserNotificationWebSocketEventDto,
  join,
  WebSocketResponseEvent,
  WebSocketResponseEventKey,
  WebSocketSubscribeEventDto,
  WebSocketSubscriptionEvent,
  WebSocketUnsubscribeEventDto,
} from '@juki-team/commons';

export function getKeyWebSocketEventDto(event: WebSocketSubscribeEventDto | WebSocketUnsubscribeEventDto) {
  if (isSubscribeCodeRunStatusWebSocketEventDto(event) || isUnsubscribeCodeRunStatusWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CODE_RUN_STATUS, event.clientId, event.runId);
  }
  if (isSubscribeSubmissionRunStatusWebSocketEventDto(event) || isUnsubscribeSubmissionRunStatusWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_RUN_STATUS, event.clientId, event.submitId);
  }
  if (isSubscribeGetDataWebSocketEventDto(event) || isUnsubscribeGetDataWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_, event.clientId, event.dataId);
  }
  if (isSubscribeUserNotificationWebSocketEventDto(event) || isUnsubscribeUserNotificationWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.USER_NOTIFICATION_, event.clientId, '*');
  }
  if (isSubscribeProblemCrawledWebSocketEventDto(event) || isUnsubscribeProblemCrawledWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.PROBLEM_CRAWLED, event.clientId, event.problemKey);
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDto(event) || isUnsubscribeSubmissionsCrawlWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(
      WebSocketResponseEvent.SUBMISSIONS_CRAWL,
      event.clientId,
      join([event.contestKey, event.problemKeys]),
    );
  }
  if (isSubscribeContestChangesWebSocketEventDto(event) || isUnsubscribeContestChangesWebSocketEventDto(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CONTEST_CHANGES, event.clientId, event.contestKey);
  }
  if (isSubscribeSubmissionsJudgingWebSocketEventDto(event) || isUnsubscribeSubmissionsJudgingWebSocketEventDto(event)) {
    // one key for every table, see getWebSocketResponseEventKeyOfResponse
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_JUDGING, event.clientId, '*');
  }



  return '' as WebSocketResponseEventKey;
}

export function getUnsubscribeEvent(event: WebSocketSubscribeEventDto): WebSocketUnsubscribeEventDto {
  if (isSubscribeCodeRunStatusWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CODE_RUN_STATUS };
  }
  if (isSubscribeSubmissionRunStatusWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSION_RUN_STATUS };
  }
  if (isSubscribeGetDataWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_GET_DATA };
  }
  if (isSubscribeProblemCrawledWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_PROBLEM_CRAWLED };
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSIONS_CRAWL };
  }
  if (isSubscribeContestChangesWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CONTEST_CHANGES };
  }

  if (isSubscribeUserNotificationWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_USER_NOTIFICATION };
  }

  if (isSubscribeSubmissionsJudgingWebSocketEventDto(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSIONS_JUDGING };
  }


  return event;
}
