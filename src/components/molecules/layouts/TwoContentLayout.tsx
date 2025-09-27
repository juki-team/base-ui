import { type ReactNode } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { useJukiUI } from '../../hooks/useJukiUI';
import { useStableState } from '../../hooks/useStableState';
import type { TabsType } from '../../types';
import { TabsInline } from '../_lazy_/TabsInline';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
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
  const { viewPortSize } = useJukiUI();
  const _tabKeys = Object.keys(initialTabs);
  const [ selectedTabKey, setSelectedTabKey ] = useStableState(loading ? LOADING_TAB : initialTabKey ?? (_tabKeys?.[0] ? initialTabs[_tabKeys?.[0]]?.key : '') as T);
  // const pushRoute = useRouterStore(store => store.pushRoute);
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
            onChange={(tabKey) => {
              setSelectedTabKey(tabKey);
              // if (getHrefOnTabChange) {
              //   pushRoute(getHrefOnTabChange(tabKey));
              // }
            }}
            getHrefOnTabChange={getHrefOnTabChange}
          />
        )}
      </>
      <TabsInlineBody tabs={tabs} selectedTabKey={selectedTabKey} />
    </TwoContentSection>
  );
}
