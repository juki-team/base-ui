import { type ReactNode } from 'react';
import { persistGlobalURLSearchParams } from '../../../settings/AppRoutes';
import { usePageStore } from '../../../stores/page/usePageStore';
import { classNames, getHref, isBrowser, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useStableState } from '../../hooks/useStableState';
import type { TabsType } from '../../types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { TabsInline } from '../TabsInline/TabsInline';
import { TabsInlineBody } from '../TabsInlineBody/TabsInlineBody';
import { TwoContentSection } from '../TwoContentSection/TwoContentSection';
import { JukiLoadingLayout } from './JukiLoadingLayout';
import type { TwoContentLayoutProps } from './types';

export function TwoContentLayout<T = string, >(props: TwoContentLayoutProps<T>) {
  
  const {
    breadcrumbs: initialBreadcrumbs,
    tabs: initialTabs = {},
    tabButtons,
    getHrefOnTabChange,
    selectedTabKey: initialTabKey,
    children,
    loading,
  } = props;
  
  const LOADING_TAB = 'loading' as T;
  const viewPortSize = usePageStore(store => store.viewPort.size);
  const _tabKeys = Object.keys(initialTabs);
  const [ selectedTabKey, setSelectedTabKey ] = useStableState(loading ? LOADING_TAB : initialTabKey ?? (_tabKeys?.[0] ? initialTabs[_tabKeys?.[0]]?.key : '') as T);
  const tabs: TabsType<T> = loading ? {
    [LOADING_TAB as string]: {
      key: LOADING_TAB,
      header: (
        <div className="jk-row">
          <div className="dot-flashing" />
        </div>
      ),
      body: <JukiLoadingLayout>{typeof loading === 'boolean' ? undefined : loading}</JukiLoadingLayout>,
    },
  } : initialTabs;
  
  const tabKeys = Object.keys(tabs);
  
  const breadcrumbs = renderReactNodeOrFunctionP1(initialBreadcrumbs, { selectedTabKey }) as ReactNode[];
  
  const withTabs = tabKeys.length > 1;
  const isMobile = viewPortSize === 'sm';
  const withBreadcrumbs = !!breadcrumbs?.length && !isMobile;
  
  return (
    <TwoContentSection className={classNames('rectangular-style', { loading: !!loading })}>
      <>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          {(!!children || (!withTabs && tabButtons && tabButtons.length > 0)) && (
            <div
              className={classNames('jk-row gap extend jk-pg-xsm-b', {
                'jk-pg-xsm-t': !withBreadcrumbs,
                'left': !isMobile,
                'center': isMobile,
              })}
            >
              {children}
              {!withTabs && tabButtons && tabButtons.length > 0 && (
                <div className="jk-row gap extend right">
                  {tabButtons.map(buttonsTab => renderReactNodeOrFunctionP1(buttonsTab, { selectedTabKey }))}
                </div>
              )}
            </div>
          )}
          {withTabs && (
            <TabsInline
              tabs={tabs}
              selectedTabKey={selectedTabKey}
              extraNodes={tabButtons}
              extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
              tickStyle="background"
              className="jk-pg-xsm-b"
              onChange={(tabKey) => {
                setSelectedTabKey(tabKey);
                if (getHrefOnTabChange && isBrowser()) {
                  const { pathname, searchParams } = getHref(getHrefOnTabChange(tabKey));
                  const search = persistGlobalURLSearchParams(searchParams);
                  if (isBrowser()) {
                    window.history.replaceState({}, '', `${pathname}${search ? '?' + search : ''}`);
                  }
                }
              }}
            />
          )}
      </>
      <TabsInlineBody tabs={tabs} selectedTabKey={selectedTabKey} />
    </TwoContentSection>
  );
}
