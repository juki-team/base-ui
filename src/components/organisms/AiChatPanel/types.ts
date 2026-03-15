import { type UIDataTypes, type UIMessage, type UITools } from 'ai';
import { Dispatch, type ReactNode, type RefObject, SetStateAction } from 'react';

export type AiChatToolStateUI = Record<string, { label: string; icon: ReactNode }>;

export type AiChatSuggestion = { icon: ReactNode; label: string; prompt: string };

export type Part = { type: 'text' | 'file'; text?: string; mediaType?: string; url?: string; name?: string };

export interface AiChatPanelProps {
  getBodyRef: RefObject<() => object>;
  onMessagesChangeRef: RefObject<(messages: UIMessage<unknown, UIDataTypes, UITools>[]) => void>;
  api: string;
  toolStateUI?: AiChatToolStateUI;
  suggestions?: AiChatSuggestion[];
  storeKey?: string;
  onWidthChange?: (width: number) => void;
  actions?: (props: { setPendingParts: Dispatch<SetStateAction<Part[]>> }) => ReactNode;
}
