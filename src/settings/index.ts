import Spaces from '@ably/spaces';
import { Realtime } from 'ably';
import { ApiManager } from './ApiManager';
import { AppRoutes } from './AppRoutes';

export const jukiApiManager = new ApiManager();
export const jukiAppRoutes = new AppRoutes();
export const jukiAbly: { realtimeClient: null | Realtime, spaces: null | Spaces } = {
  realtimeClient: null,
  spaces: null,
};
