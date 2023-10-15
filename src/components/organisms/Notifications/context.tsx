import { createContext, Dispatch } from 'react';
import { NotificationActionsTypes } from './types';

export const NotificationContext = createContext<{ dispatch: Dispatch<NotificationActionsTypes> }>({
  dispatch: () => {
  },
});
