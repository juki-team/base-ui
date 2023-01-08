import { ReactNode } from 'react';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../types';
import { DrawerActionsType } from '../Drawer';

export type MenuMobileSectionType = {
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  content?: ReactNodeOrFunctionP1Type<DrawerActionsType>,
}

export interface HorizontalMenuProps {
  className?: string,
  // left?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  // right?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  leftSection?: ReactNodeOrFunctionType,
  rightSection?: ReactNodeOrFunctionType,
  menu: { icon?: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick?: (isOpen?: boolean) => void, menuItemWrapper?: ReactNodeOrFunctionP1Type<ReactNode> }[],
  rightMobile?: MenuMobileSectionType,
  drawerMenuMobile?: ReactNodeOrFunctionType,
  centerMobile?: MenuMobileSectionType,
}

export interface VerticalMenuProps {
  isOpen?: boolean,
  onToggle?: (isOpen: boolean) => void,
  bottomSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  topSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  menu: { icon: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick?: (isOpen?: boolean) => void, menuItemWrapper?: ReactNodeOrFunctionP1Type<ReactNode> }[],
  rightMobile?: MenuMobileSectionType,
  drawerMenuMobile?: ReactNodeOrFunctionType,
  centerMobile?: MenuMobileSectionType,
}
