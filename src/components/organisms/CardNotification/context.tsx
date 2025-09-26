import { createContext, type Dispatch } from 'react';
import type { NotificationActionsTypes } from './types';

export const NotificationContext = createContext<{ dispatch: Dispatch<NotificationActionsTypes> }>({
  dispatch: () => {
  },
});
