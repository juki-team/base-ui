import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { TwoContentSectionProps } from './types';

export function TwoContentSection({ children, className }: TwoContentSectionProps) {
  
  const { height, ref } = useResizeDetector();
  
  return (
    <section
      className={classNames('two-content-section jk-col nowrap', className)}
      style={{ '--first-content-section-height': height + 'px' } as CSSProperties}
    >
      <div ref={ref} id="jk-two-content-section-first-panel">
        {children[0]}
      </div>
      <div id="jk-two-content-section-second-panel">
        {children[1]}
      </div>
    </section>
  );
}
