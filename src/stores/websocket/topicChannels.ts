import {
  ClientId,
  consoleInfo,
  consoleWarn,
  getChannelOfWebSocketSubscribeEvent,
  getContestChannelParams,
  getContestKeyOfWebSocketSubscribeEvent,
  getWebSocketResponseEventKeyOfResponse,
  isSubscribeClientTrackDataWebSocketEventDTO,
  WebSocketResponseEventDTO,
  WebSocketSubscribeEventDTO,
} from '@juki-team/commons';
import type Ably from 'ably';

/**
 * TOPIC channels manager.
 *
 * The backend publishes each event once on the channel of its topic (`submission:{id}`, `contest:{key}:{role}`,
 * `session:{id}`, `user:{id}`...). Which channels this client can use is decided by the API in the Ably token
 * (capability); Ably rejects any other channel. This module only decides which of the allowed channels to attach:
 *
 * - private channels of the token (`session:{id}`, `user:{id}`): always
 * - topic channels needed by the active subscriptions (`getChannelOfWebSocketSubscribeEvent`): while they are used
 * - role channels of the contest being viewed (`contest:{key}:{role}` granted in the token): while it is viewed
 *
 * The messages are dispatched with the same keys as the subscriptions (`getWebSocketResponseEventKeyOfResponse`).
 */

type Dispatch = (key: string, data: WebSocketResponseEventDTO) => void;

let client: Ably.Realtime | null = null;
let clientId = '' as ClientId;
let dispatch: Dispatch = () => undefined;

const channelRefs = new Map<string, number>();
const contestRefs = new Map<string, number>();
const trackedClientRefs = new Map<string, number>();
const attached = new Map<string, (message: Ably.InboundMessage) => void>();

// the same event can arrive by two channels (e.g. owner + managers while the contest is frozen)
const MAX_RECENT_MESSAGES = 200;
const recentMessages: string[] = [];
const recentMessagesSet = new Set<string>();

const increment = (map: Map<string, number>, key: string) => map.set(key, (map.get(key) ?? 0) + 1);

const decrement = (map: Map<string, number>, key: string) => {
  const count = (map.get(key) ?? 0) - 1;
  if (count > 0) {
    map.set(key, count);
  } else {
    map.delete(key);
  }
};

const lastKey = (map: Map<string, number>) => [...map.keys()].pop();

/**
 * Params sent to the API when requesting the Ably token: the API decides what is granted for them.
 */
export const getTopicChannelsAuthParams = (): { contestKey?: string; trackedClientId?: string } => {
  const contestKey = lastKey(contestRefs);
  const trackedClientId = lastKey(trackedClientRefs);
  return {
    ...(contestKey ? { contestKey } : {}),
    ...(trackedClientId ? { trackedClientId } : {}),
  };
};

let capability: Record<string, string[]> = {};

/**
 * Capability of the last token returned by the API (called from the Ably authCallback).
 */
export const setTopicChannelsCapability = (tokenCapability: unknown) => {
  try {
    capability =
      typeof tokenCapability === 'string' ? JSON.parse(tokenCapability) : ((tokenCapability as typeof capability) ?? {});
  } catch {
    capability = {};
  }
};

const getCapability = () => capability;

// Ably capability rules: a trailing `*` replaces one or more segments, any other `*` exactly one segment
const resourceMatches = (resource: string, channel: string) => {
  if (resource === '*') {
    return true;
  }
  const resourceSegments = resource.split(':');
  const channelSegments = channel.split(':');
  for (let i = 0; i < resourceSegments.length; i++) {
    const isLast = i === resourceSegments.length - 1;
    if (resourceSegments[i] === '*') {
      if (isLast) {
        return channelSegments.length > i;
      }
      if (channelSegments[i] === undefined) {
        return false;
      }
      continue;
    }
    if (resourceSegments[i] !== channelSegments[i]) {
      return false;
    }
  }
  return resourceSegments.length === channelSegments.length;
};

const canSubscribe = (capability: Record<string, string[]>, channel: string) =>
  Object.entries(capability).some(
    ([resource, operations]) =>
      (operations.includes('subscribe') || operations.includes('*')) && resourceMatches(resource, channel),
  );

