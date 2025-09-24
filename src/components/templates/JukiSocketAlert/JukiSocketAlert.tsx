import { Status } from '@juki-team/commons';
import { useWebsocketStore } from '../../../stores/websocket/useWebsocketStore';
import { ButtonLoader } from '../../molecules';
import { ErrorIcon } from '../../server';

export const JukiSocketAlert = () => {
  
  const isConnected = useWebsocketStore(state => state.isConnected);
  const websocket = useWebsocketStore(store => store.websocket);
  
  return !isConnected && (
    <div
      style={{ position: 'fixed', left: 'var(--pad-md)', bottom: 'var(--pad-md', zIndex: 1000000 }}
    >
      <ButtonLoader
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="offline, click to try to reconnect"
        className="jk-row bc-er"
        onClick={async (setLoader) => {
          setLoader(Status.LOADING);
          if (websocket.getReadyState() !== WebSocket.OPEN) {
            await websocket.reconnect();
          }
          setLoader(Status.NONE);
        }}
        icon={<ErrorIcon />}
        size="small"
      />
    </div>
  );
};
