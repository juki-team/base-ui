import { ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../types';
import { DrawerActionsType } from '../Drawer';

export type MenuMobileSectionType = {
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  content?: ReactNodeOrFunctionP1Type<DrawerActionsType>,
}

export type MenuBasicType = {
  icon?: ReactNodeOrFunctionType,
  label: ReactNodeOrFunctionType,
  selected: boolean,
  onClick?: (isOpen?: boolean) => void,
}

export type MenuType = MenuBasicType & {
  menuItemWrapper?: ReactNodeOrFunctionP1Type<MenuBasicType & { children: ReactNode, index: number, onCloseDrawerMenuMobile?: () => void }>,
};

export interface MenuMobileProps {
  rightMobile?: MenuMobileSectionType,
  drawerMenuMobile?: ReactNodeOrFunctionP1Type<{ onClose: () => void, menu: MenuType[] }>,
  centerMobile?: MenuMobileSectionType,
}

export interface HorizontalMenuProps extends MenuMobileProps {
  className?: string,
  leftSection?: ReactNodeOrFunctionType,
  rightSection?: ReactNodeOrFunctionType,
  menu: MenuType[],
}

export interface VerticalMenuProps extends MenuMobileProps {
  isOpen?: boolean,
  onToggle?: (isOpen: boolean) => void,
  bottomSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  topSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  menu: MenuType[],
}
