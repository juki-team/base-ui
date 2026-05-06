import { cache } from 'react';
import { jukiApiManager } from '../../../settings';
import { getServerDict, getServerLocale, setServerDict } from './cache';
import type { Dict } from './shared';
import { translate } from './shared';

export { getServerDict, getServerLocale, setServerDict };

const _processCache = new Map<string, Dict>();

const _fetchDict = cache(async (locale: string, namespace: string): Promise<Dict> => {
  const key = `${locale}:${namespace}`;
  const hit = _processCache.get(key);
  if (hit) {
    return hit;
  }
  const url = jukiApiManager.apiV2.locale.get({
    params: { locale: locale as never, namespace },
  }).url;
  const res = await fetch(url, {
    headers: { accept: 'application/json' },
  });
  if (!res.ok) {
    return {};
  }
  const text = await res.text();
  try {
    const dict = JSON.parse(text) as Dict;
    _processCache.set(key, dict);
    return dict;
  } catch {
    return {};
  }
});

export const loadServerDict = (locale: string, namespace = 'translation'): Promise<Dict> => {
  return _fetchDict(locale, namespace);
};

/**
 * Convenience helper that loads several locales in parallel and returns the
 * `dicts` map shape that <JukiI18nBridge dicts={...}> expects. Use this in
 * the layout to pre-load every locale you want to support so the client-side
 * language switch is instant (no blank text, no second fetch).
 */
export const loadServerDicts = async (
  locales: readonly string[],
  namespace = 'translation',
): Promise<Record<string, Dict>> => {
  const entries = await Promise.all(
    locales.map(async (locale) => [locale, await _fetchDict(locale, namespace)] as const),
  );
  return Object.fromEntries(entries);
};

export const t = (key: string): string => translate(getServerDict(), key);
