import React, { CSSProperties, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
import { HeadlineIcon, UpIcon } from '../graphics';
import { Popover } from '../Popover';
import { TabsProps } from './types';

export const Tabs = ({ tabHeaders, selectedTabIndex, onChange, children, className = '', actionsSection }: TabsProps) => {
  
  const [tabIndex, setTabIndex] = useHandleState(0, selectedTabIndex, onChange);
  const { height = 0, ref } = useResizeDetector();
  
  useEffect(() => {
    const handleEsc = ({ keyCode }: { keyCode: number }) => {
      if (tabsHeaderFocus.current) {
        if (keyCode === 39) { // ArrowRight
          
          setTabIndex((tabIndex + 1) % tabHeaders.length);
        }
        if (keyCode === 37) { // ArrowLeft
          setTabIndex((tabIndex - 1 + tabHeaders.length) % tabHeaders.length);
        }
      }
    };
    window?.addEventListener('keydown', handleEsc);
    
    return () => {
      window?.removeEventListener('keydown', handleEsc);
    };
  }, [tabIndex, tabHeaders.length, setTabIndex]);
  const tabsHeaderRef = useRef<HTMLDivElement>(null);
  const tabsHeaderFocus = useRef(false);
  useOutsideAlerter(() => tabsHeaderFocus.current = false, tabsHeaderRef);
  
  return (
    <div
      className={classNames('jk-tabs-layout', className, { 'first-tab-selected': tabIndex === 0 })}
      style={{ '--tabs-header-height': `${height}px` } as CSSProperties}
    >
      <div className="jk-tabs-header jk-row space-between nowrap" ref={ref}>
        <Popover
          content={
            ({ onClose }) => (
              <div className="jk-tabs-tabs">
                {tabHeaders.map(({ children, clickable = true }, index) => (
                  <div
                    key={'' + index}
                    className={classNames('jk-tab jk-border-radius sm', { selected: tabIndex === index })}
                    onClick={() => {
                      if (clickable) {
                        onClose(0);
                        setTimeout(() => setTabIndex(index), 100);
                      }
                    }}
                  >
                    {renderReactNodeOrFunction(children)}
                  </div>
                ))}
              </div>
            )
          }
          triggerOn="click"
          placement="bottom"
        >
          <div className="jk-tabs-tabs jk-row left screen sm">
            {tabHeaders.filter((_, index) => tabIndex === index).map(({ children, clickable = true }, index) => (
              <div
                key={'' + index}
                className={classNames('jk-tab', { selected: true })}
              >
                {renderReactNodeOrFunction(children)}
                <UpIcon rotate={180} />
              </div>
            ))}
          </div>
        </Popover>
        <div className="jk-tabs-tabs jk-row left screen md lg hg" ref={tabsHeaderRef} onClick={() => tabsHeaderFocus.current = true}>
          {tabHeaders.map(({ children, clickable = true }, index) => (
            <div
              key={'' + index}
              className={classNames('jk-tab', { selected: tabIndex === index })}
              onClick={() => clickable && setTabIndex(index)}
            >
              {renderReactNodeOrFunction(children)}
            </div>
          ))}
        </div>
        {actionsSection && (
          <div className="jk-tabs-actions jk-row right nowrap gap screen lg hg">
            <div className="jk-divider horizontal" />
            <>{renderReactNodeOrFunctionP1(actionsSection, { selectedTabIndex: tabIndex })}</>
          </div>
        )}
        {actionsSection && (
          <Popover
            content={renderReactNodeOrFunctionP1(actionsSection, { selectedTabIndex: tabIndex })}
            triggerOn="click"
            placement="bottomRight"
          >
            <div className="jk-row nowrap left screen sm md float-top-right">
              <HeadlineIcon />
            </div>
          </Popover>
        )}
      </div>
      <div className="jk-tabs-content">
        {children.map((child, index) => (
          <div className={classNames({ 'selected': tabIndex === index })} key={index}>{child}</div>
        ))}
      </div>
    </div>
  );
};

export * from './types';
