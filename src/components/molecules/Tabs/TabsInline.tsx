import React, { Children, useCallback, useEffect, useRef, useState } from 'react';
import { NavigateBeforeIcon, NavigateNextIcon, TabsInlineProps, WidthResizer } from '../../index';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';

export const TabsInline = <T, >({
  tabs,
  selectedTabKey,
  onChange,
  extraNodes,
  extraNodesPlacement = 'right',
}: TabsInlineProps<T>) => {
  
  const tabsLength = Object.keys(tabs).length;
  const [tabsSize, setTabsSize] = useState(tabsLength);
  const [tabStartIndex, setTabStartIndex] = useState(0);
  useEffect(() => {
    if (tabsSize >= tabsLength) {
      setTabStartIndex(0);
    }
  }, [tabsSize, tabsLength, tabStartIndex]);
  
  const withArrows = tabsSize !== tabsLength;
  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);
  const maxWidthWithArrows = useRef(0);
  const onOverflow = useCallback(() => {
    if (refB.current?.offsetWidth) {
      setTabsSize(prevState => Math.max(prevState - 1, 1));
      maxWidthWithArrows.current = Math.max(maxWidthWithArrows.current, refB.current.offsetWidth);
    }
  }, [refB]);
  const unOverflow = useCallback(async () => {
    if (refB.current?.offsetWidth) {
      if (refB.current.offsetWidth > maxWidthWithArrows.current) {
        setTabsSize(prevState => Math.min(prevState + 1, tabsLength));
      }
    }
  }, [tabsLength, refB]);
  
  const [trigger, setTrigger] = useState(Date.now());
  useEffect(() => {
    setTrigger(Date.now());
  }, [tabsSize, tabStartIndex, tabs, selectedTabKey, extraNodes]);
  
  return (
    <>
      <WidthResizer
        onOverflow={onOverflow}
        unOverflow={unOverflow}
        targetRef={refB}
        trigger={trigger}
      />
      <WidthResizer
        targetRef={refA}
        onOverflow={onOverflow}
        unOverflow={unOverflow}
        trigger={trigger}
      />
      <div className="jk-row gap space-between nowrap jk-tabs-inline extend" ref={refB}>
        {extraNodesPlacement === 'left' && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map(action => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
            )))}
          </div>
        )}
        <div className="jk-row left gap extend">
          {withArrows && (
            <NavigateBeforeIcon
              className={classNames('br-50-pc', {
                'appearance-secondary clickable elevation': (tabStartIndex > 0),
                'appearance-gray-5': !(tabStartIndex > 0),
              })}
              style={{ padding: 2 }}
              onClick={!(tabStartIndex > 0) ? undefined : () => setTabStartIndex(prevState => Math.max(prevState - 1, 0))}
            />
          )}
          <div
            className={classNames('jk-row left stretch jk-tabs-headers-inline nowrap', {
              'block flex-1': withArrows,
              // 'block extend': extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter',
            })}
            ref={refA}
          >
            {Children.toArray(Object.values(tabs).slice(tabStartIndex, tabStartIndex + tabsSize).map(({ key, header }) => (
              <div
                onClick={() => onChange(key)}
                className={classNames('jk-row stretch', { selected: key === selectedTabKey })}
              >
                {renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}
              </div>
            )))}
          </div>
          {withArrows && (
            <NavigateNextIcon
              className={classNames('br-50-pc', {
                'appearance-secondary clickable elevation': (tabStartIndex + tabsSize < tabsLength),
                'appearance-gray-5': !(tabStartIndex + tabsSize < tabsLength),
              })}
              style={{ padding: 2 }}
              onClick={!(tabStartIndex + tabsSize < tabsLength) ? undefined : () => setTabStartIndex(prevState => prevState + 1)}
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
    </>
  );
};
