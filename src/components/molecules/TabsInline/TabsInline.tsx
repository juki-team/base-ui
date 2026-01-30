import { Children, PropsWithChildren } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { Select } from '../../atoms';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState } from '../../hooks/useHandleState';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import type { NotUndefined, TabType } from '../../types';
import type { TabsInlineProps } from '../Tabs/types';

type TabWithLinkProps<T> = PropsWithChildren<{
  tabKey: T | undefined,
  getHrefOnTabChange: TabsInlineProps<T>['getHrefOnTabChange'],
  routerReplace: TabsInlineProps<T>['routerReplace']
}>

const TabWithLink = <T, >({ tabKey, children, getHrefOnTabChange, routerReplace }: TabWithLinkProps<T>) => {
  const { Link } = useUIStore(store => store.components);
  return getHrefOnTabChange && !routerReplace && tabKey
    ? <Link href={getHrefOnTabChange(tabKey)}>{children}</Link>
    : children;
};

interface HeaderTabProps<T> {
  tab: TabType<T>,
  selectedTabKey: T,
  tickStyle: TabsInlineProps<T>['tickStyle'],
  getHrefOnTabChange: TabsInlineProps<T>['getHrefOnTabChange'],
  routerReplace: TabsInlineProps<T>['routerReplace'],
  setSelectedTabKey: (key: T | undefined, force: boolean) => void,
}

const HeaderTab = <T = string, >(props: HeaderTabProps<T>) => {
  
  const {
    tab: { key, header },
    selectedTabKey,
    tickStyle,
    getHrefOnTabChange,
    routerReplace,
    setSelectedTabKey,
  } = props;
  
  return (
    <TabWithLink
      tabKey={key === selectedTabKey ? undefined : key}
      getHrefOnTabChange={getHrefOnTabChange}
      routerReplace={routerReplace}
    >
      <div
        key={key as string}
        onClick={(key === selectedTabKey) ? undefined : () => setSelectedTabKey(key, false)}
        className={classNames(`jk-tabs-inline-tab jk-row nowrap jk-tabs-inline-tab-${key}`, {
          'selected': key === selectedTabKey, // no used bold to prevent changes on the width
          
          'cr-tx-ht-it': key === selectedTabKey && tickStyle === 'background',
        })}
      >
        {tickStyle === 'background' ? (
          <div
            className={classNames('tab-tick-background jk-br-ie', {
              'opacity-1230 bc-al cr-at-it selected': key === selectedTabKey,
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
        {/*    className="tab-tick-background selected bc-al cr-at-it jk-br-ie"*/}
        {/*    layoutId={layoutId}*/}
        {/*    // transition={{ duration: 10 }}*/}
        {/*    style={{ zIndex: 1 }}*/}
        {/*  >*/}
        {/*    <div className="opacity-00">{renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}</div>*/}
        {/*  </motion.div>*/}
        {/*)}*/}
      </div>
    </TabWithLink>
  );
};

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
  const selectedTabIndex = tabsArray.findIndex(({ key }) => key === selectedTabKey);
  
  const replaceRoute = useRouterStore(store => store.replaceRoute);
  const isSmallScreen = usePageStore(store => store.viewPort.isSmallScreen);
  
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
  
  const displayedTabs = isSmallScreen ? (tabsArray[selectedTabIndex] ? [ tabsArray[selectedTabIndex] ] : []) : tabsArray;
  
  return (
    <>
      <div className={classNames(`jk-row gap space-between nowrap jk-tabs-inline extend tick-style-${tickStyle}`, className, { 'one-tab-view': isSmallScreen })}>
        {extraNodesPlacement === 'left' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap">
            {Children.toArray(extraNodes?.map((action, index) => (
              renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index)
            )))}
          </div>
        )}
        <div className="jk-row left extend nowrap">
          {isSmallScreen && (
            <TabWithLink
              tabKey={tabsArray[selectedTabIndex - 1]?.key}
              getHrefOnTabChange={getHrefOnTabChange}
              routerReplace={routerReplace}
            >
              <div
                className="jk-row jk-pg-xsm"
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex - 1]?.key)}
              >
                <NavigateBeforeIcon
                  className={classNames('br-50-pc bc-al cr-at-it elevation-1', {
                    'activated': (selectedTabIndex - 1 >= 0),
                    'disabled': !(selectedTabIndex - 1 >= 0),
                  })}
                  size="small"
                />
              </div>
            </TabWithLink>
          )}
          {isSmallScreen ? (
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
                    {tabsArray[selectedTabIndex] && (
                      <HeaderTab
                        tab={tabsArray[selectedTabIndex]}
                        selectedTabKey={selectedTabKey}
                        tickStyle={tickStyle}
                        getHrefOnTabChange={getHrefOnTabChange}
                        routerReplace={routerReplace}
                        setSelectedTabKey={setSelectedTabKey}
                      />
                    )}
                  </div>
                ),
              }))}
              className="jk-select-void flex-1 jk-row"
              expand
              selectedOption={tabsArray[selectedTabIndex]
                ? { value: tabsArray[selectedTabIndex].key }
                : { value: undefined as T }}
              onChange={({ value }) => setSelectedTabKey(value, true)}
            />
          ) : (
            <div className="jk-row gap left stretch jk-tabs-headers-inline">
              {Children.toArray(displayedTabs.map(tab => (
                <HeaderTab
                  tab={tab}
                  selectedTabKey={selectedTabKey}
                  tickStyle={tickStyle}
                  getHrefOnTabChange={getHrefOnTabChange}
                  routerReplace={routerReplace}
                  setSelectedTabKey={setSelectedTabKey}
                />
              )))}
            </div>
          )}
          {isSmallScreen && (
            <TabWithLink
              tabKey={tabsArray[selectedTabIndex + 1]?.key}
              getHrefOnTabChange={getHrefOnTabChange}
              routerReplace={routerReplace}
            >
              <div
                className="jk-row jk-pg-xsm"
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex + 1]?.key)}
              >
                <NavigateNextIcon
                  className={classNames('br-50-pc bc-al cr-at-it elevation-1', {
                    'activated': (selectedTabIndex + 1 < tabsLength),
                    'disabled': !(selectedTabIndex + 1 < tabsLength),
                  })}
                  size="small"
                />
              </div>
            </TabWithLink>
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
