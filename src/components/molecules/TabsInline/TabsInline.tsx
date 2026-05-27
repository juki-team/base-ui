import { Children, type PropsWithChildren } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { Button } from '../../atoms/Button/Button';
import { Div } from '../../atoms/Div/Div';
import { Select } from '../../atoms/Select/Select';
import { classNames } from '../../helpers/commons';
import { renderReactNodeOrFunctionP1 } from '../../helpers/render';
import { useHandleState } from '../../hooks/useHandleState';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import type { NotUndefined, TabType } from '../../types';
import type { TabsInlineProps } from '../Tabs/types';

type TabWithLinkProps<T> = PropsWithChildren<{
  tabKey: T | undefined;
  getHrefOnTabChange: TabsInlineProps<T>['getHrefOnTabChange'];
  routerReplace: TabsInlineProps<T>['routerReplace'];
}>;

const TabWithLink = <T,>({ tabKey, children, getHrefOnTabChange, routerReplace }: TabWithLinkProps<T>) => {
  const { Link } = useUIStore((store) => store.components);
  return getHrefOnTabChange && !routerReplace && tabKey ? <Link href={getHrefOnTabChange(tabKey)}>{children}</Link> : children;
};

interface HeaderTabProps<T> {
  tab: TabType<T>;
  selectedTabKey: T;
  getHrefOnTabChange: TabsInlineProps<T>['getHrefOnTabChange'];
  routerReplace: TabsInlineProps<T>['routerReplace'];
  setSelectedTabKey: (key: T | undefined, force: boolean) => void;
  buttonClassName?: string;
}

const HeaderTab = <T = string>(props: HeaderTabProps<T>) => {
  const {
    tab: { key, header },
    selectedTabKey,
    getHrefOnTabChange,
    routerReplace,
    setSelectedTabKey,
    buttonClassName,
  } = props;

  const selected = key === selectedTabKey;
  return (
    <TabWithLink tabKey={selected ? undefined : key} getHrefOnTabChange={getHrefOnTabChange} routerReplace={routerReplace}>
      <Button
        type="ghost"
        onClick={selected ? undefined : () => setSelectedTabKey(key, false)}
        className={classNames('fw-bd', { 'cr-tx-ht': selected }, buttonClassName)}
        style={{
          borderBottom: selected ? '2px solid var(--cr-tx-ht)' : '2px solid var(--cr-ht)',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        {renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}
      </Button>
    </TabWithLink>
  );
};

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred
export function TabsInline<T>(props: TabsInlineProps<T>) {
  const {
    tabs,
    selectedTabKey: _selectedTabKey,
    onChange,
    extraNodes,
    extraNodesPlacement = 'right',
    className,
    tickStyle = 'classic',
    getHrefOnTabChange,
    routerReplace,
    withBody,
    tabButtonsClassName,
  } = props;

  const tabsArray = Object.values(tabs);
  const [selectedTabKey, _setSelectedTabKey] = useHandleState<T>(
    (tabsArray[0]?.key || '') as NotUndefined<T>,
    _selectedTabKey as NotUndefined<T> | undefined,
    onChange,
  );
  const tabsLength = tabsArray.length;
  const selectedTabIndex = tabsArray.findIndex(({ key }) => key === selectedTabKey);

  const replaceRoute = useRouterStore((store) => store.replaceRoute);
  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);

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

  const displayedTabs = isSmallScreen ? (tabsArray[selectedTabIndex] ? [tabsArray[selectedTabIndex]] : []) : tabsArray;

  return (
    <>
      <div
        className={classNames(`jk-row gap space-between nowrap jk-tabs-inline extend tick-style-${tickStyle}`, className, {
          'one-tab-view': isSmallScreen,
        })}
      >
        {extraNodesPlacement === 'left' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap">
            {Children.toArray(
              extraNodes?.map((action, index) =>
                renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index),
              ),
            )}
          </div>
        )}
        <div className="jk-row left extend nowrap">
          {isSmallScreen && (
            <TabWithLink
              tabKey={tabsArray[selectedTabIndex - 1]?.key}
              getHrefOnTabChange={getHrefOnTabChange}
              routerReplace={routerReplace}
            >
              <Div
                className="jk-row jk-pg-xsm"
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex - 1]?.key)}
                onKeyDownClick
              >
                <NavigateBeforeIcon
                  className={classNames('br-50-pc bc-at-lt cr-at-it elevation-1', {
                    activated: selectedTabIndex - 1 >= 0,
                    disabled: !(selectedTabIndex - 1 >= 0),
                  })}
                  size="small"
                />
              </Div>
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
                        getHrefOnTabChange={getHrefOnTabChange}
                        routerReplace={routerReplace}
                        setSelectedTabKey={setSelectedTabKey}
                        buttonClassName={tabButtonsClassName}
                      />
                    )}
                  </div>
                ),
              }))}
              className="jk-select-void flex-1 jk-row"
              expand
              selectedOption={
                tabsArray[selectedTabIndex] ? { value: tabsArray[selectedTabIndex].key } : { value: undefined as T }
              }
              onChange={({ value }) => setSelectedTabKey(value, true)}
            />
          ) : (
            <div className="jk-row left stretch jk-tabs-headers-inline">
              {Children.toArray(
                displayedTabs.map((tab) => (
                  <HeaderTab
                    key={String(tab.key)}
                    tab={tab}
                    selectedTabKey={selectedTabKey}
                    getHrefOnTabChange={getHrefOnTabChange}
                    routerReplace={routerReplace}
                    setSelectedTabKey={setSelectedTabKey}
                    buttonClassName={tabButtonsClassName}
                  />
                )),
              )}
            </div>
          )}
          {isSmallScreen && (
            <TabWithLink
              tabKey={tabsArray[selectedTabIndex + 1]?.key}
              getHrefOnTabChange={getHrefOnTabChange}
              routerReplace={routerReplace}
            >
              <Div
                className="jk-row jk-pg-xsm"
                onClick={() => setSelectedTabKey(tabsArray[selectedTabIndex + 1]?.key)}
                onKeyDownClick
              >
                <NavigateNextIcon
                  className={classNames('br-50-pc bc-at-lt cr-at-it elevation-1', {
                    activated: selectedTabIndex + 1 < tabsLength,
                    disabled: !(selectedTabIndex + 1 < tabsLength),
                  })}
                  size="small"
                />
              </Div>
            </TabWithLink>
          )}
        </div>
        {extraNodesPlacement === 'right' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap">
            {Children.toArray(
              extraNodes?.map((action, index) =>
                renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index),
              ),
            )}
          </div>
        )}
        {(extraNodesPlacement === 'bottomRight' ||
          extraNodesPlacement === 'bottomLeft' ||
          extraNodesPlacement === 'bottomCenter') &&
          !!extraNodes?.length && (
            <div
              className="jk-col gap nowrap"
              style={{
                position: 'absolute',
                bottom: 'calc(var(--bottom-horizontal-menu-height, 0) + var(--pad-t))',
                right: extraNodesPlacement === 'bottomRight' || extraNodesPlacement === 'bottomCenter' ? 'var(--pad-t)' : '',
                left: extraNodesPlacement === 'bottomLeft' || extraNodesPlacement === 'bottomCenter' ? 'var(--pad-t)' : '',
              }}
            >
              {Children.toArray(
                extraNodes?.map((action, index) =>
                  renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index),
                ),
              )}
            </div>
          )}
      </div>
      {withBody && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
    </>
  );
}
