import {
  getWebSocketResponseEventKey,
  isSubscribeChatCompletionsDataWebSocketEventDTO,
  isSubscribeCodeRunStatusWebSocketEventDTO,
  isSubscribeContestChangesWebSocketEventDTO,
  isSubscribeGetDataWebSocketEventDTO,
  isSubscribeProblemCrawledWebSocketEventDTO,
  isSubscribeSubmissionRunStatusWebSocketEventDTO,
  isSubscribeSubmissionsCrawlWebSocketEventDTO,
  isUnsubscribeChatCompletionsDataWebSocketEventDTO,
  isUnsubscribeCodeRunStatusWebSocketEventDTO,
  isUnsubscribeContestChangesWebSocketEventDTO,
  isUnsubscribeGetDataWebSocketEventDTO,
  isUnsubscribeProblemCrawledWebSocketEventDTO,
  isUnsubscribeSubmissionRunStatusWebSocketEventDTO,
  isUnsubscribeSubmissionsCrawlWebSocketEventDTO,
  SEPARATOR_TOKEN,
  WebSocketResponseEvent,
  WebSocketResponseEventKey,
  WebSocketSubscribeEventDTO,
  WebSocketSubscriptionEvent,
  WebSocketUnsubscribeEventDTO,
} from '@juki-team/commons';

export function getKeyWebSocketEventDTO(event: WebSocketSubscribeEventDTO | WebSocketUnsubscribeEventDTO) {
  if (isSubscribeCodeRunStatusWebSocketEventDTO(event) || isUnsubscribeCodeRunStatusWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CODE_RUN_STATUS_MESSAGE, event.sessionId, event.runId);
  }
  if (isSubscribeSubmissionRunStatusWebSocketEventDTO(event) || isUnsubscribeSubmissionRunStatusWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSION_RUN_STATUS_MESSAGE, event.sessionId, event.submitId);
  }
  if (isSubscribeGetDataWebSocketEventDTO(event) || isUnsubscribeGetDataWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.RESPONSE, event.sessionId, event.dataId);
  }
  if (isSubscribeProblemCrawledWebSocketEventDTO(event) || isUnsubscribeProblemCrawledWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.PROBLEM_CRAWLED, event.sessionId, event.problemKey);
  }
  if (isSubscribeChatCompletionsDataWebSocketEventDTO(event) || isUnsubscribeChatCompletionsDataWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CHAT_COMPLETIONS_RESPONSE, event.sessionId, event.chatAiId);
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDTO(event) || isUnsubscribeSubmissionsCrawlWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SUBMISSIONS_CRAWL, event.sessionId, event.contestKey + SEPARATOR_TOKEN + event.problemKeys);
  }
  if (isSubscribeContestChangesWebSocketEventDTO(event) || isUnsubscribeContestChangesWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.CONTEST_CHANGES, event.sessionId, event.contestKey);
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
  if (isSubscribeChatCompletionsDataWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CHAT_COMPLETIONS_DATA };
  }
  if (isSubscribeSubmissionsCrawlWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SUBMISSIONS_CRAWL };
  }
  if (isSubscribeContestChangesWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_CONTEST_CHANGES };
  }
  
  return event;
}
