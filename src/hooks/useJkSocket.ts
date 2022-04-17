import { consoleWarn } from '@juki-team/commons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { socket } from '../services';

export const useJkSocket = (message: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const triesRef = useRef(1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const listener = useCallback((result: any) => setMessages(prevState => ([...prevState, result])), []);
  
  useEffect(() => {
    const on = () => {
      const success = socket.on(message, listener);
      consoleWarn(`socket.on(${message}): ${success}`);
      if (!success) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        triesRef.current *= 1.2;
        timeoutRef.current = setTimeout(on, triesRef.current * 1000);
      }
    };
    
    // console.log('useEffect', { message, listener, on: socket.on(message, listener) });
    socket.off(message, listener);
    // if (!socket.on(message, listener)) {
    on();
    // }
    return () => {
      socket.off(message, listener);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [listener, message]);
  
  return {
    messages,
    pop: useCallback(() => {
      if (messages.length) {
        const message = messages[0];
        setMessages(prevState => (prevState.splice(1)));
        return message;
      }
      return null;
    }, [messages]),
  };
};