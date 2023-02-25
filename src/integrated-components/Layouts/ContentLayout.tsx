import { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';

export function TwoContentSection({ children }) {
  const { height, ref } = useResizeDetector();
  
  return (
    <section
      className="two-content-section jk-col nowrap"
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
