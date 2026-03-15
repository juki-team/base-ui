import { Button, T } from '../../../../../atoms';
import { FullscreenExitIcon, FullscreenIcon, LoadingIcon, MinusIcon, PlusIcon, RefreshIcon } from '../../../../../atoms/server';
import type { GraphicToolbarProps } from './types';

export function GraphicToolbar(props: GraphicToolbarProps) {
  const { zoom, isRendering, isFullscreen, onZoom, onReset, onToggleFullscreen } = props;

  return (
    <div className="jk-row gap jk-pg-xsm">
      <Button onClick={() => onZoom(-0.1)} icon={<MinusIcon size="small" />} size="tiny" type="tertiary" />
      <span style={{ minWidth: '42px', textAlign: 'center', fontSize: '0.8rem', userSelect: 'none' }}>
        {Math.round(zoom * 100)}%
      </span>
      <Button onClick={() => onZoom(0.1)} icon={<PlusIcon size="small" />} size="tiny" type="tertiary" />
      <div style={{ width: '1px', height: '16px', background: 'var(--t-color-gray-4)', margin: '0 4px' }} />
      <Button onClick={() => onZoom(1 - zoom)} size="tiny" type="tertiary">
        100%
      </Button>
      <Button onClick={() => onZoom(2 - zoom)} size="tiny" type="tertiary">
        200%
      </Button>
      <Button onClick={onReset} icon={<RefreshIcon size="small" />} size="tiny" type="tertiary">
        <T className="tt-se">reset</T>
      </Button>
      <div style={{ flex: 1 }} />
      {isRendering && <LoadingIcon size="small" />}
      <Button
        onClick={onToggleFullscreen}
        icon={isFullscreen ? <FullscreenExitIcon size="small" /> : <FullscreenIcon size="small" />}
        size="tiny"
        type="tertiary"
      />
    </div>
  );
}
