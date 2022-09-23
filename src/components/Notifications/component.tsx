import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { classNames, getTextContent } from '../../helpers';
import { CloseIcon } from '../graphics';
import { useJukiBase } from '../Provider';
import { NOTIFICATION_ICON } from './constants';
import { useNotification } from './context';
import { NotificationProps, NotificationType } from './types';

export const Notification = ({ id, type, message }: NotificationProps) => {
  
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(0);
  const intervalIDRef = useRef<ReturnType<typeof setTimeout>>();
  const { removeNotification } = useNotification();
  
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
  }, [messageString.length]);
  
  const handleStopTimer = () => {
    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current);
    }
  };
  const { isPageVisible } = useJukiBase();
  
  useEffect(() => {
    if (isPageVisible) {
      handleStartTimer();
    } else {
      handleStopTimer();
    }
    
    return () => {
      if (intervalIDRef.current) {
        clearInterval(intervalIDRef.current);
      }
    };
  }, [handleStartTimer, isPageVisible]);
  
  useEffect(() => {
    if (exit) {
      setTimeout(() => removeNotification(id), 400);
    }
  }, [exit, id, removeNotification]);
  
  return (
    <div
      onMouseEnter={type !== NotificationType.QUIET ? handleStopTimer : undefined}
      onMouseLeave={type !== NotificationType.QUIET ? handleStartTimer : undefined}
      className={classNames('notification-item-container', type, { exit })}
      style={type === NotificationType.QUIET ? { '--width-notification': `${getTextContent(message).length * 8}px` } as CSSProperties : {}}
    >
      <div className={classNames('notification-item')}>
        {NOTIFICATION_ICON[type]}
        <div className="jk-row stretch space-between nowrap">
          <div className={classNames('message-content jk-row', { 'text-message': typeof message === 'string' })}>
            {typeof message === 'string' ? <span className="text-sentence-case">{message}</span> : message}
          </div>
          <div><CloseIcon onClick={() => setExit(true)} className="cursor-pointer" /></div>
        </div>
        <div className="bar" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};
