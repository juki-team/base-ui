import React, { CSSProperties, ReactNode } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../helpers';

export interface TwoContentSectionProps {
  children: [ ReactNode | JSX.Element | undefined, ReactNode | JSX.Element | undefined ],
  className?: string,
}

export function TwoContentSection({ children, className }: TwoContentSectionProps) {
  const { height, ref } = useResizeDetector();
  
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
