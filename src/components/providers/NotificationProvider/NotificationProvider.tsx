import { NotificationType } from '@juki-team/commons/enums';
import { useReducer } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useSoundStore } from '../../../stores/sound/useSoundStore';
import { CardNotification } from '../../organisms/CardNotification/CardNotification';
import { NotificationContext } from '../../organisms/CardNotification/context';
import {
  NotificationAction,
  type NotificationActionsTypes,
  type NotificationProps,
  type NotificationProviderProps,
} from '../../organisms/CardNotification/types';

export function NotificationProvider({ children }: NotificationProviderProps) {
  const sound = useSoundStore();

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
  const [state, dispatch] = useReducer((state: NotificationProps[], action: NotificationActionsTypes) => {
    switch (action.type) {
      case NotificationAction.ADD_NOTIFICATION:
        if (action.payload.type === NotificationType.SUCCESS && !action.payload.silent) {
          void sound.playSuccess();
        }
        if (action.payload.type === NotificationType.INFO && !action.payload.silent) {
          void sound.playNotification();
        }
        if (action.payload.type === NotificationType.ERROR && !action.payload.silent) {
          void sound.playError();
        }
        if (action.payload.type === NotificationType.WARNING && !action.payload.silent) {
          void sound.playWarning();
        }
        return [...state, { ...action.payload }];
      case NotificationAction.REMOVE_NOTIFICATION:
        return state.filter((notification) => notification.id !== action.notificationId);
      default:
        return state;
    }
  }, []);

  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);

  const notificationsFiltered = state.filter((note) => note.type !== NotificationType.QUIET);

  const notifications = isSmallScreen ? [...notificationsFiltered].reverse() : notificationsFiltered;

  const chunkStates: (typeof notifications)[] = [];
  for (const note of notifications) {
    const lastChunk = chunkStates[chunkStates.length - 1];
    if (lastChunk && lastChunk[0]?.type === note.type) {
      lastChunk.push(note);
    } else {
      chunkStates.push([note]);
    }
  }

  return (
    <NotificationContext.Provider value={{ dispatch }}>
      {children}
      <div className="notification-wrapper">
        {chunkStates.map((chunk) => {
          const head = chunk[0];
          if (!head) return null;
          return (
            <CardNotification
              key={head.id}
              ids={chunk.map(({ id }) => id)}
              message={
                <div className="jk-col gap">
                  {chunk.map((note) => (
                    <div key={note.id}>{note.message}</div>
                  ))}
                </div>
              }
              type={head.type}
            />
          );
        })}
      </div>
      <div className="notification-wrapper-quiet">
        {state
          .filter((note) => note.type === NotificationType.QUIET)
          .map((note) => (
            <CardNotification key={note.id} ids={[note.id]} {...note} type={NotificationType.QUIET} />
          ))}
      </div>
    </NotificationContext.Provider>
  );
}
