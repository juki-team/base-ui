import {
  getWebSocketResponseEventKey,
  isSubscribeClientTrackWebSocketEventDTO,
  isSubscribeCodeRunStatusWebSocketEventDTO,
  isSubscribeContestChangesWebSocketEventDTO,
  isSubscribeGetDataWebSocketEventDTO,
  isSubscribeProblemCrawledWebSocketEventDTO,
  isSubscribeSubmissionRunStatusWebSocketEventDTO,
  isSubscribeSubmissionsCrawlWebSocketEventDTO,
  isSubscribeUserNotificationWebSocketEventDTO,
  isUnsubscribeClientTrackWebSocketEventDTO,
  isUnsubscribeCodeRunStatusWebSocketEventDTO,
  isUnsubscribeContestChangesWebSocketEventDTO,
  isUnsubscribeGetDataWebSocketEventDTO,
  isUnsubscribeProblemCrawledWebSocketEventDTO,
  isUnsubscribeSubmissionRunStatusWebSocketEventDTO,
  isUnsubscribeSubmissionsCrawlWebSocketEventDTO,
  isUnsubscribeUserNotificationWebSocketEventDTO,
  join,
  WebSocketResponseEvent,
  WebSocketResponseEventKey,
  WebSocketSubscribeEventDTO,
  WebSocketSubscriptionEvent,
  WebSocketUnsubscribeEventDTO,
} from '@juki-team/commons';

export function getKeyWebSocketEventDTO(event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO) {
  if (isSubscribeCodeRunStatusWebSocketEventDTO(event) || isUnsubscribeCodeRunStatusWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CODE_RUN_STATUS, event.clientId, event.runId);
  }
  if (isSubscribeSubmissionRunStatusWebSocketEventDTO(event) || isUnsubscribeSubmissionRunStatusWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_RUN_STATUS, event.clientId, event.submitId);
  }
  if (isSubscribeGetDataWebSocketEventDTO(event) || isUnsubscribeGetDataWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_, event.clientId, event.dataId);
  }
  if (isSubscribeUserNotificationWebSocketEventDTO(event) || isUnsubscribeUserNotificationWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.USER_NOTIFICATION_, event.clientId, '*');
  }
  if (isSubscribeProblemCrawledWebSocketEventDTO(event) || isUnsubscribeProblemCrawledWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.PROBLEM_CRAWLED, event.clientId, event.problemKey);
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDTO(event) || isUnsubscribeSubmissionsCrawlWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSIONS_CRAWL, event.clientId, join([ event.contestKey, event.problemKeys ]));
  }
  if (isSubscribeContestChangesWebSocketEventDTO(event) || isUnsubscribeContestChangesWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CONTEST_CHANGES, event.clientId, event.contestKey);
  }
  if (isSubscribeClientTrackWebSocketEventDTO(event) || isUnsubscribeClientTrackWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CLIENT_TRACK, event.clientId, '*');
  }
  
  return '' as WebSocketResponseEventKey;
}

export function getUnsubscribeEvent(event: WebSocketSubscribeEventDTO): WebSocketUnsubscribeEventDTO {
  if (isSubscribeCodeRunStatusWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CODE_RUN_STATUS };
  }
  if (isSubscribeSubmissionRunStatusWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSION_RUN_STATUS };
  }
  if (isSubscribeGetDataWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_GET_DATA };
  }
  if (isSubscribeProblemCrawledWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_PROBLEM_CRAWLED };
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSIONS_CRAWL };
  }
  if (isSubscribeContestChangesWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CONTEST_CHANGES };
  }
  if (isSubscribeClientTrackWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CLIENT_TRACK };
  }
  if (isSubscribeUserNotificationWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_USER_NOTIFICATION };
  }
  
  return event;
}
