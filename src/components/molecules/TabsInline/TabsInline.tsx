import { Children, type ReactNode, useCallback, useRef, useState } from 'react';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { Select } from '../../atoms';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState } from '../../hooks/useHandleState';
import { useMemoizedArray } from '../../hooks/useMemoizedArray';
import { useWidthResizer } from '../../hooks/useWidthResizer';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import type { NotUndefined, TabType } from '../../types';
import type { TabsInlineProps } from '../Tabs/types';

export function TabsInline<T, >(props: TabsInlineProps<T>) {
  
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
    withBody,
  } = props;
  
  const tabsArray = Object.values(tabs);
  const [ selectedTabKey, _setSelectedTabKey ] = useHandleState<T>((tabsArray[0]?.key || '') as NotUndefined<T>, _selectedTabKey as NotUndefined<T> | undefined, onChange);
  const tabsLength = tabsArray.length;
  const [ oneTabView, setOneTabView ] = useState(false);
  const selectedTabIndex = tabsArray.findIndex(({ key }) => key === selectedTabKey);
  const tabKeys = useMemoizedArray(Object.keys(tabs));
  const { Link } = useUIStore(store => store.components);
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
  // const layoutId = useId();
  
  const renderHeaderTab = ({ key, header }: TabType<T>) => {
    const content = (
      <div
        key={key as string}
        onClick={(key === selectedTabKey) ? undefined : () => setSelectedTabKey(key)}
        className={classNames(`jk-tabs-inline-tab jk-row nowrap jk-tabs-inline-tab-${key}`, {
          'selected': key === selectedTabKey, // no used bold to prevent changes on the width
          'one-tab-view': oneTabView,
          'cr-pt': key === selectedTabKey && tickStyle === 'background',
        })}
      >
        {tickStyle === 'background' ? (
          <div
            className={classNames('tab-tick-background jk-br-ie', {
              'opacity-1230 bc-pl cr-pt selected': key === selectedTabKey,
              'bc-hl': key !== selectedTabKey,
            })}
          >
            {renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}
          </div>
        ) : (
          renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })
        )}
        {/*{tickStyle === 'line' && key === selectedTabKey && (*/}
        {/*  <motion.div*/}
        {/*    className="selected-tab-tick"*/}
        {/*    layoutId={layoutId}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{tickStyle === 'background' && key === selectedTabKey && (*/}
        {/*  <motion.div*/}
        {/*    className="tab-tick-background selected bc-pl cr-pt jk-br-ie"*/}
        {/*    layoutId={layoutId}*/}
        {/*    // transition={{ duration: 10 }}*/}
        {/*    style={{ zIndex: 1 }}*/}
        {/*  >*/}
        {/*    <div className="opacity-00">{renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}</div>*/}
        {/*  </motion.div>*/}
        {/*)}*/}
      </div>
    );
    
    return withLink(key === selectedTabKey ? undefined : key, content);
  };
  
  const withLinkCmp = getHrefOnTabChange && !routerReplace;
  const withLink = (key: T | undefined, content: ReactNode) => (
    withLinkCmp && key ?
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
        <div className="jk-row left gap extend nowrap" style={{ overflow: 'auto' }} ref={refB}>
          {oneTabView && (
            withLink(
              tabsArray[selectedTabIndex - 1]?.key,
              <NavigateBeforeIcon
                className={classNames('br-50-pc bc-pl cr-we cr-pr elevation-1', {
                  'activated': (selectedTabIndex - 1 >= 0),
                  'disabled': !(selectedTabIndex - 1 >= 0),
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
                    className="jk-row left jk-tabs-headers-inline nowrap block flex-1"
                    style={{
                      position: 'relative' /*overflow: oneTabView ? 'visible' : undefined*/,
                      overflow: 'visible',
                    }}
                  >
                    {tabsArray[selectedTabIndex] && renderHeaderTab(tabsArray[selectedTabIndex])}
                  </div>
                ),
              }))}
              className="jk-select-void flex-1 jk-row"
              selectedOption={tabsArray[selectedTabIndex]
                ? { value: tabsArray[selectedTabIndex].key }
                : { value: undefined as T }}
              onChange={({ value }) => setSelectedTabKey(value, true)}
            />
          ) : (
            <div
              className="jk-row gap left stretch jk-tabs-headers-inline nowrap"
              style={{ position: 'relative' /*overflow: oneTabView ? 'visible' : undefined*/, overflow: 'visible' }}
            >
              {displayedTabs.map(renderHeaderTab)}
            </div>
          )}
          {oneTabView && (
            withLink(
              tabsArray[selectedTabIndex + 1]?.key,
              <NavigateNextIcon
                className={classNames('br-50-pc bc-pl cr-we cr-pr elevation-1', {
                  'activated': (selectedTabIndex + 1 < tabsLength),
                  'disabled': !(selectedTabIndex + 1 < tabsLength),
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
      {withBody && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
    </>
  );
}
