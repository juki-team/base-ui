import { MenuViewMode } from '@juki-team/commons';
import React, { ReactNode, useEffect } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiRouter, useJukiUI, useJukiUser } from '../../../hooks';
import { NotUndefined } from '../../../types';
import { Breadcrumbs } from '../Breadcrumbs';
import { TabsInline } from '../Tabs';
import { TwoContentSection } from '../TwoContentSection';
import { TwoContentLayoutProps } from './types';

export const TwoContentCardsLayout = <T, >(props: TwoContentLayoutProps<T>) => {
  
  const {
    breadcrumbs: initialBreadcrumbs,
    tabs = {},
    tabButtons,
    getHrefOnTabChange,
    selectedTabKey,
    children,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const { user: { settings: { preferredMenuViewMode } } } = useJukiUser();
  const { pushRoute } = useJukiRouter();
  const tabKeys = Object.keys(tabs);
  const [ tab, setTab ] = useHandleState<T>(tabs[tabKeys[0] as string].key as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined);
  
  const pushTab = (tabKey: T) => {
    if (getHrefOnTabChange) {
      pushRoute(getHrefOnTabChange(tabKey));
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
  const tabsOnBody = preferredMenuViewMode === MenuViewMode.VERTICAL && withTabs;
  const breadcrumbs = renderReactNodeOrFunctionP1(initialBreadcrumbs, { selectedTabKey: tab }) as ReactNode[];
  
  return (
    <TwoContentSection className="cards-style">
      <div>
        {!!breadcrumbs?.length && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <div
          className={classNames('jk-row gap jk-pg-rl', {
            'pad-top': preferredMenuViewMode === MenuViewMode.HORIZONTAL && withTabs,
            'pad-top-bottom': !(preferredMenuViewMode === MenuViewMode.HORIZONTAL && withTabs),
          })}
        >
          {children}
          {!(preferredMenuViewMode === MenuViewMode.HORIZONTAL && withTabs) && !!tabButtons?.length && !tabsOnBody && (
            <div className="jk-row gap extend right">
              {tabButtons.map(buttonsTab => renderReactNodeOrFunctionP1(buttonsTab, { selectedTabKey: tab }))}
            </div>
          )}
        </div>
        {preferredMenuViewMode === MenuViewMode.HORIZONTAL && withTabs && (
          <div className="jk-pg-rl">
            <TabsInline
              tabs={tabs}
              selectedTabKey={tab}
              onChange={pushTab}
              extraNodes={tabButtons}
              extraNodesPlacement={(viewPortSize === 'sm') ? 'bottomRight' : undefined}
            />
          </div>
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
          className="two-content-layout-body jk-pg-trbl"
          style={{ height: preferredMenuViewMode === MenuViewMode.VERTICAL && withTabs ? 'calc(100% - 40px)' : '100%' }}
        >
          {renderReactNodeOrFunctionP1(tabs[tab as string]?.body, { selectedTabKey: tab })}
        </div>
      </div>
    </TwoContentSection>
  );
};
