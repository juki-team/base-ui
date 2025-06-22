import { motion } from 'motion/react';
import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { Duration } from '../../../types';
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
      <motion.div
        id="jk-two-content-section-second-panel"
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: Duration.LOW } }}
      >
        {children[1]}
      </motion.div>
    </section>
  );
}
