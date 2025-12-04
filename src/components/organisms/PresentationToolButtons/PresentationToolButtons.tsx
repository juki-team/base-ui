import { CSSProperties } from 'react';
import { Portal } from '../../atoms';
import { DesignServicesIcon } from '../../atoms/server';
import { ExcalidrawButton } from '../_layz_/ExcalidrawButton';
import { FullscreenTimerButton } from './buttons/FullscreenTimerButton';
import { FullscreenToggleButton } from './buttons/FullscreenToggleButton';
import { PointerButton } from './buttons/PointerButton';

export function PresentationToolButtons({ style }: { style?: CSSProperties }) {
  return (
    <Portal>
      <div style={style} className="jk-col gap stretch right presentation-tool-buttons opacity-hover-4">
        <div className="jk-row right">
          <DesignServicesIcon
            size="tiny"
            data-tooltip-id="jk-tooltip"
            data-tooltip-content="page tools"
          />
        </div>
        <FullscreenTimerButton />
        <ExcalidrawButton />
        <PointerButton />
        <FullscreenToggleButton />
      </div>
    </Portal>
  );
}
