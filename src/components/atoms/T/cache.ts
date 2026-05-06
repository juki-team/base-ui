import { Language } from '@juki-team/commons/enums';
import { cache } from 'react';
import type { Dict } from './shared';

interface ServerI18nState {
  locale: string;
  dict: Dict;
}

const _state = cache((): ServerI18nState => ({ locale: Language.EN, dict: {} }));

export const setServerDict = (locale: string, dict: Dict): void => {
  const state = _state();
  state.locale = locale;
  state.dict = dict;
};

export const getServerDict = (): Dict => _state().dict;

export const getServerLocale = (): string => _state().locale;
