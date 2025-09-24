import { MenuViewMode, ProfileSetting } from '@juki-team/commons';
import { ReactNode, useEffect } from 'react';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState, useJukiUI } from '../../../hooks';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { NotUndefined, TwoContentCardsLayoutProps } from '../../../types';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { TabsInline } from '../Tabs/TabsInline';
import { TabsInlineBody } from '../Tabs/TabsInlineBody';
import { TwoContentSection } from '../TwoContentSection/TwoContentSection';

export const TwoContentCardsLayout = <T, >(props: TwoContentCardsLayoutProps<T>) => {
  
  const {
    breadcrumbs: initialBreadcrumbs,
    tabs = {},
    tabButtons,
    getHrefOnTabChange,
    selectedTabKey,
    children,
  } = props;
  
  const { viewPortSize } = useJukiUI();
  const preferredMenuViewMode = useUserStore(state => state.user.settings[ProfileSetting.MENU_VIEW_MODE]);
  const pushRoute = useRouterStore(state => state.pushRoute);
  const tabKeys = Object.keys(tabs);
  const [ tab, setTab ] = useHandleState<T>((tabs[tabKeys[0]!]?.key ?? '') as NotUndefined<T>, selectedTabKey as NotUndefined<T> | undefined);
  
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
          <TabsInlineBody
            tabs={tabs}
            selectedTabKey={tab}
          />
        </div>
      </div>
    </TwoContentSection>
  );
};
