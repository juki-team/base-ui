import { cloneElement, type ReactElement } from 'react';
import { QueryParamKey } from '../../../enums';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms/T/T';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import type { FirstLoginWrapperProps } from './types';

export function FirstLoginWrapper({ children }: FirstLoginWrapperProps) {
  const isLogged = useUserStore((state) => state.user.isLogged);
  const setSearchParams = useRouterStore((state) => state.setSearchParams);
  const { addWarningNotification } = useJukiNotification();
  if (isLogged) {
    return children;
  }

  const onClick = () => {
    addWarningNotification(<T className="tt-se">you must log in</T>);
    setSearchParams({ name: QueryParamKey.SIGN_IN, value: 'true' });
  };

  // biome-ignore lint/complexity/noBannedTypes: ReactElement<{}>['props'] is the pattern needed to relax cloneElement's prop typing
  return cloneElement(children as ReactElement, { onClick } as ReactElement<{}>['props']);
}
