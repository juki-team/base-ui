import { Children, PropsWithChildren, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { usePageStore } from '../../../stores/page/usePageStore';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUIStore } from '../../../stores/ui/useUIStore';
import { Button } from '../../atoms';
import { classNames, isBrowser, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useHandleState } from '../../hooks/useHandleState';
import { NavigateBeforeIcon, NavigateNextIcon } from '../../server';
import type { NotUndefined, TabType } from '../../types';
import type { TabsInlineProps } from '../Tabs/types';

// measure the DOM before paint on the client; plain effect on the server to avoid the SSR warning
const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;

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

const HeaderTab = <T = string,>(props: HeaderTabProps<T>) => {
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
        className={classNames('jk-tabs-inline-tab fw-bd', { selected, 'cr-tx-ht': selected }, buttonClassName)}
      >
        {renderReactNodeOrFunctionP1(header, { selectedTabKey: selectedTabKey })}
      </Button>
    </TabWithLink>
  );
};

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

  const scrollRef = useRef<HTMLDivElement>(null);
  const isFirstScrollRef = useRef(true);
  const [edges, setEdges] = useState({ start: false, end: false });
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
  const { width } = useResizeDetector({ targetRef: scrollRef, ...RESIZE_DETECTOR_PROPS });

  const updateEdges = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    const start = el.scrollLeft > 1;
    const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
  }, []);

  // indicator position + keep the selected tab centered in view (e.g. entering by URL with ?tab=events)
  useIsomorphicLayoutEffect(() => {
    const el = scrollRef.current;
    const tab = el?.querySelector<HTMLElement>('.jk-tabs-inline-tab.selected');
    if (!el || !tab) {
      setIndicator(null);
      updateEdges();
      return;
    }
    setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    el.scrollTo({
      left: tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2,
      behavior: isFirstScrollRef.current ? 'auto' : 'smooth',
    });
    isFirstScrollRef.current = false;
    updateEdges();
  }, [selectedTabKey, width, tabsLength, updateEdges]);

  const scrollTabsBy = (direction: 1 | -1) => {
    const el = scrollRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  const showArrows = !isSmallScreen && (edges.start || edges.end);

  const renderExtraNodes = () =>
    Children.toArray(
      extraNodes?.map((action, index) => renderReactNodeOrFunctionP1(action, { selectedTabKey: selectedTabKey }, index)),
    );

  return (
    <>
      <div className={classNames(`jk-row gap space-between nowrap jk-tabs-inline extend tick-style-${tickStyle}`, className)}>
        {extraNodesPlacement === 'left' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap jk-tabs-inline-extra-nodes">{renderExtraNodes()}</div>
        )}
        <div className="jk-row left nowrap jk-tabs-inline-strip">
          {showArrows && (
            <button
              type="button"
              className="jk-row jk-tabs-inline-arrow"
              aria-label="Scroll tabs left"
              disabled={!edges.start}
              onClick={() => scrollTabsBy(-1)}
            >
              <NavigateBeforeIcon
                className={classNames('br-50-pc bc-at-lt cr-at-it elevation-1', {
                  activated: edges.start,
                  disabled: !edges.start,
                })}
                size="small"
              />
            </button>
          )}
          <div
            ref={scrollRef}
            onScroll={updateEdges}
            className={classNames('jk-row left stretch nowrap jk-tabs-headers-inline', {
              'fade-start': edges.start,
              'fade-end': edges.end,
            })}
          >
            {Children.toArray(
              tabsArray.map((tab) => (
                <HeaderTab
                  tab={tab}
                  selectedTabKey={selectedTabKey}
                  getHrefOnTabChange={getHrefOnTabChange}
                  routerReplace={routerReplace}
                  setSelectedTabKey={setSelectedTabKey}
                  buttonClassName={tabButtonsClassName}
                />
              )),
            )}
            {tickStyle !== 'background' && indicator && (
              <span
                className="jk-tabs-inline-indicator"
                style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
              />
            )}
          </div>
          {showArrows && (
            <button
              type="button"
              className="jk-row jk-tabs-inline-arrow"
              aria-label="Scroll tabs right"
              disabled={!edges.end}
              onClick={() => scrollTabsBy(1)}
            >
              <NavigateNextIcon
                className={classNames('br-50-pc bc-at-lt cr-at-it elevation-1', {
                  activated: edges.end,
                  disabled: !edges.end,
                })}
                size="small"
              />
            </button>
          )}
        </div>
        {extraNodesPlacement === 'right' && !!extraNodes?.length && (
          <div className="jk-row gap nowrap jk-tabs-inline-extra-nodes">{renderExtraNodes()}</div>
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
              {renderExtraNodes()}
            </div>
          )}
      </div>
      {withBody && renderReactNodeOrFunctionP1(tabs[selectedTabKey as string]?.body, { selectedTabKey })}
    </>
  );
}
