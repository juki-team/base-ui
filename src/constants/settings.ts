import { type SWRConfiguration } from 'swr';

export const JUKI_SERVICE_V2_URL = process.env.NEXT_PUBLIC_JUKI_SERVICE_V2_URL || '';
export const JUKI_TOKEN_NAME = process.env.NEXT_PUBLIC_JUKI_TOKEN_NAME || '';
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const ABLY_LOG_LEVEL = +(process.env.NEXT_PUBLIC_ABLY_LOG_LEVEL || 0) || undefined;

export const SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: false,
  focusThrottleInterval: 5_000,
  dedupingInterval: 5_000,
};
