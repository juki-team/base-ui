import { useSpace } from '@ably/spaces/dist/mjs/react';
import { consoleError, consoleWarn } from '@juki-team/commons';
import { RefObject, useEffect, useState } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useTrackCursor = (offsetRef: RefObject<{ x: number, y: number, zoom: number }>) => {
  
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
  
  useEffect(() => {
    if (space && enteredSpace) {
      const move = (e: MouseEvent) => {
        
        void space.cursors.set({
          position: {
            x: offsetRef.current.x + e.clientX / offsetRef.current.zoom,
            y: offsetRef.current.y + e.clientY / offsetRef.current.zoom,
          },
          data: {},
        });
        
      };
      window.addEventListener('mousemove', move);
      
      return () => {
        window.removeEventListener('mousemove', move);
      };
    }
    
    return () => null;
  }, [ space, enteredSpace, offsetRef ]);
};
