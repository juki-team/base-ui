import {
  getWebSocketResponseEventKey,
  isSubscribeChatCompletionsDataWebSocketEventDTO,
  isSubscribeCodeRunStatusWebSocketEventDTO,
  isSubscribeContestChangesWebSocketEventDTO,
  isSubscribeProblemCrawledWebSocketEventDTO,
  isSubscribeSenDataEc2InstancesListWebSocketEventDTO,
  isSubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO,
  isSubscribeSenDataEcsTasksListWebSocketEventDTO,
  isSubscribeSenDataSsmSessionsListWebSocketEventDTO,
  isSubscribeSubmissionRunStatusWebSocketEventDTO,
  isSubscribeSubmissionsCrawlWebSocketEventDTO,
  isUnsubscribeChatCompletionsDataWebSocketEventDTO,
  isUnsubscribeCodeRunStatusWebSocketEventDTO,
  isUnsubscribeContestChangesWebSocketEventDTO,
  isUnsubscribeProblemCrawledWebSocketEventDTO,
  isUnsubscribeSenDataEc2InstancesListWebSocketEventDTO,
  isUnsubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO,
  isUnsubscribeSenDataEcsTasksListWebSocketEventDTO,
  isUnsubscribeSenDataSsmSessionsListWebSocketEventDTO,
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
  if (isSubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO(event) || isUnsubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_ECS_TASK_DEFINITIONS_LIST, event.sessionId, '*');
  }
  if (isSubscribeSenDataEcsTasksListWebSocketEventDTO(event) || isUnsubscribeSenDataEcsTasksListWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_ECS_TASKS_LIST, event.sessionId, '*');
  }
  if (isSubscribeSenDataEc2InstancesListWebSocketEventDTO(event) || isUnsubscribeSenDataEc2InstancesListWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_EC2_INSTANCES_LIST, event.sessionId, '*');
  }
  if (isSubscribeSenDataSsmSessionsListWebSocketEventDTO(event) || isUnsubscribeSenDataSsmSessionsListWebSocketEventDTO(event)) {
    return getWebSocketResponseEventKey(WebSocketResponseEvent.SEND_DATA_SSM_SESSIONS_LIST, event.sessionId, '*');
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
  if (isSubscribeSenDataEcsTaskDefinitionsListWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SEND_DATA_ECS_TASK_DEFINITIONS_LIST };
  }
  if (isSubscribeSenDataEcsTasksListWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SEND_DATA_ECS_TASKS_LIST };
  }
  if (isSubscribeSenDataEc2InstancesListWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SEND_DATA_EC2_INSTANCES_LIST };
  }
  if (isSubscribeSenDataSsmSessionsListWebSocketEventDTO(event)) {
    return { ...event, event: WebSocketSubscriptionEvent.UNSUBSCRIBE_SEND_DATA_SSM_SESSIONS_LIST };
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
