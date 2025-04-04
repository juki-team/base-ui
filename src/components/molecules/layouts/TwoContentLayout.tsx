import React, { ReactNode, useCallback, useEffect } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiUI } from '../../../hooks';
import { NotUndefined, TabsType } from '../../../types';
import { Breadcrumbs } from '../Breadcrumbs';
import { TabsInline } from '../Tabs';
import { TabsInlineBody } from '../Tabs/TabsInline';
import { TwoContentSection } from '../TwoContentSection';
import { JukiLoadingLayout } from './PawsLoadingLayout';
import { TwoContentLayoutProps } from './types';

export const TwoContentLayout = <T, >(props: TwoContentLayoutProps<T>) => {
  
  const {
    breadcrumbs: initialBreadcrumbs,
    tabs: initialTAbs = {},
    tabButtons,
    getHrefOnTabChange,
    selectedTabKey,
    children,
    loading,
  } = props;
  
  const withGetHrefOnTabChange = !!getHrefOnTabChange;
  // const getHrefOnTabChangeRef = useRef(getHrefOnTabChange);
  // getHrefOnTabChangeRef.current = getHrefOnTabChange;
  const LOADING_TAB = 'loading' as T;
  const { viewPortSize } = useJukiUI();
  // const pushRoute = useRouterStore(state => state.pushRoute);
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
  } : initialTAbs;
  
  const tabKeys = Object.keys(tabs);
  const firstTabKey = tabKeys[0] as string;
  const [ initialTab, setTab ] = useHandleState<T>(tabs[firstTabKey]?.key as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined);
  const tab = loading ? LOADING_TAB : initialTab;
  const breadcrumbs = renderReactNodeOrFunctionP1(initialBreadcrumbs, { selectedTabKey: tab }) as ReactNode[];
  const pushTab = useCallback((tabKey: T) => {
    if (withGetHrefOnTabChange) {
      // pushRoute(getHrefOnTabChangeRef.current(tabKey));
    } else {
      setTab(tabKey as NotUndefined<T>);
    }
  }, [ setTab, withGetHrefOnTabChange ]);
  useEffect(() => {
    if (selectedTabKey) {
      setTab(selectedTabKey as NotUndefined<T>);
    }
  }, [ selectedTabKey, setTab ]);
  const selectedKey = tabs[tab as string]?.key;
  useEffect(() => {
    if (!selectedKey && firstTabKey) {
      pushTab(firstTabKey as NotUndefined<T>);
    }
  }, [ firstTabKey, setTab, selectedKey, pushTab ]);
  const withTabs = tabKeys.length > 1;
  const tabsOnBody = withTabs && false;
  const tabsOnHeader = withTabs && true;
  const isMobile = viewPortSize === 'sm';
  const withBreadcrumbs = !!breadcrumbs?.length && !isMobile;
  
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
            selectedTabKey={tab}
            onChange={pushTab}
            extraNodes={tabButtons}
            extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
            tickStyle="background"
            className="jk-pg-x-sm-b"
            getHrefOnTabChange={getHrefOnTabChange}
          />
        )}
      </>
      <>
        {tabsOnBody && (
          <TabsInline
            tabs={tabs}
            selectedTabKey={tab}
            onChange={pushTab}
            extraNodes={tabButtons}
            extraNodesPlacement={isMobile ? 'bottomRight' : undefined}
            getHrefOnTabChange={getHrefOnTabChange}
          />
        )}
        <div
          className={classNames('two-content-layout-body', { 'pn-re': !!loading })}
          style={{ height: tabsOnBody ? 'calc(100% - 40px)' : '100%', position: 'relative' }}
        >
          <TabsInlineBody
            tabs={tabs}
            selectedTabKey={tab}
          />
        </div>
      </>
    </TwoContentSection>
  );
};
