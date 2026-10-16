import type { CodeEditorFile as CommonsCodeEditorFile } from '@juki-team/commons';

// commons 0.1.x has no `active`; the editor tracks the entry-point file on its own
export type CodeEditorFile<T> = CommonsCodeEditorFile<T> & { active?: boolean };

export type CodeEditorFiles<T> = { [key: string]: CodeEditorFile<T> };
