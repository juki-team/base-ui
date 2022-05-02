import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
import { HeadlineIcon, UpIcon } from '../graphics';
import { Popover } from '../Popover';
import { TabsProps } from './types';

export const Tabs = ({ tabs, selectedTabKey, onChange, className = '', actionsSection, extend }: TabsProps) => {
  
  const [tabKey, setTabKey] = useHandleState(tabs[0]?.key || '', selectedTabKey, onChange);
  const { height: heightTabsHeader = 0, width: widthTabsHeader = 0, ref } = useResizeDetector();
  
  const indexes = useMemo(() => {
    const indexes = {};
    tabs.forEach(({ key }, index) => {
      indexes[key] = index;
    });
    return indexes;
  }, [tabs]);
  
  useEffect(() => {
    const handleEsc = ({ keyCode }: { keyCode: number }) => {
      if (tabsHeaderFocus.current) {
        if (keyCode === 39) { // ArrowRight
          console.log(keyCode);
          setTabKey(tabs[(indexes[tabKey] + 1) % tabs.length].key);
        }
        if (keyCode === 37) { // ArrowLeft
          setTabKey(tabs[(indexes[tabKey] - 1 + tabs.length) % tabs.length].key);
        }
      }
    };
    window?.addEventListener('keydown', handleEsc);
    
    return () => {
      window?.removeEventListener('keydown', handleEsc);
    };
  }, [tabKey, setTabKey, indexes, tabs]);
  const tabsHeaderRef = useRef<HTMLDivElement>(null);
  const tabsHeaderFocus = useRef(false);
  useOutsideAlerter(() => tabsHeaderFocus.current = false, tabsHeaderRef);
  const isExtend = typeof extend === 'boolean' ? extend : widthTabsHeader > 800;
  
  return (
    <div
      className={classNames('jk-tabs-layout', className, { 'first-tab-selected': indexes[tabKey] === 0 })}
      style={{ '--tabs-header-height': `${heightTabsHeader}px` } as CSSProperties}
    >
      <div className="jk-tabs-header jk-row space-between nowrap" ref={ref}>
        <Popover
          content={
            ({ onClose }) => (
              <div className="jk-tabs-tabs">
                {tabs.map(({ header, clickable = true, key }) => (
                  <div
                    key={key}
                    className={classNames('jk-tab jk-border-radius sm', { selected: tabKey === key })}
                    onClick={() => {
                      if (clickable) {
                        onClose(0);
                        setTimeout(() => setTabKey(key), 100);
                      }
                    }}
                  >
                    {renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey })}
                  </div>
                ))}
              </div>
            )
          }
          triggerOn="click"
          placement="bottom"
        >
          <div className={classNames('jk-tabs-tabs jk-row nowrap extend center screen', { 'sm md lg hg': !isExtend })}>
            {tabs.filter(({ key }) => tabKey === key).map(({ header, clickable = true, key }) => (
              <div key={key} className={classNames('jk-tab', { selected: true })}>
                {renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey })}
                <UpIcon rotate={180} />
              </div>
            ))}
          </div>
        </Popover>
        <div className={classNames('jk-tabs-tabs jk-row nowrap left screen', { 'sm md lg hg': isExtend })}
             ref={tabsHeaderRef}
             onClick={() => tabsHeaderFocus.current = true}>
          {tabs.map(({ header, clickable = true, key }) => (
            <div
              key={key}
              className={classNames('jk-tab', { selected: tabKey === key })}
              onClick={() => clickable && setTabKey(key)}
            >
              {renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey })}
            </div>
          ))}
        </div>
        {actionsSection && (
          <div className={classNames('jk-tabs-actions jk-row right nowrap gap screen', { 'sm md lg hg': isExtend })}>
            <div className="jk-divider horizontal" />
            {renderReactNodeOrFunctionP1(actionsSection, { selectedTabKey: tabKey })}
          </div>
        )}
        {actionsSection && (
          <Popover
            content={renderReactNodeOrFunctionP1(actionsSection, { selectedTabKey: tabKey })}
            triggerOn="click"
            placement="bottomRight"
          >
            <div className={classNames('jk-row nowrap left link screen', { 'sm md lg hg': !isExtend })}>
              <HeadlineIcon className="" />
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

export * from './types';
