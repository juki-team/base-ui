import { AnimatePresence, motion } from 'motion/react';
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

// const slideVariants: Variants = {
//   enter: (direction: number) => {
//     console.log('enter', { direction });
//     return {
//       x: direction > 0 ? '100%' : '-100%',
//       opacity: 0.6,
//       position: 'absolute',
//       // display: 'none',
//     };
//   },
//   center: {
//     x: 0,
//     opacity: 1,
//     position: 'relative',
//     // display: 'initial',
//   },
//   exit: (direction: number) => {
//     console.log('exit', { direction });
//     return {
//       x: direction > 0 ? '-100%' : '100%',
//       opacity: 0.6,
//       position: 'absolute',
//       // display: 'none',
//     };
//   },
// };

export const TabsInlineBody = <T = string, >({ tabs, selectedTabKey }: TabsInlineBodyProps<T>) => {
  
  const prevSelectedTabKey = usePrevious(selectedTabKey);
  
  const currentIndex = Object.keys(tabs).indexOf(selectedTabKey as string);
  const prevIndex = Object.keys(tabs).indexOf(prevSelectedTabKey as string);
  const fromLeft = prevIndex < currentIndex;
  const direction = fromLeft ? 1 : -1;
  const selectedTab = tabs[selectedTabKey as string];
  
  console.log({ direction });
  
  return (
    <AnimatePresence mode="wait">
      {selectedTab && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { ease: 'easeIn' } }}
          transition={{ ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
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
