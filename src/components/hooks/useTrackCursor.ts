import { useSpace } from '@ably/spaces/dist/mjs/react';
import { consoleError, consoleWarn } from '@juki-team/commons';
import { RefObject, useEffect, useState } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useTrackCursor = (offsetRef: RefObject<{ x: number, y: number, zoom: number }>) => {
  
  const { nickname, imageUrl } = useUserStore((state) => state.user);
  const { space } = useSpace();
  const [ enteredSpace, setEnteredSpace ] = useState(false);
  
  useEffect(() => {
    let cancelled = false;

    const leaveSpace = async () => {
      try {
        await space?.leave();
      } catch (error) {
        consoleWarn('Leaving space error', error);
      } finally {
        if (!cancelled) {
          setEnteredSpace(false);
        }
      }
    };

    const fun = async () => {
      await leaveSpace();
      if (cancelled) {
        return;
      }
      if (space) {
        try {
          await space.enter({
            username: nickname,
            avatar: imageUrl,
          });
          if (!cancelled) {
            setEnteredSpace(true);
          }
        } catch (error) {
          consoleError(error);
          if (!cancelled) {
            setEnteredSpace(false);
          }
        }
      }
    };
    void fun();
    return () => {
      cancelled = true;
      void leaveSpace();
    };
  }, [ imageUrl, nickname, space ]);
  
  useEffect(() => {
    if (space && enteredSpace) {
      let rafId: number | null = null;
      const move = (e: MouseEvent) => {
        if (rafId !== null) {
          return;
        }
        rafId = requestAnimationFrame(() => {
          void space.cursors.set({
            position: {
              x: offsetRef.current.x + e.clientX / offsetRef.current.zoom,
              y: offsetRef.current.y + e.clientY / offsetRef.current.zoom,
            },
            data: {},
          });
          rafId = null;
        });
      };
      window.addEventListener('mousemove', move);

      return () => {
        window.removeEventListener('mousemove', move);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
      };
    }

    return () => null;
  }, [ space, enteredSpace, offsetRef ]);
};
