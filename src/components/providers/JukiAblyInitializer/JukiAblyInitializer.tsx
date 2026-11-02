import Spaces from '@ably/spaces';
import { SpaceProvider, SpacesProvider } from '@ably/spaces/react';
import {
  cleanRequest,
  consoleError,
  consoleInfo,
  consoleWarn,
  ContentResponse,
  getParamsOfClientId,
} from '@juki-team/commons';
import Ably, { TokenDetails, TokenRequest } from 'ably';
import { LiveObjects } from 'ably/liveobjects';
import { PropsWithChildren, useEffect } from 'react';
import { ABLY_LOG_LEVEL } from '../../../constants/settings';
import { QueryParamKey } from '../../../enums';
import { jukiApiManager } from '../../../settings';
import { useAblyStore } from '../../../stores/ably/useAblyStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { getTopicChannelsAuthParams, initTopicChannels, setTopicChannelsCapability } from '../../../stores/websocket/topicChannels';
import { useWebsocketStore } from '../../../stores/websocket/useWebsocketStore';
import { authorizedRequest, isBrowser, safeReportError } from '../../helpers';
import { useStableRef } from '../../hooks/useStableRef';

const newAblyClient = (uiId: string) => {
  if (isBrowser()) {
    return new Ably.Realtime({
      logLevel: ABLY_LOG_LEVEL,
      authCallback: async (_, callback) => {
        if (isBrowser()) {
          consoleInfo('new request to auth ably');
          let tokenRequest;
          try {
            const response = cleanRequest<ContentResponse<TokenDetails | TokenRequest | string | null>>(
              await authorizedRequest(
                jukiApiManager.API_V2.websocket.auth().url +
                  '?' +
                  // the API decides what is granted for the contest / tracked client, see topicChannels.ts
                  new URLSearchParams({ uiId, ...getTopicChannelsAuthParams() }).toString(),
              ),
            );
            tokenRequest = response.success ? response.content : null;
            if (tokenRequest && typeof tokenRequest === 'object' && 'capability' in tokenRequest) {
              setTopicChannelsCapability(tokenRequest.capability);
            }
          } catch (error) {
            callback(error?.toString() || 'Error on authCallback', null);
            return;
          }
          callback(null, tokenRequest);
        } else {
          console.warn('authCallback executed on server side');
          callback(null, null);
        }
      },
      plugins: {
        LiveObjects,
      },
    });
  }
  return null;
};

export const JukiAblyInitializer = () => {
  
  const clientId = useUserStore(store => store.clientId);
  const newAuth = useWebsocketStore(store => store.newAuth);
  const { setRealtimeClient, realtimeClient, setSpaces } = useAblyStore();
  const realtimeClientRef = useStableRef(realtimeClient);
  useEffect(() => {
    (async () => {
      try {
        if (realtimeClientRef.current) {
          consoleInfo('Closing previous Ably connection due to clientId change');
          realtimeClientRef.current.close();
        }
        const { sessionId, uiId } = getParamsOfClientId(clientId);
        if (!!sessionId && !!uiId) {
          consoleInfo(`Creating new Ably connection clientId: "${clientId}"`);
          const realtimeClient = newAblyClient(uiId);
          if (realtimeClient) {
            realtimeClient.connection.on('connected', () => {
              consoleInfo('Ably connected');
            });
            
            realtimeClient.connection.on('disconnected', () => {
              consoleWarn('Ably disconnected');
            });
            
            realtimeClient.connection.on('suspended', () => {
              consoleWarn('Ably connection suspended');
            });
            
            realtimeClient.connection.on('failed', (stateChange) => {
              consoleError('Ably connection failed', { reason: stateChange.reason });
              void safeReportError(
                new Error('Ably connection failed: ' + stateChange.reason?.message),
                null,
                { message: 'Ably connection failed' },
              );
            });
            
            realtimeClient.connection.on('closed', () => {
              consoleWarn('Ably connection closed');
            });
            
            realtimeClient.connection.on('update', (stateChange) => {
              consoleInfo('Ably connection state changed', {
                previous: stateChange.previous,
                current: stateChange.current,
              });
            });
            
            initTopicChannels(realtimeClient, clientId, useWebsocketStore.getState().broadcastMessage);
            setRealtimeClient(realtimeClient);
            setSpaces(new Spaces(realtimeClient));
            setTimeout(newAuth, 1000);
          } else {
            consoleWarn('Failed creating realtimeClient ', { realtimeClient });
          }
        } else {
          consoleWarn('sessionId or uiId are empty', { sessionId, uiId });
        }
      } catch (error) {
        void safeReportError(
          error as Error,
          null,
          { message: 'Error during Ably authorization' },
        );
      }
    })();
  }, [ clientId, newAuth, realtimeClientRef, setRealtimeClient, setSpaces ]);
  
  return null;
};

export const JukiAblySpaceProvider = ({ children }: PropsWithChildren) => {
  
  const searchParams = useRouterStore(store => store.searchParams);
  const roomKey = searchParams.get(QueryParamKey.ROOM);
  const spaces = useAblyStore(store => store.spaces);
  
  if (isBrowser() && spaces && roomKey) {
    return (
      <SpacesProvider client={spaces}>
        <SpaceProvider name={'room:' + roomKey}>
          {children}
        </SpaceProvider>
      </SpacesProvider>
    );
  }
  
  return children;
};
