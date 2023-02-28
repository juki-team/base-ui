import { ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../types';
import { DrawerActionsType } from '../Drawer';

export type MenuMobileSectionType = {
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  content?: ReactNodeOrFunctionP1Type<DrawerActionsType>,
}

export type MenuType = { icon?: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick?: (isOpen?: boolean) => void, menuItemWrapper?: ReactNodeOrFunctionP1Type<ReactNode> };

export interface MenuMobileProps {
  rightMobile?: MenuMobileSectionType,
  drawerMenuMobile?: ReactNodeOrFunctionP1Type<{ close: () => void, menu: MenuType[] }>,
  centerMobile?: MenuMobileSectionType,
}

export interface HorizontalMenuProps extends MenuMobileProps {
  className?: string,
  // left?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  // right?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  leftSection?: ReactNodeOrFunctionType,
  rightSection?: ReactNodeOrFunctionType,
  menu: MenuType[],
}

export interface VerticalMenuProps extends MenuMobileProps {
  isOpen?: boolean,
  onToggle?: (isOpen: boolean) => void,
  bottomSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  topSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  menu: { icon: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick?: (isOpen?: boolean) => void, menuItemWrapper?: ReactNodeOrFunctionP1Type<ReactNode> }[],
}
