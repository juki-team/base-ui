import { type SWRConfiguration } from 'swr';

// @ts-expect-error vite env — import.meta.env is undefined in Next.js, optional chaining prevents crash
const _viteEnv: Record<string, string> | undefined = import.meta.env;

// Next.js/webpack statically replaces the exact literal process.env.NEXT_PUBLIC_* at build time,
// even inside ternary expressions. The typeof guard prevents ReferenceError in Vite browser bundles
// where process is not defined.
export const JUKI_SERVICE_V2_URL =
  (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_JUKI_SERVICE_V2_URL : undefined) ||
  _viteEnv?.VITE_JUKI_SERVICE_V2_URL ||
  '';
export const JUKI_TOKEN_NAME =
  (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_JUKI_TOKEN_NAME : undefined) ||
  _viteEnv?.VITE_JUKI_TOKEN_NAME ||
  '';
export const NODE_ENV = (typeof process !== 'undefined' ? process.env.NODE_ENV : undefined) || 'development';
export const ABLY_LOG_LEVEL =
  +(
    (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_ABLY_LOG_LEVEL : undefined) ||
    _viteEnv?.VITE_ABLY_LOG_LEVEL ||
    0
  ) || undefined;

export const SWR_CONFIG: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  focusThrottleInterval: 5_000,
  dedupingInterval: 5_000,
};
