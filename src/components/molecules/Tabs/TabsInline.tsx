import { motion } from 'motion/react';
import React, { Children, ReactNode, useCallback, useId, useRef, useState } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiUI, useMemoizedArray, useRouterStore } from '../../../hooks';
import { useWidthResizer } from '../../../hooks/useWidthResizer';
import { NotUndefined, TabType } from '../../../types';
import { Select } from '../../atoms';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import { TabsInlineProps } from './types';

export const TabsInline = <T, >(props: TabsInlineProps<T>) => {
  
  const {
    tabs,
    selectedTabKey: _selectedTabKey,
    onChange,
    extraNodes,
    extraNodesPlacement = 'right',
    className,
    tickStyle = 'line',
    getHrefOnTabChange,
    routerReplace,
  } = props;
  
  const tabsArray = Object.values(tabs);
  const [ selectedTabKey, _setSelectedTabKey ] = useHandleState<T>((tabsArray[0]?.key || '') as NotUndefined<T>, _selectedTabKey as NotUndefined<T> | undefined, onChange);
  const tabsLength = tabsArray.length;
  const [ oneTabView, setOneTabView ] = useState(false);
  const selectedTabIndex = tabsArray.findIndex(({ key }) => key === selectedTabKey);
  const tabKeys = useMemoizedArray(Object.keys(tabs));
  const [ hover, setHover ] = useState('');
  const { components: { Link } } = useJukiUI();
  const replaceRoute = useRouterStore(store => store.replaceRoute);
  
  const setSelectedTabKey = (key: T | undefined, force = false) => {
    if (key) {
      if (getHrefOnTabChange) {
        if (routerReplace || force) {
          _setSelectedTabKey(key as NotUndefined<T>);
          replaceRoute(getHrefOnTabChange(key));
        }
      } else {
        _setSelectedTabKey(key as NotUndefined<T>);
      }
    }
  };
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
  const layoutHoverId = useId();
  
  const renderHeaderTab = ({ key, header }: TabType<T>) => {
    const content = (
      <div
        key={key as string}
        onClick={(key === selectedTabKey) ? undefined : () => setSelectedTabKey(key)}
        className={classNames(`jk-tabs-inline-tab jk-row nowrap`, {
          'selected': key === selectedTabKey, // no used bold to prevent changes on the width
          'one-tab-view': oneTabView,
          'cr-pt': key === selectedTabKey && tickStyle === 'background',
        })}
        onMouseEnter={() => setHover(key as string)}
        // onMouseLeave={() => setHover('')}
      >
        {tickStyle === 'line' && key === selectedTabKey && (
          <motion.div
            className="selected-tab-tick"
            layoutId={layoutId}
          />
        )}
        {tickStyle === 'background' && key === selectedTabKey && (
          <motion.div
            className="selected-tab-tick-back jk-br-ie"
            layoutId={layoutId}
          >
            <div className="selected-tab-tick-back-content">{renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}</div>
          </motion.div>
        )}
        {tickStyle === 'background' && key === hover && key !== selectedTabKey && (
          <motion.div
            className="selected-tab-tick-back-hover jk-br-ie"
            layoutId={layoutHoverId}
          >
            <div className="selected-tab-tick-back-content">{renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}</div>
          </motion.div>
        )}
        {tickStyle === 'background' ? (
          <div
            className="tab-tick-back-hover jk-br-ie"
          >
            <div className="selected-tab-tick-back-content">{renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}</div>
          </div>
        ) : (
          renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })
        )}
      </div>
    );
    
    return withLink(key === selectedTabKey ? undefined : key, content);
  };
  
  const withLink = (key: T | undefined, content: ReactNode) => (
    getHrefOnTabChange && !routerReplace && key ?
      <Link href={getHrefOnTabChange(key)}>{content}</Link> : content
  );
  
  return (
    <>
      <div className={classNames(`jk-row gap space-between nowrap jk-tabs-inline extend tick-style-${tickStyle}`, className)}>
        {extraNodesPlacement === 'left' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map((action, index) => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index)
            )))}
          </div>
        )}
        <div className="jk-row left gap extend" style={{ overflow: 'auto' }} ref={refB}>
          {oneTabView && (
            withLink(
              tabsArray[selectedTabIndex - 1]?.key,
              <NavigateBeforeIcon
                className={classNames('br-50-pc', {
                  'appearance-secondary clickable elevation': (selectedTabIndex - 1 >= 0),
                  'appearance-gray-5': !(selectedTabIndex - 1 >= 0),
                })}
                style={{ padding: 2 }}
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex - 1]?.key)}
              />,
            )
          )}
          {oneTabView ? (
            <Select
              options={tabsArray.map(({ key, header }) => ({
                value: key,
                label: renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey }),
                inputLabel: (
                  <div
                    className={classNames('jk-row left jk-tabs-headers-inline nowrap', {
                      'block flex-1': oneTabView,
                      // 'block extend': extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter',
                    })}
                    style={{
                      position: 'relative' /*overflow: oneTabView ? 'visible' : undefined*/,
                      overflow: 'visible',
                    }}
                  >
                    {renderHeaderTab(tabsArray[selectedTabIndex])}
                  </div>
                ),
              }))}
              className="jk-select-void flex-1"
              selectedOption={tabsArray[selectedTabIndex]
                ? { value: tabsArray[selectedTabIndex].key }
                : { value: undefined as T }}
              onChange={({ value }) => setSelectedTabKey(value, true)}
            />
          ) : (
            <div
              className={classNames('jk-row gap left stretch jk-tabs-headers-inline nowrap', {
                'block flex-1': oneTabView,
                // 'block extend': extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter',
              })}
              style={{ position: 'relative' /*overflow: oneTabView ? 'visible' : undefined*/, overflow: 'visible' }}
            >
              {displayedTabs.map(renderHeaderTab)}
            </div>
          )}
          {oneTabView && (
            withLink(
              tabsArray[selectedTabIndex + 1]?.key,
              <NavigateNextIcon
                className={classNames('br-50-pc', {
                  'appearance-secondary clickable elevation': (selectedTabIndex + 1 < tabsLength),
                  'appearance-gray-5': !(selectedTabIndex + 1 < tabsLength),
                })}
                style={{ padding: 2 }}
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex + 1]?.key)}
              />,
            )
          )}
        </div>
        {extraNodesPlacement === 'right' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map((action, index) => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index)
            )))}
          </div>
        )}
        {(extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter') && !!extraNodes?.length && (
          <div
            className="jk-col gap nowrap"
            style={{
              position: 'absolute',
              bottom: 'calc(var(--bottom-horizontal-menu-height, 0) + var(--pad-t))',
              right: (extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomCenter') ? 'var(--pad-t)' : '',
              left: (extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter') ? 'var(--pad-t)' : '',
            }}
          >
            {Children.toArray(extraNodes?.map((action, index) => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index)
            )))}
          </div>
        )}
      </div>
      {!onChange && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
    </>
  );
};
