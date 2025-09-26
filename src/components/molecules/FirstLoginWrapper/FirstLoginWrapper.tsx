import { cloneElement, type ReactElement } from 'react';
import { QueryParamKey } from '../../../enums';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms';
import { useJukiNotification } from '../../hooks/useJukiNotification';
import type { FirstLoginWrapperProps } from './types';

export function FirstLoginWrapper({ children }: FirstLoginWrapperProps) {
  const isLogged = useUserStore(state => state.user.isLogged);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const { addWarningNotification } = useJukiNotification();
  if (isLogged) {
    return children;
  }
  
  const onClick = () => {
    addWarningNotification(<T className="tt-se">you must log in</T>);
    setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' });
  };
  
  return cloneElement(children as ReactElement, { onClick } as ReactElement<{}>['props']);
}
