import React from 'react';
import { Portal } from '../../atoms';
import { Excalidraw } from './buttons/Excalidraw';
import { FullscreenTimer } from './buttons/FullscreenTimer';
import { Pointer } from './buttons/Pointer';

export const PresentationToolButtons = () => {
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
        <Excalidraw />
        <Pointer />
        <FullscreenTimer />
      </div>
    </Portal>
  );
};
