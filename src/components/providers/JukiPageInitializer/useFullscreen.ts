import { useEffect } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';

export const useFullscreen = () => {
  const setIsFullscreen = usePageStore((store) => store.setIsFullscreen);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const estaEnPantallaCompleta = () => {
        return !!(
          (
            document.fullscreenElement || // Estándar
            // @ts-expect-error
            document.webkitFullscreenElement || // Safari
            // @ts-expect-error
            document.mozFullScreenElement || // Firefox
            // @ts-expect-error
            document.msFullscreenElement
          ) // IE/Edge antiguos
        );
      };
      setIsFullscreen(estaEnPantallaCompleta());
    };

    window.addEventListener('fullscreenchange', updateOnlineStatus);
    window.addEventListener('webkitfullscreenchange', updateOnlineStatus);
    window.addEventListener('mozfullscreenchange', updateOnlineStatus);
    window.addEventListener('MSFullscreenChange', updateOnlineStatus);
    window.addEventListener('msFullscreenChange', updateOnlineStatus);

    return () => {
      window.removeEventListener('fullscreenchange', updateOnlineStatus);
      window.removeEventListener('webkitfullscreenchange', updateOnlineStatus);
      window.removeEventListener('mozfullscreenchange', updateOnlineStatus);
      window.removeEventListener('MSFullscreenChange', updateOnlineStatus);
      window.removeEventListener('msFullscreenChange', updateOnlineStatus);
    };
  }, [setIsFullscreen]);
};
