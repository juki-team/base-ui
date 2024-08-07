import { createContext, Dispatch } from 'react';
import { NotificationActionsTypes, Sounds } from './types';

export const NotificationContext = createContext<{ dispatch: Dispatch<NotificationActionsTypes> }>({
  dispatch: () => {
  },
});

export const SoundContext = createContext<{ sounds: Sounds | null }>({ sounds: null });
