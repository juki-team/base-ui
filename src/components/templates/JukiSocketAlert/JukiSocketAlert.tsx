import { Status } from '@juki-team/commons';
import React, { CSSProperties, useState } from 'react';
import { useJukiUser } from '../../../hooks';
import { ErrorIcon } from '../../atoms';
import { ButtonLoader } from '../../molecules';

export const JukiSocketAlert = () => {
  
  const { socket } = useJukiUser();
  const [ _, setTimestamp ] = useState(0);
  
  const readyState = socket.getReadyState();
  
  return !(readyState === WebSocket.OPEN) && (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content="offline, try to reconnect"
      data-tooltip-t-class-name="tt-se"
      style={{ position: 'fixed', left: 'var(--pad-md)', bottom: 'var(--pad-md', zIndex: 1000000 }}
    >
      <ButtonLoader
        className="jk-row bc-er"
        style={{ '--button-background-color': 'var(--t-color-error)' } as CSSProperties}
        onClick={(setLoader) => {
          setLoader(Status.LOADING);
          socket.start();
          setTimeout(() => {
            setTimestamp(Date.now());
            setLoader(Status.NONE);
          }, 1000);
        }}
        icon={<ErrorIcon />}
        size="small"
      />
    </div>
  );
};
