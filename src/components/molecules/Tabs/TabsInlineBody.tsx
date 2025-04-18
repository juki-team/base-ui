import { AnimatePresence, motion } from 'motion/react';
import React, { Children, useMemo } from 'react';
import { renderReactNodeOrFunctionP1 } from '../../../helpers';
import { Duration } from '../../../types';
import { TabsInlineBodyProps } from './types';

export const TabsInlineBody = <T = string, >({ tabs, selectedTabKey, preload }: TabsInlineBodyProps<T>) => {
  
  const selectedTab = tabs[selectedTabKey as string];
  
  const tabsRendered = useMemo(() => {
    if (preload) {
      return Object.values(tabs).map(tab => renderReactNodeOrFunctionP1(tab.body, { selectedTabKey: tab.key }));
    }
    return [];
  }, [ tabs, preload ]);
  
  return (
    <AnimatePresence mode="wait">
      <div style={{ display: 'none' }}>
        {Children.toArray(tabsRendered)}
      </div>
      {selectedTab && (
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: Duration.FAST, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: Duration.FAST, ease: 'easeIn' } }}
          transition={{ ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
          key={selectedTabKey as string}
          className="jk-tabs-inline-body-motion-layout"
        >
          {renderReactNodeOrFunctionP1(selectedTab?.body, { selectedTabKey })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