const onMessage = (data: WebSocketResponseEventDTO) => {
  const key = getWebSocketResponseEventKeyOfResponse(data, clientId);
  if (!key) {
    return;
  }
  const fingerprint = JSON.stringify(data);
  if (recentMessagesSet.has(fingerprint)) {
    return;
  }
  recentMessages.push(fingerprint);
  recentMessagesSet.add(fingerprint);
  if (recentMessages.length > MAX_RECENT_MESSAGES) {
    recentMessagesSet.delete(recentMessages.shift()!);
  }
  dispatch(key, data);
};

const getDesiredChannels = () => {
  const capability = getCapability();
  const desired = new Set<string>(channelRefs.keys());
  for (const resource of Object.keys(capability)) {
    if (resource.includes('*')) {
      continue;
    }
    if (resource.startsWith('session:') || resource.startsWith('user:')) {
      desired.add(resource);
    }
    const contestChannel = getContestChannelParams(resource);
    if (contestChannel && contestRefs.has(contestChannel.contestKey)) {
      desired.add(resource);
    }
  }
  return new Set([...desired].filter((channel) => canSubscribe(capability, channel)));
};

const reconcile = () => {
  if (!client) {
    return;
  }
  const realtime = client;
  const desired = getDesiredChannels();
  for (const [name, listener] of attached) {
    if (!desired.has(name)) {
      attached.delete(name);
      const channel = realtime.channels.get(name);
      channel.unsubscribe(listener);
      channel
        .detach()
        .then(() => realtime.channels.release(name))
        .catch((error) => consoleWarn('error detaching channel', { name, error }));
    }
  }
  for (const name of desired) {
    if (!attached.has(name)) {
      const listener = (message: Ably.InboundMessage) => onMessage(message.data);
      attached.set(name, listener);
      realtime.channels
        .get(name)
        .subscribe(listener)
        .catch((error) => {
          attached.delete(name);
          consoleWarn('error subscribing channel', { name, error });
        });
    }
  }
};

let authorizing: Promise<void> = Promise.resolve();

const reauthorize = () => {
  authorizing = authorizing.then(async () => {
    if (!client) {
      return;
    }
    try {
      // the authCallback asks the API for a new token with `getTopicChannelsAuthParams()`, the connection is kept
      await client.auth.authorize();
    } catch (error) {
      consoleWarn('error re-authorizing ably', { error });
    }
    reconcile();
  });
};

/**
 * Sets the Ably client of the current clientId (called when the client is created).
 */
export const initTopicChannels = (realtimeClient: Ably.Realtime, newClientId: ClientId, newDispatch: Dispatch) => {
  client = realtimeClient;
  clientId = newClientId;
  dispatch = newDispatch;
  attached.clear();
  realtimeClient.connection.on(['connected', 'update'], () => {
    consoleInfo('ably token updated, reconciling topic channels');
    reconcile();
  });
};

/**
 * Registers the topic channel (and the contest / tracked client token params) of a subscription.
 * Returns the function to unregister it.
 */
export const addTopicSubscription = (event: WebSocketSubscribeEventDTO) => {
  const channel = getChannelOfWebSocketSubscribeEvent(event);
  const contestKey = getContestKeyOfWebSocketSubscribeEvent(event);
  const trackedClientId = isSubscribeClientTrackDataWebSocketEventDTO(event) ? event.trackedClientId : null;

  const prevAuthParams = JSON.stringify(getTopicChannelsAuthParams());
  if (channel) increment(channelRefs, channel);
  if (contestKey) increment(contestRefs, contestKey);
  if (trackedClientId) increment(trackedClientRefs, trackedClientId);
  const update = () => {
    if (JSON.stringify(getTopicChannelsAuthParams()) !== prevAuthParams) {
      reauthorize();
    } else {
      reconcile();
    }
  };
  update();

  let removed = false;
  return () => {
    if (removed) {
      return;
    }
    removed = true;
    const prev = JSON.stringify(getTopicChannelsAuthParams());
    if (channel) decrement(channelRefs, channel);
    if (contestKey) decrement(contestRefs, contestKey);
    if (trackedClientId) decrement(trackedClientRefs, trackedClientId);
    if (JSON.stringify(getTopicChannelsAuthParams()) !== prev) {
      reauthorize();
    } else {
      reconcile();
    }
  };
};
