import { CSSProperties } from 'react';
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
      // @ts-expect-error - webkitRequestFullscreen is a non‑standard browser API
    } else if (element.webkitRequestFullscreen) {
      // @ts-expect-error - webkitRequestFullscreen is a non‑standard browser API
      element.webkitRequestFullscreen();
      // @ts-expect-error - mozRequestFullScreen is a Firefox‑specific fullscreen API
    } else if (element.mozRequestFullScreen) {
      // @ts-expect-error - mozRequestFullScreen is a Firefox‑specific fullscreen API
      element.mozRequestFullScreen();
      // @ts-expect-error - msRequestFullscreen is an old IE/Edge proprietary API
    } else if (element.msRequestFullscreen) {
      // @ts-expect-error - msRequestFullscreen is an old IE/Edge proprietary API
      element.msRequestFullscreen();
    }
  }
}

function exitFullscreen() {
  if (typeof document != 'undefined') {
    if (document.exitFullscreen) {
      void document.exitFullscreen();
      // @ts-expect-error - webkitExitFullscreen is a non‑standard browser API
    } else if (document.webkitExitFullscreen) {
      // @ts-expect-error - webkitExitFullscreen is a non‑standard browser API
      document.webkitExitFullscreen();
      // @ts-expect-error - mozCancelFullScreen is a Firefox‑specific fullscreen API
    } else if (document.mozCancelFullScreen) {
      // @ts-expect-error - mozCancelFullScreen is a Firefox‑specific fullscreen API
      document.mozCancelFullScreen();
      // @ts-expect-error - msExitFullscreen is an old IE/Edge proprietary API
    } else if (document.msExitFullscreen) {
      // @ts-expect-error - msExitFullscreen is an old IE/Edge proprietary API
      document.msExitFullscreen();
    }
  }
}

export function PresentationToolButtons({ style }: { style: CSSProperties }) {
  
  const isFullscreen = usePageStore(store => store.isFullscreen);
  
  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          right: 'var(--pad-sm)',
          zIndex: 'var(--z-index-tool-buttons)',
          transform: 'translateY(-50%)', top: '50%',
          ...style,
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
