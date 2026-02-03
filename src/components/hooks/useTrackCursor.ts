import { useSpace } from '@ably/spaces/dist/mjs/react';
import { consoleError, consoleWarn } from '@juki-team/commons';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';
import { useStableRef } from './useStableRef';

export const useTrackCursor = (offsetRef = { x: 0, y: 0 }) => {
  
  const { nickname, imageUrl } = useUserStore((state) => state.user);
  const { space } = useSpace();
  const [ enteredSpace, setEnteredSpace ] = useState(false);
  
  useEffect(() => {
    
    const leaveSpace = async () => {
      try {
        await space?.leave();
      } catch (error) {
        consoleWarn('Leaving space error', error);
      } finally {
        setEnteredSpace(false);
      }
    };
    
    const fun = async () => {
      await leaveSpace();
      if (space) {
        try {
          await space.enter({
            username: nickname,
            avatar: imageUrl,
          });
          setEnteredSpace(true);
        } catch (error) {
          consoleError(error);
          setEnteredSpace(false);
        }
      }
    };
    void fun();
    return () => {
      void leaveSpace();
    };
  }, [ imageUrl, nickname, space ]);
  
  const offset = useStableRef(offsetRef);
  
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (space && enteredSpace) {
        void space.cursors.set({
          position: { x: offset.current.x + e.clientX, y: offset.current.y + e.clientY },
          data: {},
        });
      }
    };
    
    window.addEventListener('mousemove', move);
    
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [ space, offset, enteredSpace ]);
};
