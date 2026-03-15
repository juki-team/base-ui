import { type SWRConfiguration } from 'swr';

// @ts-expect-error vite env — import.meta.env is undefined in Next.js, optional chaining prevents crash
const _viteEnv: Record<string, string> | undefined = import.meta.env;

export const JUKI_SERVICE_V2_URL =
  globalThis.process?.env?.NEXT_PUBLIC_JUKI_SERVICE_V2_URL || _viteEnv?.VITE_JUKI_SERVICE_V2_URL || '';
export const JUKI_TOKEN_NAME = globalThis.process?.env?.NEXT_PUBLIC_JUKI_TOKEN_NAME || _viteEnv?.VITE_JUKI_TOKEN_NAME || '';
export const NODE_ENV = globalThis.process?.env?.NODE_ENV || 'development';

export const ABLY_LOG_LEVEL =
  +(globalThis.process?.env?.NEXT_PUBLIC_ABLY_LOG_LEVEL || _viteEnv?.VITE_ABLY_LOG_LEVEL || 0) || undefined;

export const SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  focusThrottleInterval: 5_000,
  dedupingInterval: 5_000,
};
