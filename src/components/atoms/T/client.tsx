'use client';

import { Language } from '@juki-team/commons/enums';
import { createContext, useContext, useMemo } from 'react';
import type { Dict } from './shared';
import { translate } from './shared';
import type { I18nContextValue, I18nProviderProps } from './types';

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ locale, dicts, children }: I18nProviderProps) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dict: dicts[locale] ?? {},
      dicts,
    }),
    [locale, dicts],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return { locale: Language.EN, dict: {}, dicts: {} };
  }
  return ctx;
}

export function useT(): (key: string) => string {
  const { dict } = useI18n();
  return useMemo(() => (key: string) => translate(dict, key), [dict]);
}

export function useDict(): Dict {
  return useI18n().dict;
}

export function useLocale(): string {
  return useI18n().locale;
}
