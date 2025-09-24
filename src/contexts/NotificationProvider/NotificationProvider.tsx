import { useReducer } from 'react';
import { CardNotification } from '../../components/organisms/Notifications/CardNotification';
import { NotificationContext } from '../../components/organisms/Notifications/context';
import {
  NotificationAction,
  NotificationActionsTypes,
  NotificationProps,
  NotificationProviderProps,
} from '../../components/organisms/Notifications/types';
import { NotificationType } from '../../enums';
import { useJukiUI } from '../../components/hooks';
import { useSoundStore } from '../../stores/sound/useSoundStore';

export function NotificationProvider({ children }: NotificationProviderProps) {
  
  const sound = useSoundStore();
  
  const [ state, dispatch ] = useReducer((state: NotificationProps[], action: NotificationActionsTypes) => {
    switch (action.type) {
      case NotificationAction.ADD_NOTIFICATION:
        if (action.payload.type === NotificationType.SUCCESS) {
          void sound.playSuccess();
        }
        if (action.payload.type === NotificationType.INFO) {
          void sound.playNotification();
        }
        if (action.payload.type === NotificationType.ERROR) {
          void sound.playError();
        }
        if (action.payload.type === NotificationType.WARNING) {
          void sound.playWarning();
        }
        return [ ...state, { ...action.payload } ];
      case NotificationAction.REMOVE_NOTIFICATION:
        return state.filter(notification => notification.id !== action.notificationId);
      default:
        return state;
    }
  }, []);
  
  const { viewPortSize } = useJukiUI();
  
  const notificationsFiltered = state.filter(note => note.type !== NotificationType.QUIET);
  
  const notifications = viewPortSize === 'sm' ? [ ...notificationsFiltered ].reverse() : notificationsFiltered;
  
  const chunkStates = notifications.length ? [ [ notifications[0]! ] ] : [];
  for (let i = 1; i < notifications.length; i++) {
    if (chunkStates[chunkStates.length - 1]![0]?.type === notifications[i]!.type) {
      chunkStates[chunkStates.length - 1]!.push(notifications[i]!);
    } else {
      chunkStates.push([ notifications[i]! ]);
    }
  }
  
  return (
    <NotificationContext.Provider value={{ dispatch }}>
      <div className="notification-wrapper">
        {chunkStates
          .map((chunk) => (
            <CardNotification
              key={chunk[0]!.id}
              ids={chunk.map(({ id }) => id)}
              message={
                <div className="jk-col gap">
                  {chunk.map((note) => <div>{note.message}</div>)}
                </div>
              }
              type={chunk[0]!.type}
            />
          ))}
      </div>
      <div className="notification-wrapper-quiet">
        {state
          .filter(note => note.type === NotificationType.QUIET)
          .map((note) => (
            <CardNotification key={note.id} ids={[ note.id ]}{...note} type={NotificationType.QUIET} />
          ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
}
