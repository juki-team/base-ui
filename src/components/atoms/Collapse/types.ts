import { ReactNodeOrFunctionP1Type } from '../../../types';

export interface CollapseProps {
  showContent?: boolean,
  onChangeShowContent?: (showContent: boolean) => void,
  header: ReactNodeOrFunctionP1Type<{
    isOpen: boolean,
    close: () => void,
    open: () => void,
    toggle: () => void,
    isFullyClosed: boolean,
    isFullyOpened: boolean,
  }>,
  children: ReactNodeOrFunctionP1Type<{
    isOpen: boolean,
    close: () => void,
    open: () => void,
    toggle: () => void,
    isFullyClosed: boolean,
    isFullyOpened: boolean,
  }>,
  className?: string,
  startsShowing?: boolean,
}
