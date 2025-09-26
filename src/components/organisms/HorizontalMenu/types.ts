import type { PropsWithChildren, ReactNode } from 'react';
import type { DrawerActionsType } from '../../molecules/types';
import { ReactNodeOrFunctionP1Type, ReactNodeOrFunctionType } from '../../types';

export type MenuMobileSectionType = {
  children: ReactNodeOrFunctionP1Type<DrawerActionsType>,
  content?: ReactNodeOrFunctionP1Type<DrawerActionsType>,
}

export type MenuBasicType = {
  icon?: ReactNodeOrFunctionType,
  label: ReactNodeOrFunctionType,
  tooltipLabel?: string,
  selected?: boolean,
  onClick?: (isOpen?: boolean) => void,
}

export type MenuType = MenuBasicType & {
  menuItemWrapper?: ReactNodeOrFunctionP1Type<MenuBasicType & {
    children: ReactNode,
    index: number,
    isOpenVerticalMenu: boolean | null,
  }>,
};

export interface MenuMobileProps {
  rightMobile?: MenuMobileSectionType,
  drawerMenuMobile?: ReactNodeOrFunctionP1Type<{ onClose: () => void, menu: MenuType[] }>,
  centerMobile?: MenuMobileSectionType,
  onBack?: () => void,
}

export interface HorizontalMenuProps extends MenuMobileProps, PropsWithChildren {
  className?: string,
  leftSection?: ReactNodeOrFunctionType,
  rightSection?: ReactNodeOrFunctionType,
  menu: MenuType[],
  onBack?: () => void,
}
