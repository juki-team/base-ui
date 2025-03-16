import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { classNames, getTextContent } from '../../../helpers';
import { useJukiNotification, useJukiUI, usePageStore } from '../../../hooks';
import { CloseIcon } from '../../atoms';
import { NOTIFICATION_ICON } from './constants';
import { NotificationProps, NotificationType } from './types';

export const CardNotification = ({ id, type, message }: NotificationProps) => {
  
  const [ exit, setExit ] = useState(false);
  const [ width, setWidth ] = useState(0);
  const intervalIDRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { removeNotification } = useJukiNotification();
  const { viewPortSize } = useJukiUI();
  
  const messageString = getTextContent(message);
  const handleStartTimer = useCallback(() => {
    const newIntervalId = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 10000 / (/* 5 * NOTIFICATION_TIME[type]*/ messageString.length / 5 * 1000 + 3000);
        }
        clearInterval(newIntervalId);
        setExit(true);
        return prev;
      });
    }, 50);
    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current);
    }
    intervalIDRef.current = newIntervalId;
  }, [ messageString.length ]);
  
  const handleStopTimer = () => {
    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current);
    }
  };
  
  const isPageFocus = usePageStore(state => state.isFocus);
  const isPageVisible = usePageStore(state => state.isVisible);
  
  useEffect(() => {
    if (isPageVisible && isPageFocus) {
      handleStartTimer();
    } else {
      handleStopTimer();
    }
    
    return () => {
      if (intervalIDRef.current) {
        clearInterval(intervalIDRef.current);
      }
    };
  }, [ handleStartTimer, isPageVisible, isPageFocus ]);
  
  useEffect(() => {
    if (exit) {
      setTimeout(() => removeNotification(id), 400);
    }
  }, [ exit, id, removeNotification ]);
  
  return (
    <div
      // onMouseEnter={type !== NotificationType.QUIET ? handleStopTimer : undefined}
      // onMouseLeave={type !== NotificationType.QUIET ? handleStartTimer : undefined}
      onMouseEnter={handleStopTimer}
      onMouseLeave={handleStartTimer}
      className={classNames('jk-notification-item-container', type, { exit })}
      style={type === NotificationType.QUIET && viewPortSize !== 'sm' ? { '--width-notification': `${getTextContent(message).length * 8 + 26}px` } as CSSProperties : {}}
    >
      <div className={classNames('jk-notification-item elevation-2 jk-br-ie')}>
        {NOTIFICATION_ICON[type]}
        <div className="jk-row stretch space-between nowrap flex-1">
          <div
            className={classNames('jk-notification-message-content jk-row flex-1', {
              'text-message': typeof message === 'string',
              'wb-bw': true,
            })}
          >
            {typeof message === 'string' ? <span className="tt-se">{message}</span> : message}
          </div>
          <div className="jk-col">
            <div className={classNames('jk-button light only-icon', { tiny: type === 'quiet' })}>
              <CloseIcon onClick={() => setExit(true)} />
            </div>
          </div>
        </div>
        <div className="bar" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};
