import React, { Children, MutableRefObject, useCallback, useEffect, useState } from 'react';
import { NavigateBeforeIcon, NavigateNextIcon, TabsInlineProps, WidthResizer } from '../';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useJukiUI } from '../../hooks';

export const TabsInline = <T, >({ tabs, selectedTabKey, onChange, extraNodes }: TabsInlineProps<T>) => {
  
  const { viewPortSize } = useJukiUI();
  const tabsLength = Object.keys(tabs).length;
  const [tabsSize, setTabsSize] = useState(tabsLength);
  const [tabStartIndex, setTabStartIndex] = useState(0);
  useEffect(() => {
    if (tabsSize >= tabsLength) {
      setTabStartIndex(0);
    }
  }, [tabsSize, tabsLength, tabStartIndex]);
  
  const withArrows = tabsSize !== tabsLength;
  
  const Component = ({ reference }: { reference: MutableRefObject<any> }) => (
    <div className="jk-row gap space-between nowrap jk-tabs-inline extend">
      {/*TODO: check this render*/}
      <div className="jk-row left gap extend">
        {withArrows && (
          <NavigateBeforeIcon
            className={classNames('br-50-pc', {
              'appearance-secondary clickable elevation': (tabStartIndex > 0),
              'appearance-gray-5': !(tabStartIndex > 0),
            })}
            onClick={!(tabStartIndex > 0) ? undefined : () => setTabStartIndex(prevState => Math.max(prevState - 1, 0))}
          />
        )}
        <div
          className={classNames('jk-row left stretch jk-tabs-headers-inline nowrap', {
            'block flex-1': withArrows,
            'block extend': viewPortSize === 'sm',
          })}
          ref={reference}
        >
          {Children.toArray(Object.values(tabs).slice(tabStartIndex, tabStartIndex + tabsSize).map(({ key, header }) => (
            <div
              onClick={tabKey => onChange(key)}
              className={classNames('jk-row stretch', { selected: key === selectedTabKey /*contestsTab*/ })}
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
            onClick={!(tabStartIndex + tabsSize < tabsLength) ? undefined : () => setTabStartIndex(prevState => prevState + 1)}
          />
        )}
      </div>
      {(viewPortSize === 'sm' || withArrows) ? (
        <div className="jk-col gap nowrap" style={{ position: 'absolute', bottom: 'var(--pad-t)', right: 'var(--pad-t)' }}>
          {Children.toArray(extraNodes?.map(action => (
            renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
          )))}
        </div>
      ) : (
        <div className="jk-row gap nowrap">
          {Children.toArray(extraNodes?.map(action => (
            renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey })
          )))}
        </div>
      )}
    </div>
  );
  
  const onOverflow = useCallback(() => setTabsSize(prevState => Math.max(prevState - 1, 1)), []);
  const unOverflow = useCallback(() => setTabsSize(prevState => Math.min(prevState + 1, tabsLength)), [tabsLength]);
  
  return (
    <WidthResizer
      onOverflow={onOverflow}
      unOverflow={unOverflow}
      Component={Component}
      trigger={tabsLength}
    />
  );
};
