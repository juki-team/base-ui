import React, { Children, CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useOutsideAlerter } from '../../../hooks';
import { NotUndefined } from '../../../types';
import { Popover, Select } from '../../atoms';
import { ViewHeadlineIcon } from '../../server';
import { TabsProps } from './types';

const hiddenStyle: CSSProperties = {
  height: 0,
  width: 0,
  opacity: 0,
  overflow: 'hidden',
  zIndex: -1000000,
  pointerEvents: 'none',
};

export const Tabs = <T extends string, >(props: TabsProps<T>) => {
  
  const {
    tabs,
    selectedTabKey,
    onChange,
    className = '',
    extraNodes: _extraNodes,
    extend,
  } = props;
  
  const [ tabKey, setTabKey ] = useHandleState<T>((tabs[0]?.key || '') as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined, onChange);
  const tabsHeaderRef = useRef<HTMLDivElement>(null);
  const { width: widthTabs = 0, ref: refTabs } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { width: widthActions = 0, ref: refActions } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { width: widthContainer = 0, ref: refContainer } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const { height: heightTabsContainer = 0, ref: refTabsContainer } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const indexes = useMemo(() => {
    const indexes: { [key: string]: number } = {};
    tabs.forEach(({ key }, index) => {
      indexes[key] = index;
    });
    return indexes;
  }, [ tabs ]);
  
  useEffect(() => {
    const handleEsc = ({ keyCode }: { keyCode: number }) => {
      if (tabsHeaderFocus.current) {
        if (keyCode === 39) { // ArrowRight
          setTabKey(tabs[(indexes[tabKey] + 1) % tabs.length].key as NotUndefined<T>);
        }
        if (keyCode === 37) { // ArrowLeft
          setTabKey(tabs[(indexes[tabKey] - 1 + tabs.length) % tabs.length].key as NotUndefined<T>);
        }
      }
    };
    window?.addEventListener('keydown', handleEsc);
    
    return () => {
      window?.removeEventListener('keydown', handleEsc);
    };
  }, [ tabKey, setTabKey, indexes, tabs ]);
  const tabsHeaderFocus = useRef(false);
  useOutsideAlerter(() => tabsHeaderFocus.current = false, tabsHeaderRef);
  
  const tabHeaders: { [key: string]: ReactNode } = {};
  tabs.forEach(({ key, header }) => {
    tabHeaders[key] = renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey });
  });
  const [ maxWidthUsed, setMaxWidthUsed ] = useState(widthTabs + widthActions + 32);
  useEffect(() => {
    const newWidth = widthTabs + widthActions + 32;
    if (newWidth > maxWidthUsed) {
      setMaxWidthUsed(newWidth);
    }
  }, [ maxWidthUsed, widthActions, widthTabs ]);
  const isExtend = typeof extend === 'boolean' ? extend : widthContainer > maxWidthUsed;
  const extraNodes = (_extraNodes || []).filter(action => !!action);
  
  return (
    <div
      className={classNames('jk-tabs-layout', className, {
        'first-tab-selected': indexes[tabKey] === 0,
        'select-mode': !isExtend,
      })}
      style={{ '--tabs-header-height': `${heightTabsContainer}px` } as CSSProperties}
      ref={refContainer}
    >
      <div className="jk-tabs-header jk-row space-between nowrap" ref={refTabsContainer}>
        <div
          className={classNames('jk-tabs-tabs jk-row left')}
          onClick={() => tabsHeaderFocus.current = true}
          ref={tabsHeaderRef}
          style={isExtend ? {} : hiddenStyle}
        >
          <div className="jk-row nowrap" ref={refTabs}>
            {tabs.map(({ clickable = true, key }) => (
              <div
                key={key}
                className={classNames('jk-tab', { selected: tabKey === key })}
                onClick={() => clickable && setTabKey(key as NotUndefined<T>)}
              >
                {tabHeaders[key]}
              </div>
            ))}
          </div>
        </div>
        {!isExtend && (
          <Select
            options={tabs.map(({ key }) => ({ value: key, label: tabHeaders[key] }))}
            selectedOption={{ value: tabKey }}
            onChange={({ value }) => setTabKey(value as NotUndefined<T>)}
            extend
            popoverClassName="jk-tabs-select"
          />
        )}
        <div
          className={classNames('jk-tabs-actions jk-row right nowrap gap')}
          style={!(!!extraNodes.length && isExtend) ? hiddenStyle : {}}
        >
          <div className="jk-divider horizontal" />
          <div className="jk-row gap nowrap" ref={refActions}>
            {Children.toArray(extraNodes.map((action, index) => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: tabKey }, index)
            )))}
          </div>
        </div>
        {(!!extraNodes.length && !isExtend) && (
          <Popover
            popoverClassName="bc-we jk-br-ie elevation-1"
            content={
              <div className="jk-col gap stretch jk-tab-extra-nodes jk-pg-x-sm">
                {Children.toArray(extraNodes.map((action, index) => (
                  renderReactNodeOrFunctionP1(action, { selectedTabKey: tabKey }, index)
                )))}
              </div>
            }
            triggerOn="click"
            placement="bottom-end"
          >
            <div className={classNames('jk-row nowrap left link')}>
              <ViewHeadlineIcon />
            </div>
          </Popover>
        )}
      </div>
      <div className="jk-tabs-content">
        {tabs.map(({ body, key }) => (
          <div className={classNames({ 'selected': tabKey === key })} key={key}>
            {renderReactNodeOrFunctionP1(body, { selectedTabKey: tabKey })}
          </div>
        ))}
      </div>
    </div>
  );
};
