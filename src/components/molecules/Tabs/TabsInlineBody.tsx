import { AnimatePresence, motion, Variants } from 'motion/react';
import React from 'react';
import { renderReactNodeOrFunctionP1 } from '../../../helpers';
import { usePrevious } from '../../../hooks';
import { TabsInlineBodyProps } from './types';

// const variants = {
//   // enter: (direction: number) => {
//   //   return {
//   //     x: direction > 0 ? '100%' : '-100%',
//   //     // opacity: 0,
//   //   };
//   // },
//   center: {
//     zIndex: 1,
//     x: 0,
//     // opacity: 1,
//   },
//   exit: (direction: number) => {
//     return {
//       zIndex: 0,
//       x: direction < 0 ? '100%' : '-100%',
//       // opacity: 0,
//     };
//   },
// };

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    // opacity: 0,
    // position: 'absolute',
  }),
  center: {
    x: 0,
    // opacity: 1,
    // position: 'relative',
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    // opacity: 0,
    // position: 'absolute',
  }),
};

export const TabsInlineBody = <T = string, >({ tabs, selectedTabKey }: TabsInlineBodyProps<T>) => {
  
  const prevSelectedTabKey = usePrevious(selectedTabKey);
  
  const currentIndex = Object.keys(tabs).indexOf(selectedTabKey as string);
  const prevIndex = Object.keys(tabs).indexOf(prevSelectedTabKey as string);
  const fromLeft = prevIndex < currentIndex;
  const direction = fromLeft ? 1 : -1;
  const selectedTab = tabs[selectedTabKey as string];
  
  return (
    <AnimatePresence initial={false} custom={direction}>
      {selectedTab && (
        <motion.div
          layout
          layoutId="tabs-body-layout"
          // initial={{ x: fromLeft ? '100%' : '-100%' }}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ease: 'easeInOut' }}
          style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'auto' }}
          key={selectedTabKey as string}
          className="jk-tabs-inline-body-motion-layout"
        >
          {/*{render && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}*/}
          {renderReactNodeOrFunctionP1(selectedTab?.body, { selectedTabKey })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
