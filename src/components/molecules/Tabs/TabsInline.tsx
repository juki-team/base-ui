import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import React, { Children, useCallback, useId, useRef, useState } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { Func, useHandleState, useMemoizedArray, usePrevious } from '../../../hooks';
import { useWidthResizer } from '../../../hooks/useWidthResizer';
import { NotUndefined } from '../../../types';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../atoms';
import { TabsInlineProps, TabsType } from './types';

export const TabsInline = <T, >(props: TabsInlineProps<T>) => {
  
  const {
    tabs,
    selectedTabKey: _selectedTabKey,
    onChange,
    extraNodes,
    extraNodesPlacement = 'right',
    className,
  } = props;
  
  const tabsArray = Object.values(tabs);
  const [ selectedTabKey, setSelectedTabKey ] = useHandleState<T>((tabsArray[0]?.key || '') as NotUndefined<T>, _selectedTabKey as NotUndefined<T> | undefined, onChange);
  const tabsLength = tabsArray.length;
  const [ oneTabView, setOneTabView ] = useState(false);
  const selectedTabIndex = tabsArray.findIndex(({ key }) => key === selectedTabKey);
  const tabKeys = useMemoizedArray(Object.keys(tabs));
  
  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);
  const maxWidthWithArrows = useRef(0);
  const onOverflow = useCallback(() => {
    if (refB.current?.offsetWidth && !oneTabView) {
      setOneTabView(true);
      maxWidthWithArrows.current = Math.max(maxWidthWithArrows.current, refB.current.offsetWidth);
    }
  }, [ refB, oneTabView ]);
  const unOverflow = useCallback(async () => {
    if (refB.current?.offsetWidth) {
      if (refB.current.offsetWidth > maxWidthWithArrows.current) {
        setOneTabView(false);
      }
    }
  }, [ refB ]);
  
  useWidthResizer({ onOverflow, unOverflow, targetRef: refB, trigger: tabKeys });
  
  const displayedTabs = oneTabView ? (tabsArray[selectedTabIndex] ? [ tabsArray[selectedTabIndex] ] : []) : tabsArray;
  const layoutId = useId();
  
  return (
    <>
      <div className={classNames('jk-row gap space-between nowrap jk-tabs-inline extend', className)}>
        {extraNodesPlacement === 'left' && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map(action => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
            )))}
          </div>
        )}
        <div className="jk-row left gap extend" style={{ overflow: 'auto' }} ref={refB}>
          {oneTabView && (
            <NavigateBeforeIcon
              className={classNames('br-50-pc', {
                'appearance-secondary clickable elevation': (selectedTabIndex - 1 >= 0),
                'appearance-gray-5': !(selectedTabIndex - 1 >= 0),
              })}
              style={{ padding: 2 }}
              onClick={!(selectedTabIndex - 1 >= 0) ? undefined : () => setSelectedTabKey(tabsArray[selectedTabIndex - 1].key as NotUndefined<T>)}
            />
          )}
          <div
            className={classNames('jk-row left stretch jk-tabs-headers-inline nowrap', {
              'block flex-1': oneTabView,
              // 'block extend': extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter',
            })}
            style={{ position: 'relative' /*overflow: oneTabView ? 'visible' : undefined*/, overflow: 'visible' }}
            ref={refA}
          >
            {Children.toArray(displayedTabs
              .map(({ key, header }) => (
                <div
                  onClick={() => setSelectedTabKey(key as (NotUndefined<T> | Func<T>))}
                  className={classNames('jk-row nowrap', {
                    selected: key === selectedTabKey,
                    'one-tab-view': oneTabView,
                  })}
                >
                  {renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}
                  {key === selectedTabKey && (
                    <motion.div
                      className="selected-tab-tick"
                      layoutId={layoutId}
                    />
                  )}
                </div>
              )),
            )}
          </div>
          {oneTabView && (
            <NavigateNextIcon
              className={classNames('br-50-pc', {
                'appearance-secondary clickable elevation': (selectedTabIndex + 1 < tabsLength),
                'appearance-gray-5': !(selectedTabIndex + 1 < tabsLength),
              })}
              style={{ padding: 2 }}
              onClick={!(selectedTabIndex + 1 < tabsLength) ? undefined : () => setSelectedTabKey(tabsArray[selectedTabIndex + 1].key as NotUndefined<T>)}
            />
          )}
        </div>
        {extraNodesPlacement === 'right' && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map(action => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
            )))}
          </div>
        )}
        {(extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter') && (
          <div
            className="jk-col gap nowrap"
            style={{
              position: 'absolute',
              bottom: 'var(--pad-t)',
              right: (extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomCenter') ? 'var(--pad-t)' : '',
              left: (extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter') ? 'var(--pad-t)' : '',
            }}
          >
            {Children.toArray(extraNodes?.map(action => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
            )))}
          </div>
        )}
      </div>
      {!onChange && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
    </>
  );
};

export const TabsInlineBody = <T, >({ tabs, selectedTabKey }: { tabs: TabsType<T>, selectedTabKey: T }) => {
  const prevSelectedTabKey = usePrevious(selectedTabKey);
  // const prevPrevSelectedTabKey = usePrevious(prevSelectedTabKey);
  const currentIndex = Object.keys(tabs).indexOf(selectedTabKey as string);
  const prevIndex = Object.keys(tabs).indexOf(prevSelectedTabKey as string);
  // const prevPrevIndex = Object.keys(tabs).indexOf(prevPrevSelectedTabKey as string);
  const fromLeft = prevIndex < currentIndex;
  // const prevFromLeft = prevPrevIndex < currentIndex;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={fromLeft ? { left: '100%', opacity: 0 } : { left: '-100%', opacity: 0 }}
        animate={fromLeft ? { left: 0, opacity: 1 } : { left: 0, opacity: 1 }}
        exit={fromLeft ? { left: '-100%', opacity: 0 } : { left: '100%', opacity: 0 }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        key={selectedTabKey as string}
      >
        {renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
      </motion.div>
    </AnimatePresence>
  );
};
