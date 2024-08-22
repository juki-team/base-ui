import { SocketEvent } from '@juki-team/commons';
import { useCallback, useState } from 'react';
import { useJukiUser } from './useJukiUser';

export const useJukiSocket = (message: SocketEvent) => {
  const { socket } = useJukiUser();
  const [ messages, setMessages ] = useState<any[]>([]);
  
  return {
    messages,
    reloadSession: useCallback(async () => {
      // await socket.leaveSession();
      // await socket.joinSession();
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
