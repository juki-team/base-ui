import { usePageStore } from '../../../stores/page/usePageStore';
import { Button, Portal } from '../../atoms';
import { FullscreenExitIcon, FullscreenIcon } from '../../atoms/server';
import { ExcalidrawButton } from '../_layz_/ExcalidrawButton';
import { FullscreenTimerButton } from './buttons/FullscreenTimerButton';
import { PointerButton } from './buttons/PointerButton';

function enterFullscreen() {
  if (typeof document != 'undefined') {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      void element.requestFullscreen();
      // @ts-ignore
    } else if (element.webkitRequestFullscreen) {
      // @ts-ignore
      element.webkitRequestFullscreen();
      // @ts-ignore
    } else if (element.mozRequestFullScreen) {
      // @ts-ignore
      element.mozRequestFullScreen();
      // @ts-ignore
    } else if (element.msRequestFullscreen) {
      // @ts-ignore
      element.msRequestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (typeof document != 'undefined') {
    if (document.exitFullscreen) {
      void document.exitFullscreen();
      // @ts-ignore
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore
      document.webkitExitFullscreen();
      // @ts-ignore
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore
      document.mozCancelFullScreen();
      // @ts-ignore
    } else if (document.msExitFullscreen) {
      // @ts-ignore
      document.msExitFullscreen();
    }
  }
}

export function PresentationToolButtons() {
  
  const isFullscreen = usePageStore(store => store.isFullscreen);
  
  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          right: 'var(--pad-sm)',
          zIndex: 'var(--z-index-tool-buttons)',
          ...(isFullscreen
            ? { transform: 'translateY(-50%)', top: '50%' }
            : { transform: 'translateY(-50%)', top: '50%' }),
        }}
        className="jk-col gap stretch right presentation-tool-buttons"
      >
        <ExcalidrawButton />
        <PointerButton />
        <FullscreenTimerButton />
        {isFullscreen ? (
          <>
            <div className="jk-row right opacity-hover">
              <Button
                tooltipContent="exit fullscreen"
                type="light"
                size="tiny"
                icon={<FullscreenExitIcon />}
                onClick={() => exitFullscreen()}
              />
            </div>
          </>
        ) : (
          <div className="jk-row right opacity-hover">
            <Button
              tooltipContent="fullscreen"
              type="light"
              size="tiny"
              icon={<FullscreenIcon />}
              onClick={() => enterFullscreen()}
            />
          </div>
        )}
      </div>
    </Portal>
  );
}
