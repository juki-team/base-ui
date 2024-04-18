import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { TwoContentSectionProps } from './types';

export function TwoContentSection({ children, className }: TwoContentSectionProps) {
  
  const { height, ref } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  
  return (
    <section
      className={classNames('two-content-section jk-col nowrap', className)}
      style={{ '--first-content-section-height': height + 'px' } as CSSProperties}
    >
      <div ref={ref}>
        {children[0]}
      </div>
      <div>
        {children[1]}
      </div>
    </section>
  );
}
