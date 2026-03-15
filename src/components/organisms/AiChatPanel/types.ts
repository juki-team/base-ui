import { type UIDataTypes, type UIMessage, type UITools } from 'ai';
import { type ReactNode, type RefObject } from 'react';

export type AiChatToolStateUI = Record<string, { label: string; icon: ReactNode }>;

export type AiChatSuggestion = { icon: ReactNode; label: string; prompt: string };

export interface AiChatPanelProps {
  getBodyRef: RefObject<() => object>;
  onMessagesChangeRef: RefObject<(messages: UIMessage<unknown, UIDataTypes, UITools>[]) => void>;
  api: string;
  toolStateUI?: AiChatToolStateUI;
  suggestions?: AiChatSuggestion[];
  storeKey?: string;
}
