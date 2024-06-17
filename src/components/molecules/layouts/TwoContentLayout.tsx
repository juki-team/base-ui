import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiRouter, useJukiUI } from '../../../hooks';
import { NotUndefined, ReactNodeOrFunctionP1Type } from '../../../types';
import { LoadingIcon } from '../../atoms';
import { Breadcrumbs } from '../Breadcrumbs';
import { TabsInline, TabsType } from '../Tabs';
import { TwoContentSection } from '../TwoContentSection';

interface TwoContentLayoutProps<T> extends PropsWithChildren {
  breadcrumbs?: ReactNode[],
  tabs?: TabsType<T>,
  tabButtons?: ReactNodeOrFunctionP1Type<{ selectedTabKey: T; }>[],
  getPathname?: (selectedTabKey: T) => string,
  selectedTabKey?: T,
  loading?: boolean,
}

export const TwoContentLayout = <T, >({
                                        breadcrumbs,
                                        tabs: initialTAbs = {},
                                        tabButtons,
                                        getPathname,
                                        selectedTabKey,
                                        children,
                                        loading,
                                      }: TwoContentLayoutProps<T>) => {
  
  const LOADING_TAB = 'loading' as T;
  const { viewPortSize } = useJukiUI();
  const { searchParams, pushRoute } = useJukiRouter();
  const tabs: TabsType<T> = loading ? {
    [LOADING_TAB as string]: {
      key: LOADING_TAB,
      header: (
        <div className="jk-row">
          <div className="dot-flashing" />
        </div>
      ),
      body: (
        <div className="jk-row jk-col extend">
          <LoadingIcon size="very-huge" className="cr-py" />
        </div>
      ),
    },
  } : initialTAbs;
  const tabKeys = Object.keys(tabs);
  const [ initialTab, setTab ] = useHandleState<T>(tabs[tabKeys[0] as string].key as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined);
  const tab = loading ? LOADING_TAB : initialTab;
  const pushTab = (tabKey: T) => {
    if (getPathname) {
      pushRoute({
        pathname: getPathname(tabKey),
        searchParams,
      });
    } else {
      setTab(tabKey as NotUndefined<T>);
    }
  };
  
  useEffect(() => {
    if (selectedTabKey) {
      setTab(selectedTabKey as NotUndefined<T>);
    }
  }, [ selectedTabKey, setTab ]);
  const withTabs = tabKeys.length > 1;
  const tabsOnBody = withTabs && false;
  const tabsOnHeader = withTabs && true;
  const withBreadcrumbs = !!breadcrumbs?.length;
  
  return (
    <TwoContentSection className="rectangular-style">
      <div>
        {withBreadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div
          className={classNames('jk-row gap left', {
            //'jk-pg-sm-t': preferredMenuViewMode === MenuViewMode.HORIZONTAL && withTabs,
            'jk-pg-sm-t': !withBreadcrumbs,
            'jk-pg-sm-b': !tabsOnHeader,
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
            extraNodesPlacement={(viewPortSize === 'sm') ? 'bottomRight' : undefined}
          />
        )}
      </div>
      <div>
        {tabsOnBody && (
          <TabsInline
            tabs={tabs}
            selectedTabKey={tab}
            onChange={pushTab}
            extraNodes={tabButtons}
            extraNodesPlacement={(viewPortSize === 'sm') ? 'bottomRight' : undefined}
          />
        )}
        <div
          className="two-content-layout-body"
          style={{ height: tabsOnBody ? 'calc(100% - 40px)' : '100%' }}
        >
          {renderReactNodeOrFunctionP1(tabs[tab as string]?.body, { selectedTabKey: tab })}
        </div>
      </div>
    </TwoContentSection>
  );
};
