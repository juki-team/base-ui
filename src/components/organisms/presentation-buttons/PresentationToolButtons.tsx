import React from 'react';
import { Excalidraw } from './buttons/Excalidraw';
import { FullscreenTimer } from './buttons/FullscreenTimer';
import { Pointer } from './buttons/Pointer';

export const PresentationToolButtons = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--pad-sm)',
        right: 'var(--pad-sm)',
        zIndex: 1,
      }}
      className="jk-col gap stretch right"
    >
      <Excalidraw />
      <Pointer />
      <FullscreenTimer />
    </div>
  );
};
