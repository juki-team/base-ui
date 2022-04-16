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
  left?: ReactNodeOrFunctionType,
  right?: ReactNodeOrFunctionType,
  rightMobile?: MenuMobileSectionType,
  leftMobile?: MenuMobileSectionType,
  centerMobile?: MenuMobileSectionType,
  menu: { icon?: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick: (isOpen?: boolean) => void }[],
}

export interface VerticalMenuProps {
  isOpen?: boolean,
  onToggle?: (isOpen: boolean) => void,
  bottomSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  topSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  menu: { icon: ReactNodeOrFunctionType, label: ReactNodeOrFunctionType, selected: boolean, onClick: (isOpen?: boolean) => void }[],
  rightMobile?: MenuMobileSectionType,
  leftMobile?: MenuMobileSectionType,
  centerMobile?: MenuMobileSectionType,
}
