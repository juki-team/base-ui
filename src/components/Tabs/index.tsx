import React, { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
import { NotUndefined } from '../../types';
import { HeadlineIcon, UpIcon } from '../graphics';
import { Popover } from '../Popover';
import { TabsProps } from './types';

export const Tabs = <T extends string, >({ tabs, selectedTabKey, onChange, className = '', actionsSection, extend }: TabsProps<T>) => {
  
  const [tabKey, setTabKey] = useHandleState<T>((tabs[0]?.key || '') as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined, onChange);
  const { height: heightTabsHeader = 0, width: widthTabsHeader = 0, ref } = useResizeDetector();
  
  const indexes = useMemo(() => {
    const indexes: { [key: string]: number } = {};
    tabs.forEach(({ key }, index) => {
      indexes[key] = index;
    });
    return indexes;
  }, [tabs]);
  
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
                        setTimeout(() => setTabKey(key as NotUndefined<T>), 100);
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
        <div
          className={classNames('jk-tabs-tabs jk-row nowrap left screen', { 'sm md lg hg': isExtend })}
          ref={tabsHeaderRef}
          onClick={() => tabsHeaderFocus.current = true}
        >
          {tabs.map(({ header, clickable = true, key }) => (
            <div
              key={key}
              className={classNames('jk-tab', { selected: tabKey === key })}
              onClick={() => clickable && setTabKey(key as NotUndefined<T>)}
            >
              {renderReactNodeOrFunctionP1(header, { selectedTabKey: tabKey })}
            </div>
          ))}
        </div>
        {actionsSection?.length && (
          <div
            className={classNames('jk-tabs-actions jk-row right nowrap gap screen', { 'sm md lg hg': (isExtend || actionsSection.length === 1) })}
          >
            <div className="jk-divider horizontal" />
            <div className="jk-row gap nowrap">
              {actionsSection.map(action => (
                renderReactNodeOrFunctionP1(action, { selectedTabKey: tabKey })
              ))}
            </div>
          </div>
        )}
        {actionsSection?.length && (
          <Popover
            content={
              <div className="jk-col gap">
                {actionsSection.map(action => (
                  renderReactNodeOrFunctionP1(action, { selectedTabKey: tabKey })
                ))}
              </div>
            }
            triggerOn="click"
            placement="bottomRight"
          >
            <div
              className={classNames('jk-row nowrap left link screen', { 'sm md lg hg': !(isExtend || actionsSection.length === 1) })}
            >
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
