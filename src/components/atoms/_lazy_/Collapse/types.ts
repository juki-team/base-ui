import { ReactNode } from 'react';

import { ReactNodeOrFunctionP1Type } from '../../../types';
import { ExpandLessIcon } from '../../server';

export interface CollapseProps {
  showContent?: boolean,
  onChangeShowContent?: (showContent: boolean) => void,
  header: ReactNodeOrFunctionP1Type<{
    isOpen: boolean,
    close: () => void,
    open: () => void,
    toggle: () => void,
    // isFullyClosed: boolean,
    // isFullyOpened: boolean,
    icon: ReactNode,
    Icon: typeof ExpandLessIcon,
  }>,
  children: ReactNodeOrFunctionP1Type<{
    isOpen: boolean,
    close: () => void,
    open: () => void,
    toggle: () => void,
    // isFullyClosed: boolean,
    // isFullyOpened: boolean,
  }>,
  className?: string,
  startsShowing?: boolean,
  direction?: 'column' | 'row',
}
