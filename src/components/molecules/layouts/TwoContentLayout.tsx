import { ReactNode, useEffect, useRef } from 'react';
import { classNames, getHref, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { useStableState } from '../../../hooks/useStableState';
import { TabsType } from '../../../types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { TabsInline } from '../Tabs/TabsInline';
import { TabsInlineBody } from '../Tabs/TabsInlineBody';
import { TwoContentSection } from '../TwoContentSection/TwoContentSection';
import { JukiLoadingLayout } from './JukiLoadingLayout';
import { TwoContentLayoutProps } from './types';

export const TwoContentLayout = <T = string, >(props: TwoContentLayoutProps<T>) => {
  
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
  const { viewPortSize } = useJukiUI();
  const _tabKeys = Object.keys(initialTabs);
  
  const tabs: TabsType<T> = !!loading ? {
    [LOADING_TAB as string]: {
      key: LOADING_TAB,
      header: (
        <div className="jk-row">
          <div className="dot-flashing" />
        </div>
      ),
      body: <JukiLoadingLayout children={typeof loading === 'boolean' ? undefined : loading} />,
    },
  } : initialTabs;
  
  const tabKeys = Object.keys(tabs);
  
  const selectedTabKey = loading ? LOADING_TAB : initialTabKey ?? (_tabKeys?.[0] ? initialTabs[_tabKeys?.[0]]?.key : '') as T;
  const breadcrumbs = renderReactNodeOrFunctionP1(initialBreadcrumbs, { selectedTabKey }) as ReactNode[];
  
  const withTabs = tabKeys.length > 1;
  const isMobile = viewPortSize === 'sm';
  const withBreadcrumbs = !!breadcrumbs?.length && !isMobile;
  
  return (
    <TwoContentSection className={classNames('rectangular-style', { loading: !!loading })}>
      <>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
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
        {withTabs && (
          <TabsInline
            tabs={tabs}
            selectedTabKey={selectedTabKey}
            extraNodes={tabButtons}
            extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
            tickStyle="background"
            className="jk-pg-xsm-b"
            getHrefOnTabChange={getHrefOnTabChange}
          />
        )}
      </>
      <TabsInlineBody tabs={tabs} selectedTabKey={selectedTabKey} />
    </TwoContentSection>
  );
};

export const TwoContentLayout1 = <T = string, >(props: TwoContentLayoutProps<T>) => {
  
  const {
    breadcrumbs: initialBreadcrumbs,
    tabs: initialTabs = {},
    tabButtons,
    getHrefOnTabChange,
    selectedTabKey: initialTabKey,
    children,
    loading,
  } = props;
  
  // const withGetHrefOnTabChange = !!getHrefOnTabChange;
  // const getHrefOnTabChangeRef = useRef(getHrefOnTabChange);
  // getHrefOnTabChangeRef.current = getHrefOnTabChange;
  const LOADING_TAB = 'loading' as T;
  const { viewPortSize } = useJukiUI();
  const _tabKeys = Object.keys(initialTabs);
  const [ _tab, setTab ] = useStableState<T | undefined>(initialTabKey ?? (_tabKeys?.[0] ? initialTabs[_tabKeys?.[0]]?.key : '') as T);
  
  const tabs: TabsType<T> = !!loading ? {
    [LOADING_TAB as string]: {
      key: LOADING_TAB,
      header: (
        <div className="jk-row">
          <div className="dot-flashing" />
        </div>
      ),
      body: <JukiLoadingLayout children={typeof loading === 'boolean' ? undefined : loading} />,
    },
  } : initialTabs;
  
  const tabKeys = Object.keys(tabs);
  
  // const firstTabKey = tabKeys[0] as string;
  // const [ initialTab, setTab ] = useHandleState<T>(tabs[firstTabKey]?.key as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined);
  const tab = loading ? LOADING_TAB : _tab;
  const breadcrumbs = renderReactNodeOrFunctionP1(initialBreadcrumbs, { selectedTabKey: tab }) as ReactNode[];
  
  // const pushTab = useCallback((tabKey: T) => {
  //   if (withGetHrefOnTabChange) {
  //     // pushRoute(getHrefOnTabChangeRef.current(tabKey));
  //   } else {
  //     setTab(tabKey as NotUndefined<T>);
  //   }
  // }, [ setTab, withGetHrefOnTabChange ]);
  // useEffect(() => {
  //   if (selectedTabKey) {
  //     setTab(selectedTabKey as NotUndefined<T>);
  //   }
  // }, [ selectedTabKey, setTab ]);
  // const selectedKey = tabs[tab as string]?.key;
  // useEffect(() => {
  //   if (!selectedKey && firstTabKey) {
  //     pushTab(firstTabKey as NotUndefined<T>);
  //   }
  // }, [ firstTabKey, setTab, selectedKey, pushTab ]);
  const withTabs = tabKeys.length > 1;
  const tabsOnBody = withTabs && false;
  const tabsOnHeader = withTabs && true;
  const isMobile = viewPortSize === 'sm';
  const withBreadcrumbs = !!breadcrumbs?.length && !isMobile;
  
  const getHrefOnTabChangeRef = useRef(getHrefOnTabChange);
  getHrefOnTabChangeRef.current = getHrefOnTabChange;
  useEffect(() => {
    if (getHrefOnTabChangeRef.current && typeof window !== 'undefined' && tab) {
      const nextHref = getHrefOnTabChangeRef.current(tab);
      const currentHref = window.location.pathname + window.location.search;
      if (currentHref !== nextHref) {
        window.history.replaceState(null, '', getHref(nextHref).path);
      }
    }
  }, [ tab ]);
  
  return (
    <TwoContentSection className={classNames('rectangular-style', { loading: !!loading })}>
      <>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div
          className={classNames('jk-row gap extend jk-pg-sm-b', {
            'jk-pg-sm-t': !withBreadcrumbs,
            'left': !isMobile,
            'center': isMobile,
          })}
        >
          {children}
          {!withTabs && tabButtons && tabButtons.length > 0 && (
            <div className="jk-row gap extend right">
              {tabButtons.map(buttonsTab => renderReactNodeOrFunctionP1(buttonsTab, { selectedTabKey: tab }))}
            </div>
          )}
        </div>
        {tabsOnHeader && (
          <TabsInline
            tabs={tabs}
            selectedTabKey={loading ? LOADING_TAB : tab}
            onChange={setTab}
            extraNodes={tabButtons}
            extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
            tickStyle="background"
            className="jk-pg-xsm-b"
            // getHrefOnTabChange={getHrefOnTabChange}
            // routerReplace
          />
        )}
      </>
      <>
        {tabsOnBody && (
          <TabsInline
            tabs={tabs}
            selectedTabKey={loading ? LOADING_TAB : tab}
            onChange={setTab}
            extraNodes={tabButtons}
            extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
            // getHrefOnTabChange={getHrefOnTabChange}
            // routerReplace
          />
        )}
        <div
          className={classNames('two-content-layout-body', { 'pn-re': !!loading })}
          style={{ height: tabsOnBody ? 'calc(100% - 40px)' : '100%', position: 'relative' }}
        >
          <TabsInlineBody
            tabs={tabs}
            selectedTabKey={loading ? LOADING_TAB : tab}
          />
        </div>
      </>
    </TwoContentSection>
  );
};
