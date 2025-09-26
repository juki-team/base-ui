import { type PropsWithChildren } from 'react';
import type { ReactNodeOrFunctionP1Type } from '../../types';
import type { MenuMobileProps, MenuType } from '../HorizontalMenu/types';

export interface VerticalMenuProps extends MenuMobileProps, PropsWithChildren {
  isOpen?: boolean,
  onToggle?: (isOpen: boolean) => void,
  bottomSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  topSection?: ReactNodeOrFunctionP1Type<{ isOpen: boolean }>,
  menu: MenuType[],
}
