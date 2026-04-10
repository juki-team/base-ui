import { ReactNode } from 'react';
import { IconProps } from '../server/icons/types';

export interface CopyToClipboardProps {
  text: string,
  iconSize?: IconProps['size'],
  tooltipContent?: string,
  children?: ReactNode,
  noStyling?: boolean,
  className?: string,
  disabled?: boolean,
}
