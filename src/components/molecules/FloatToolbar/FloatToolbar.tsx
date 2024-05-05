import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { ButtonAction } from './ButtonAction';
import { FloatToolbarProps } from './types';

export const FloatToolbar = ({ actionButtons, placement = 'rightBottom' }: FloatToolbarProps) => {
  
  const { ref, width = 0 } = useResizeDetector();
  
  return (
    <div className={classNames('jk-float-toolbar-layout', placement)}>
      <div
        className="jk-float-toolbar-container"
        ref={ref}
        style={{ '--container-width': `${width}px` } as CSSProperties}
      >
        {actionButtons.map((props, index) => <ButtonAction {...props} key={index} />)}
      </div>
    </div>
  );
};
