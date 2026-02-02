import { useSpace } from '@ably/spaces/dist/mjs/react';
import { useEffect } from 'react';
import { useUserStore } from '../../stores/user/useUserStore';

export const useTrackCursor = (offset = { x: 0, y: 0 }) => {
  
  const { nickname, imageUrl } = useUserStore((state) => state.user);
  const { space } = useSpace();
  
  useEffect(() => {
    
    const leaveSpace = async () => {
      try {
        await space?.leave();
      } catch (error) {
        console.warn('leaving space error', error);
      }
    };
    
    const fun = async () => {
      if (space) {
        await leaveSpace();
        try {
          await space.enter({
            username: nickname,
            avatar: imageUrl,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };
    void fun();
    return () => {
      void leaveSpace();
    };
  }, [ imageUrl, nickname, space ]);
  
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (space) {
        void space.cursors.set({ position: { x: offset.x + e.clientX, y: offset.y + e.clientY }, data: {} });
      }
    };
    
    window.addEventListener('mousemove', move);
    
    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, [ space, offset.x, offset.y ]);
};
