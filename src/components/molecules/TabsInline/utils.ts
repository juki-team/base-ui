import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import type { IconProps } from '../../atoms/server/icons/types';
import type { ButtonSizeType } from '../../types';

const ICON_SIZE_BY_BUTTON_SIZE: Record<ButtonSizeType, NonNullable<IconProps['size']>> = {
  tiny: 'tiny',
  small: 'tiny',
  regular: 'small',
  large: 'regular',
  huge: 'large',
};

export const sizeTabsInlineIcon = (icon: ReactNode, buttonSize: ButtonSizeType): ReactNode => {
  if (!isValidElement(icon)) {
    return icon;
  }
  const element = icon as ReactElement<IconProps>;
  if (element.props.size) {
    return element;
  }
  return cloneElement(element, { size: ICON_SIZE_BY_BUTTON_SIZE[buttonSize] });
};
