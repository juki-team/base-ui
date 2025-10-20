import { type  CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../helpers';
import { ButtonAction } from '../ButtonAction/ButtonAction';
import type { FloatToolbarProps } from './types';

export function FloatToolbar({ actionButtons, placement = 'rightTop', className }: FloatToolbarProps) {
  
  const { ref, width = 0, height = 0 } = useResizeDetector();
  
  if (actionButtons.length) {
    return (
      <div className={classNames('jk-float-toolbar-layout', placement, className)}>
        <div
          className="jk-float-toolbar-container jk-col gap stretch right"
          ref={ref}
          style={{
            '--jk-float-toolbar-container-width': `${width}px`,
            '--jk-float-toolbar-container-height': `${height}px`,
            right: placement === 'out rightTop' ? `calc(-${width}px - var(--gap))` : undefined,
          } as CSSProperties}
        >
          {actionButtons.map((props, index) => <ButtonAction {...props} placement={placement} key={index} />)}
        </div>
      </div>
    );
  }
  
  return null;
}
