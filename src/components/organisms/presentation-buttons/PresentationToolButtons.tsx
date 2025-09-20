import React from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { Portal } from '../../atoms';
import { Button } from '../../atoms/Button/Button';
import { FullscreenExitIcon, FullscreenIcon } from '../../atoms/server';
import { Excalidraw } from './buttons/Excalidraw';
import { FullscreenTimer } from './buttons/FullscreenTimer';
import { Pointer } from './buttons/Pointer';

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

export const PresentationToolButtons = () => {
  
  const isFullscreen = usePageStore(store => store.isFullscreen);
  
  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 'var(--pad-sm)',
          right: 'var(--pad-sm)',
          zIndex: 'var(--z-index-tool-buttons)',
        }}
        className="jk-col gap stretch right"
      >
        {isFullscreen ? (
          <>
            <Excalidraw />
            <Pointer />
            <FullscreenTimer />
            <div className="jk-row right opacity–hover">
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
          <div className="jk-row right opacity–hover">
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
};
