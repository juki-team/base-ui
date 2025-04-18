import React, { ReactNode, useEffect, useRef } from 'react';
import { classNames, getHref, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useJukiUI, useStableState } from '../../../hooks';
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
  
  // const withGetHrefOnTabChange = !!getHrefOnTabChange;
  // const getHrefOnTabChangeRef = useRef(getHrefOnTabChange);
  // getHrefOnTabChangeRef.current = getHrefOnTabChange;
  const LOADING_TAB = 'loading' as T;
  const { viewPortSize } = useJukiUI();
  const _tabKeys = Object.keys(initialTabs);
  const [ _tab, setTab ] = useStableState<T | undefined>(initialTabKey ?? initialTabs[_tabKeys?.[0]]?.key);
  
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
      window.history.replaceState(null, '', getHref(getHrefOnTabChangeRef.current(tab)));
    }
  }, [ tab ]);
  
  return (
    <TwoContentSection className={classNames('rectangular-style', { loading: !!loading })}>
      <>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div
          className={classNames('jk-row gap extend jk-pg-x-sm-b', {
            'jk-pg-x-sm-t': !withBreadcrumbs,
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
            className="jk-pg-x-sm-b"
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
            preload
          />
        </div>
      </>
    </TwoContentSection>
  );
};
