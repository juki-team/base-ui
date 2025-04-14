import { AnimatePresence, motion } from 'motion/react';
import React from 'react';
import { renderReactNodeOrFunctionP1 } from '../../../helpers';
import { usePrevious } from '../../../hooks';
import { TabsInlineBodyProps } from './types';

const variants = {
  // enter: (direction: number) => {
  //   return {
  //     x: direction > 0 ? '100%' : '-100%',
  //     // opacity: 0,
  //   };
  // },
  center: {
    zIndex: 1,
    x: 0,
    // opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      // opacity: 0,
    };
  },
};

export const TabsInlineBody = <T, >({ tabs, selectedTabKey }: TabsInlineBodyProps<T>) => {
  const prevSelectedTabKey = usePrevious(selectedTabKey);
  // const prevPrevSelectedTabKey = usePrevious(prevSelectedTabKey);
  const currentIndex = Object.keys(tabs).indexOf(selectedTabKey as string);
  const prevIndex = Object.keys(tabs).indexOf(prevSelectedTabKey as string);
  // const prevPrevIndex = Object.keys(tabs).indexOf(prevPrevSelectedTabKey as string);
  const fromLeft = prevIndex < currentIndex;
  // const prevFromLeft = prevPrevIndex < currentIndex;
  const direction = fromLeft ? 1 : -1;
  // const [ render, setRender ] = useState(Date.now());
  
  return (
    <AnimatePresence
      custom={direction}
      // onExitComplete={() => setRender(Date.now())}
      // mode="wait"
      // mode="sync"
      // mode="popLayout"
    >
      {Object.values(tabs).map(tab => (
        tab.key === selectedTabKey && (
          <motion.div
            layout
            initial={{ x: fromLeft ? '100%' : '-100%' }}
            variants={variants}
            // initial="enter"
            animate="center"
            exit="exit"
            style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'auto' }}
            key={tab.key as string}
            className="jk-tabs-inline-body-motion-layout"
          >
            {/*{render && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}*/}
            {renderReactNodeOrFunctionP1(tab?.body, { selectedTabKey })}
          </motion.div>
        )
      ))}
    </AnimatePresence>
  );
};
