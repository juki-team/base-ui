import { ReactNode } from 'react';
import { IconProps } from '../server/icons/types';

export interface CopyToClipboardProps {
  text: string,
  size?: IconProps['size'],
  tooltip?: string,
  children?: ReactNode,
}
