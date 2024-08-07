import { consoleInfo, consoleWarn, SocketEvent } from '@juki-team/commons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useJukiUser } from './useJukiUser';

export const useJukiSocket = (message: SocketEvent) => {
  const { socket } = useJukiUser();
  const [ messages, setMessages ] = useState<any[]>([]);
  const triesRef = useRef(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const listener = useCallback((result: any) => setMessages(prevState => (
    [ ...prevState, result ]
  )), []);
  
  useEffect(() => {
    const on = () => {
      const success = socket.on(message, listener);
      if (success) {
        consoleWarn(`socket.on(${message}): failed, will try again`);
      } else {
        consoleInfo(`socket.on(${message}): success`);
      }
      
      if (!success) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        triesRef.current *= 1.2;
        timeoutRef.current = setTimeout(on, triesRef.current * 1000);
      }
    };
    
    on();
    
    return () => {
      socket.off(message, listener);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [ listener, message, socket ]);
  
  return {
    messages,
    reloadSession: useCallback(async () => {
      await socket.leaveSession();
      await socket.joinSession();
    }, [ socket ]),
    pop: useCallback(() => {
      if (messages.length) {
        const message = messages[0];
        setMessages(prevState => (
          prevState.splice(1)
        ));
        return message;
      }
      return null;
    }, [ messages ]),
  };
};
