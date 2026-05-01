import { createContext, type Dispatch } from 'react';
import type { NotificationActionsTypes } from './types';

export const NotificationContext = createContext<{ dispatch: Dispatch<NotificationActionsTypes> }>({
  dispatch: () => {
    // default no-op; replaced by Provider value at runtime
  },
});
