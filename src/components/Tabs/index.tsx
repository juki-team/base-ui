import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
import { HeadlineIcon, UpIcon } from '../graphics';
import { Popover } from '../Popover';
import { TabsProps } from './types';

export const Tabs = ({ tabs, selectedTabKey, onChange, className = '', actionsSection }: TabsProps) => {
  
  const [tabKey, setTabKey] = useHandleState(tabs[0]?.key || '', selectedTabKey, onChange);
  const { height = 0, ref } = useResizeDetector();
  
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
  
  return (
    <div
      className={classNames('jk-tabs-layout', className, { 'first-tab-selected': indexes[tabKey] === 0 })}
      style={{ '--tabs-header-height': `${height}px` } as CSSProperties}
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
          <div className="jk-tabs-tabs jk-row left screen sm">
            {tabs.filter(({ key }) => tabKey === key).map(({ header, clickable = true, key }) => (
              <div key={key} className={classNames('jk-tab', { selected: true })}>
                {renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey })}
                <UpIcon rotate={180} />
              </div>
            ))}
          </div>
        </Popover>
        <div className="jk-tabs-tabs jk-row left screen md lg hg" ref={tabsHeaderRef} onClick={() => tabsHeaderFocus.current = true}>
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
          <div className="jk-tabs-actions jk-row right nowrap gap screen lg hg">
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
            <div className="jk-row nowrap left screen sm md float-top-right link" style={{ height }}>
              <HeadlineIcon />
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
