import { Language } from '@juki-team/commons/enums';
import { cache } from 'react';
import type { Dict } from './shared';

interface ServerI18nState {
  locale: string;
  dict: Dict;
}

const _state = cache((): ServerI18nState => ({ locale: Language.EN, dict: {} }));

let _setCalled = false;
let _warned = false;

export const setServerDict = (locale: string, dict: Dict): void => {
  _setCalled = true;
  const state = _state();
  state.locale = locale;
  state.dict = dict;
};

const _isProduction = (): boolean => {
  // Defensive: `process` may be undefined in browsers when the host bundler
  // doesn't substitute `process.env.NODE_ENV`. We only care about silencing
  // the warning in production builds; if we can't tell, default to verbose.
  if (typeof process === 'undefined') {
    return false;
  }
  try {
    return process.env?.NODE_ENV === 'production';
  } catch {
    return false;
  }
};

const _warnIfMissingBridge = (): void => {
  if (_warned || _setCalled) {
    return;
  }
  if (typeof window === 'undefined') {
    return; // server context: setServerDict not yet called this request, may still happen
  }
  if (_isProduction()) {
    return;
  }
  _warned = true;
  // eslint-disable-next-line no-console
  console.warn(
    '[@juki-team/base-ui] A server-safe component using <T> rendered in a ' +
      'client context but the i18n dict was never populated for the client ' +
      'singleton. Translations will fall back to raw keys.\n\n' +
      'Fix: wrap your client tree with <JukiI18nBridge dicts={...}> at the ' +
      'root. The bridge syncs the active dict into the server cache during ' +
      'render so components imported from `/server-components` translate ' +
      'correctly in both contexts.',
  );
};

export const getServerDict = (): Dict => {
  _warnIfMissingBridge();
  return _state().dict;
};

export const getServerLocale = (): string => {
  _warnIfMissingBridge();
  return _state().locale;
};
