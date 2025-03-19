import React, { cloneElement, PropsWithChildren, ReactElement } from 'react';
import { useJukiNotification, useRouterStore, useUserStore } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { T } from '../../atoms';

export const FirstLoginWrapper = ({ children }: PropsWithChildren) => {
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
};
