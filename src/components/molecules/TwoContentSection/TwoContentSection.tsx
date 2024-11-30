import { motion } from 'framer-motion';
import React, { CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { TwoContentSectionProps } from './types';

export function TwoContentSection({ children, className }: TwoContentSectionProps) {
  
  const { height = 0, ref } = useResizeDetector();
  
  return (
    <motion.section
      className={classNames('jk-two-content-section jk-col nowrap stretch', className)}
      style={{ '--first-content-section-height': height + 'px' } as CSSProperties}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        ref={ref}
        id="jk-two-content-section-first-panel"
        className="jk-col stretch top"
      >
        {children[0]}
      </div>
      <div
        id="jk-two-content-section-second-panel"
        className=""
      >
        {children[1]}
      </div>
    </motion.section>
  );
}
