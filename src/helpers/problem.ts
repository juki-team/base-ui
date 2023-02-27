import { Judge } from '@juki-team/commons';

export const getProblemUrl = (judge: Judge, key: string) => {
  if (judge === Judge.JUKI_JUDGE) {
    return `/problem/view/${key}`;
  }
  return '#';
};

export const getEditorSettingsStorageKey = (useNickname: string) => `jk-editor-settings-store/${useNickname}`;

export const getProblemsStoreKey = (useNickname: string) => `jk-problem-storage/${useNickname}`;

export const getSourcesStoreKey = (useNickname: string) => `jk-sources-storage/${useNickname}`;
