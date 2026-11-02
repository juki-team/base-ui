import { Fragment, type ReactNode } from 'react';
import { TriggerAction } from '../../../enums';
import { Button } from '../../atoms';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import { Drawer } from '../../molecules';
import type { DrawerActionsType } from '../../molecules/Drawer/types';
import { ArrowBackIcon, ViewHeadlineIcon } from '../../server';
import type { MenuMobileProps, MenuType } from './types';

export type MenuItemsLayout = { type: 'vertical'; open: boolean } | { type: 'horizontal'; isSmallScreen: boolean };

/** Menu items of the vertical menu, the horizontal menu and the mobile bottom bar. */
export const renderMenuItems = (menu: MenuType[], layout: MenuItemsLayout): ReactNode[] =>
  menu.map(({ selected, icon, label, tooltipLabel, onClick, menuItemWrapper }, index) => {
    const isVertical = layout.type === 'vertical';
    const open = isVertical ? layout.open : false;
    const isSmallScreen = !isVertical && layout.isSmallScreen;
    const menuItem = isVertical ? (
      <div
        className={classNames('jk-menu-item jk-pg-xsm jk-br-ie cr-pr jk-row gap left', { selected: !!selected })}
        style={{ margin: open ? '0 var(--pad-xt)' : undefined }}
        onClick={() => onClick?.(open)}
        key={index}
        data-tooltip-id="jk-tooltip"
        data-tooltip-content={!open ? tooltipLabel : ''}
        data-tooltip-place="right"
      >
        <div className="jk-menu-item-icon jk-row">{renderReactNodeOrFunction(icon)}</div>
        <div className="jk-menu-item-label">{renderReactNodeOrFunction(label)}</div>
      </div>
    ) : (
      <div
        className={classNames('jk-menu-item pn-re jk-pg-xsm jk-br-ie nowrap cr-pr', {
          'selected cr-tx-ht-it': !!selected,
          'jk-row gap cr-tx-ht-it': !isSmallScreen,
          'jk-col flex-1 bottom': isSmallScreen,
        })}
        onClick={() => onClick?.()}
        key={index}
      >
        {icon && <div className="jk-menu-item-icon jk-row">{renderReactNodeOrFunction(icon)}</div>}
        <div className="jk-menu-item-label tx-t">{renderReactNodeOrFunction(label)}</div>
      </div>
    );
    if (!menuItemWrapper) {
      return menuItem;
    }
    return (
      <Fragment key={index}>
        {renderReactNodeOrFunctionP1(
          menuItemWrapper,
          {
            selected,
            icon,
            label,
            onClick,
            children: menuItem,
            index,
            isOpenVerticalMenu: isVertical ? open : null,
          },
          index,
        )}
      </Fragment>
    );
  });

const NO_DRAWER: DrawerActionsType = {
  isOpen: false,
  onOpen: () => null,
  onClose: () => null,
  toggle: () => null,
};

/** Top bar of the mobile layout (left: drawer or back button, center, right). */
export const MobileMenuTop = ({
  menu,
  rightMobile,
  centerMobile,
  drawerMenuMobile,
  onBack,
}: MenuMobileProps & { menu: MenuType[] }) => (
  <section className="jk-row nowrap block jk-menu-content space-between elevation-1">
    <div className="jk-horizontal-menu-mobile-left jk-row stretch left">
      {drawerMenuMobile ? (
        <Drawer
          content={(props) => renderReactNodeOrFunctionP1(drawerMenuMobile, { ...props, menu })}
          position="left"
          triggerOn={TriggerAction.NONE}
          closeOnOutside
        >
          {({ onOpen }) => (
            <div className="jk-row sides-mobile-padding">
              <Button size="small" onClick={onOpen} icon={<ViewHeadlineIcon />} />
            </div>
          )}
        </Drawer>
      ) : (
        onBack && (
          <div className="jk-row sides-mobile-padding">
            <Button size="small" onClick={onBack} icon={<ArrowBackIcon />} />
          </div>
        )
      )}
    </div>
    <div className="jk-horizontal-menu-mobile-center jk-row stretch">
      {!!centerMobile &&
        (centerMobile.content ? (
          <Drawer content={(props) => renderReactNodeOrFunctionP1(centerMobile.content, props)} position="top" closeOnOutside>
            {(props: DrawerActionsType): ReactNode => renderReactNodeOrFunctionP1(centerMobile.children, props)}
          </Drawer>
        ) : (
          renderReactNodeOrFunctionP1(centerMobile.children, NO_DRAWER)
        ))}
    </div>
    <div className="jk-horizontal-menu-mobile-right jk-row stretch right">
      {!!rightMobile &&
        (rightMobile.content ? (
          <Drawer content={(props) => renderReactNodeOrFunctionP1(rightMobile.content, props)} position="right" closeOnOutside>
            {(props: DrawerActionsType): ReactNode => (
              <div className="jk-row sides-mobile-padding stretch">
                {renderReactNodeOrFunctionP1(rightMobile.children, props)}
              </div>
            )}
          </Drawer>
        ) : (
          <div className="jk-row sides-mobile-padding stretch">
            {renderReactNodeOrFunctionP1(rightMobile.children, NO_DRAWER)}
          </div>
        ))}
    </div>
  </section>
);

/** Bottom tab bar of the mobile layout. */
export const MobileMenuBottom = ({ items }: { items: ReactNode[] }) => (
  <section className="jk-row nowrap jk-bottom-horizontal-menu elevation-1">
    <div className="jk-menu-items ht-100 jk-pg-sm-rl flex-1 jk-row gap nowrap extend">{items}</div>
  </section>
);
