import { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { TwoContentSectionProps } from './types';

export function TwoContentSection({ children, className }: TwoContentSectionProps) {
  
  const { height = 0, ref } = useResizeDetector();
  
  return (
    <section
      className={classNames('jk-two-content-section jk-col nowrap stretch', className)}
      style={{ '--first-content-section-height': height + 'px' } as CSSProperties}
    >
      <div
        ref={ref}
        id="jk-two-content-section-first-panel"
        className="jk-col stretch top"
      >
        {children[0]}
      </div>
      <div id="jk-two-content-section-second-panel">
        {children[1]}
      </div>
    </section>
  );
}
