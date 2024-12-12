import { Status } from '@juki-team/commons';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useJukiUser } from '../../../hooks';
import { jukiApiSocketManager } from '../../../settings';
import { ErrorIcon } from '../../atoms';
import { ButtonLoader } from '../../molecules';

export const JukiSocketAlert = () => {
  
  const [ timestamp, setTimestamp ] = useState(0);
  const { user: { sessionId } } = useJukiUser();
  const [ readyState, setReadyState ] = useState<number>(WebSocket.CLOSED);
  
  useEffect(() => {
    setReadyState(jukiApiSocketManager.SOCKET.getReadyState());
  }, [ sessionId, timestamp ]);
  
  return !(readyState === WebSocket.OPEN) && (
    <div
      style={{ position: 'fixed', left: 'var(--pad-md)', bottom: 'var(--pad-md', zIndex: 1000000 }}
    >
      <ButtonLoader
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="offline, click to try to reconnect"
        className="jk-row bc-er"
        style={{ '--button-background-color': 'var(--t-color-error)' } as CSSProperties}
        onClick={async (setLoader) => {
          setLoader(Status.LOADING);
          if (jukiApiSocketManager.SOCKET.getReadyState() !== WebSocket.OPEN) {
            await jukiApiSocketManager.SOCKET.start();
          }
          setTimestamp(Date.now());
          setLoader(Status.NONE);
        }}
        icon={<ErrorIcon />}
        size="small"
      />
    </div>
  );
};
