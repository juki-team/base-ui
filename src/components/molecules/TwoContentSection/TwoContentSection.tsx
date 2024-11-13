import * as motion from 'framer-motion/client';
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
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      // transition={{ duration: 15 }}
    >
      {/*<AnimatePresence>*/}
      <div
        ref={ref}
        id="jk-two-content-section-first-panel"
        className="jk-col stretch top"
        // initial={{ top: '-100%', position: 'absolute' }}
        // exit={{ top: '-100%', position: 'absolute' }}
        // animate={{ top: 0, position: 'initial' }}
        // transition={{ duration: 5 }}
      >
        {children[0]}
      </div>
      {/*</AnimatePresence>*/}
      {/*<AnimatePresence>*/}
      <div
        id="jk-two-content-section-second-panel"
        className=""
        // initial={{ top: '-100%', position: 'absolute' }}
        // exit={{ top: '-100%', position: 'absolute' }}
        // animate={{ top: 0, position: 'initial' }}
        // transition={{ duration: 5 }}
      >
        {children[1]}
      </div>
      {/*</AnimatePresence>*/}
    </motion.section>
  );
}
