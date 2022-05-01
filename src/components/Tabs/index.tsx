import React, { CSSProperties, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
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
      style={{ '--tabs-header-height': height } as CSSProperties}
    >
      <div className="jk-tabs-header jk-row space-between nowrap" ref={ref}>
        <div className="jk-tabs-tabs" ref={tabsHeaderRef} onClick={() => tabsHeaderFocus.current = true}>
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
          <div className="jk-tabs-actions jk-row right nowrap gap">
            <div className="jk-divider horizontal screen lg hg" />
            <>{renderReactNodeOrFunctionP1(actionsSection, { selectedTabIndex: tabIndex })}</>
          </div>
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
